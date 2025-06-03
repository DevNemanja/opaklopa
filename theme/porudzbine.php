<?php

function get_all_orders_grouped_by_month()
{
    $args = [
        'limit' => -1,
        'status' => ['completed', 'processing'],
        'orderby' => 'date',
        'order' => 'DESC',
        'return' => 'objects',
    ];

    $orders = wc_get_orders($args);
    $grouped = [];

    foreach ($orders as $order) {
        $date = $order->get_date_created();
        if (!$date) continue;

        $month_key = $date->format('Y-m');
        if (!isset($grouped[$month_key])) {
            $grouped[$month_key] = [];
        }

        $grouped[$month_key][] = $order;
    }

    krsort($grouped);
    return $grouped;
}

function render_all_orders_grouped_page()
{
    if (!current_user_can('manage_woocommerce')) {
        wp_die('Nemate pristup ovoj stranici.');
    }

    $grouped_orders = get_all_orders_grouped_by_month();

    echo '<div class="wrap"><h1>Porudžbine po mesecima</h1>';

    if (empty($grouped_orders)) {
        echo '<p>Nema porudžbina.</p>';
    } else {
        foreach ($grouped_orders as $month => $orders) {
            $month_label = date_i18n('F Y', strtotime($month . '-01'));
            $export_url = admin_url('admin.php?page=orders-by-month&export_csv=' . $month);

            echo "<h2 style='margin-top:30px;'>$month_label</h2>";
            echo "<p><a class='button button-primary' href='$export_url'>Izvezi u CSV</a></p>";

            echo '<table class="widefat fixed striped">';
            echo '<thead><tr>';
            echo '<th>ID</th><th>Datum</th><th>Kupac</th><th>Email</th><th>Telefon</th><th>Ukupno</th><th>Status</th><th>Artikli</th>';
            echo '</tr></thead><tbody>';

            foreach ($orders as $order) {
                $items = [];
                foreach ($order->get_items() as $item) {
                    $items[] = esc_html($item->get_name()) . ' x ' . $item->get_quantity();
                }

                echo '<tr>';
                echo '<td>' . $order->get_id() . '</td>';
                echo '<td>' . $order->get_date_created()->date('Y-m-d H:i') . '</td>';
                echo '<td>' . esc_html($order->get_billing_first_name() . ' ' . $order->get_billing_last_name()) . '</td>';
                echo '<td>' . esc_html($order->get_billing_email()) . '</td>';
                echo '<td>' . esc_html($order->get_billing_phone()) . '</td>';
                echo '<td>' . wc_price($order->get_total(), ['currency' => $order->get_currency()]) . '</td>';
                echo '<td>' . esc_html($order->get_status()) . '</td>';
                echo '<td>' . implode(', ', $items) . '</td>';
                echo '</tr>';
            }

            echo '</tbody></table>';
        }
    }

    echo '</div>';
}

// CSV export handler
add_action('admin_init', function () {
    if (!current_user_can('manage_woocommerce')) return;
    if (!isset($_GET['page']) || $_GET['page'] !== 'orders-by-month') return;
    if (!isset($_GET['export_csv'])) return;

    $month = sanitize_text_field($_GET['export_csv']);

    $args = [
        'limit' => -1,
        'status' => ['completed', 'processing'],
        'orderby' => 'date',
        'order' => 'DESC',
    ];

    $orders = wc_get_orders($args);
    $filtered = [];

    foreach ($orders as $order) {
        $date = $order->get_date_created();
        if (!$date) continue;
        if ($date->format('Y-m') === $month) {
            $filtered[] = $order;
        }
    }

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=porudzbine-' . $month . '.csv');

    $output = fopen('php://output', 'w');
    fputcsv($output, ['ID', 'Datum', 'Kupac', 'Email', 'Telefon', 'Ukupno', 'Status', 'Artikli']);

    foreach ($filtered as $order) {
        $items = [];
        foreach ($order->get_items() as $item) {
            $items[] = $item->get_name() . ' x ' . $item->get_quantity();
        }

        fputcsv($output, [
            $order->get_id(),
            $order->get_date_created()->date('Y-m-d H:i'),
            $order->get_billing_first_name() . ' ' . $order->get_billing_last_name(),
            $order->get_billing_email(),
            $order->get_billing_phone(),
            $order->get_total(),
            $order->get_status(),
            implode(', ', $items),
        ]);
    }

    fclose($output);
    exit;
});

// Admin meni
add_action('admin_menu', function () {
    add_menu_page(
        'Porudžbine po mesecima',
        'Porudžbine meseci',
        'manage_woocommerce',
        'orders-by-month',
        'render_all_orders_grouped_page',
        'dashicons-cart',
        56
    );
});
