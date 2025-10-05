<?php
add_action('woocommerce_order_status_processing', 'posalji_html_email_korisniku_za_porudzbinu', 10, 1);

function posalji_html_email_korisniku_za_porudzbinu($order_id)
{
    if (!$order_id) return;

    $order = wc_get_order($order_id);
    $to = $order->get_billing_email();
    $subject = 'Porudžbina #' . $order->get_order_number() . ' je primljena';

    $ime = $order->get_billing_first_name();
    $eta = get_post_meta($order->get_id(), '_order_eta', true);

    $order_items_html = '';
    foreach ($order->get_items() as $item) {
        $product_name = esc_html($item->get_name());
        $quantity = $item->get_quantity();
        $total = wc_price($item->get_total());
        $order_items_html .= "
            <tr>
                <td style='padding:8px 0;color:#fff;font-size:14px;'>$product_name (x$quantity)</td>
                <td style='padding:8px 0;color:#fff;font-size:14px;text-align:right;'>$total</td>
            </tr>
        ";
    }

    $order_total = $order->get_formatted_order_total();
    $order_tracking_url = esc_url('https://opaklopa.rs?opa-order=' . $order_id);

    // HTML body
    $body = "
    <!DOCTYPE html>
    <html lang='sr'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <link href='https://fonts.googleapis.com/css2?family=Lobster&display=swap' rel='stylesheet'>
        <title>Porudžbina</title>
    </head>
    <body style='margin:0;padding:0;background:#0d0d0d;font-family:Inter,Arial,sans-serif;color:#ffffff;'>
        <table role='presentation' border='0' cellpadding='0' cellspacing='0' width='100%'>
            <tr>
                <td align='center' style='padding:40px 20px;'>
                    <table role='presentation' border='0' cellpadding='0' cellspacing='0' width='600' style='background:#0d0d0d;border:1px solid rgba(255,255,255,0.1);border-radius:12px;'>
                        <tr>
                            <td style='text-align:center;padding:30px 20px;'>
                                <h1 style='font-family:Lobster,cursive;font-size:34px;color:#eca917;margin:0 0 10px;'>Porudžbina #{$order->get_order_number()}</h1>
                                <p style='color:rgba(255,255,255,0.75);margin:0;font-size:14px;'>Hvala, {$ime}! Vaša porudžbina je uspešno primljena.</p>
                            </td>
                        </tr>

                        <tr>
                            <td style='padding:0 30px;'>
                                <table role='presentation' width='100%' cellpadding='0' cellspacing='0' style='margin-top:20px;border-top:1px solid rgba(255,255,255,0.1);padding-top:20px;'>
                                    $order_items_html
                                    <tr>
                                        <td style='padding-top:10px;color:#eca917;font-weight:600;font-size:15px;'>Ukupno:</td>
                                        <td style='padding-top:10px;text-align:right;color:#eca917;font-weight:600;font-size:15px;'>$order_total</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
    ";

    if (!empty($eta)) {
        $body .= "
                        <tr>
                            <td style='padding:20px 30px 0;'>
                                <div style='background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px;text-align:center;color:#fff;font-size:14px;'>
                                    Očekivano vreme isporuke (ETA): <strong style='color:#eca917;'>$eta</strong>
                                </div>
                            </td>
                        </tr>
        ";
    }

    $body .= "
                        <tr>
                            <td style='text-align:center;padding:30px 30px 20px;'>
                                <a href='$order_tracking_url' style='display:inline-block;background:#eca917;color:#0d0d0d;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px;'>Prati porudžbinu</a>
                            </td>
                        </tr>

                        <tr>
                            <td style='padding:0 30px 30px;text-align:center;color:rgba(255,255,255,0.6);font-size:13px;'>
                                Ako imate bilo kakva pitanja, kontaktirajte nas na 
                                <a href='mailto:office@opaklopa.rs' style='color:#eca917;text-decoration:none;'>office@opaklopa.rs</a>
                                ili pozovite <span style='color:#eca917;'>066/513-85-76</span>.
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    ";

    $headers = array('Content-Type: text/html; charset=UTF-8');

    wp_mail($to, $subject, $body, $headers);
}

add_action('woocommerce_order_status_cancelled', 'posalji_html_email_korisniku_za_odbijenu_porudzbinu', 10, 1);

function posalji_html_email_korisniku_za_odbijenu_porudzbinu($order_id)
{
    if (!$order_id) return;

    $order = wc_get_order($order_id);
    $to = $order->get_billing_email();
    $subject = 'Porudžbina #' . $order->get_order_number() . ' je odbijena';

    $ime = $order->get_billing_first_name();

    // Artikli u porudžbini
    $order_items_html = '';
    foreach ($order->get_items() as $item) {
        $product_name = esc_html($item->get_name());
        $quantity = $item->get_quantity();
        $total = wc_price($item->get_total());
        $order_items_html .= "
            <tr>
                <td style='padding:8px 0;color:#fff;font-size:14px;'>$product_name (x$quantity)</td>
                <td style='padding:8px 0;color:#fff;font-size:14px;text-align:right;'>$total</td>
            </tr>
        ";
    }

    $order_total = $order->get_formatted_order_total();
    $support_email = 'office@opaklopa.rs';
    $support_phone = '066/513-85-76';

    // HTML email
    $body = "
    <!DOCTYPE html>
    <html lang='sr'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <link href='https://fonts.googleapis.com/css2?family=Lobster&display=swap' rel='stylesheet'>
        <title>Porudžbina odbijena</title>
    </head>
    <body style='margin:0;padding:0;background:#0d0d0d;font-family:Inter,Arial,sans-serif;color:#ffffff;'>
        <table role='presentation' border='0' cellpadding='0' cellspacing='0' width='100%'>
            <tr>
                <td align='center' style='padding:40px 20px;'>
                    <table role='presentation' border='0' cellpadding='0' cellspacing='0' width='600' style='background:#0d0d0d;border:1px solid rgba(255,255,255,0.1);border-radius:12px;'>
                        <tr>
                            <td style='text-align:center;padding:30px 20px;'>
                                <h1 style='font-family:Lobster,cursive;font-size:34px;color:#eca917;margin:0 0 10px;'>Porudžbina #{$order->get_order_number()}</h1>
                                <p style='color:#ff4d4f;font-weight:600;font-size:16px;margin:0 0 8px;'>Nažalost, vaša porudžbina je odbijena</p>
                                <p style='color:rgba(255,255,255,0.75);margin:0;font-size:14px;'>Zdravo, {$ime}. Izvinjavamo se, ali iz određenih razloga ova porudžbina nije mogla biti prihvaćena.</p>
                            </td>
                        </tr>

                        <tr>
                            <td style='padding:0 30px;'>
                                <table role='presentation' width='100%' cellpadding='0' cellspacing='0' style='margin-top:20px;border-top:1px solid rgba(255,255,255,0.1);padding-top:20px;'>
                                    $order_items_html
                                    <tr>
                                        <td style='padding-top:10px;color:#eca917;font-weight:600;font-size:15px;'>Ukupno:</td>
                                        <td style='padding-top:10px;text-align:right;color:#eca917;font-weight:600;font-size:15px;'>$order_total</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr>
                            <td style='text-align:center;padding:30px 30px 10px;'>
                                <a href='" . esc_url(get_site_url()) . "' style='display:inline-block;background:#eca917;color:#0d0d0d;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px;'>Napravi novu porudžbinu</a>
                            </td>
                        </tr>

                        <tr>
                            <td style='padding:0 30px 30px;text-align:center;color:rgba(255,255,255,0.6);font-size:13px;'>
                                Ukoliko mislite da je došlo do greške ili želite dodatne informacije, kontaktirajte nas na 
                                <a href='mailto:$support_email' style='color:#eca917;text-decoration:none;'>$support_email</a>
                                ili pozovite <span style='color:#eca917;'>$support_phone</span>.
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    ";

    $headers = array('Content-Type: text/html; charset=UTF-8');

    wp_mail($to, $subject, $body, $headers);
}

// ✅ Promena imena pošiljaoca
add_filter('wp_mail_from_name', function ($original_email_from) {
    return 'Opa Klopa'; // Ovde ide naziv koji želiš da se prikazuje kao pošiljalac
});

// ✅ Promena email adrese pošiljaoca
add_filter('wp_mail_from', function ($original_email_address) {
    return 'noreply@opaklopa.rs'; // Ovde koristi validnu email adresu tvoje domene
});
