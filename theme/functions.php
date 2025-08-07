<?php

function wpstart_scripts()
{
  // Check if the current page is not the 'admin-page' template
  if (!is_page_template('admin-page.php')) {
    // Enqueue the scripts and styles
    wp_enqueue_style('style', get_stylesheet_directory_uri() . '/assets/css/style.css', [], time(), $media = 'all');
  }
  wp_enqueue_script('app', get_stylesheet_directory_uri() . '/assets/js/app.min.js', [], time(), true);
}

add_action('wp_enqueue_scripts', 'wpstart_scripts');

function wpb_custom_new_menu()
{
  register_nav_menu('main-menu', __('Main Menu'));
}

add_action('init', 'wpb_custom_new_menu');

function add_tags_to_pages()
{
  register_taxonomy_for_object_type('post_tag', 'project');
}
add_action('init', 'add_tags_to_pages');

add_theme_support('post-thumbnails');

add_filter('nav_menu_css_class', 'special_nav_class', 10, 2);

function special_nav_class($classes, $item)
{
  if (in_array('current-menu-item', $classes)) {
    $classes[] = 'active';
  }
  return $classes;
}

// Remove all currency symbols
function codeAstrology_remove_wc_currency_symbols($currency_symbol, $currency)
{
  $currency_symbol = '';
  return $currency_symbol;
}
add_filter('woocommerce_currency_symbol', 'codeAstrology_remove_wc_currency_symbols', 10, 2);
add_filter('woocommerce_enqueue_styles', '__return_empty_array'); // remove Woo CSS

// Protect admin page
function custom_password_protect()
{
  if ((is_page('admin-page') || is_page('admin')) && !is_user_logged_in()) {
    auth_redirect();
  } elseif ((is_page('admin-page') || is_page('admin')) && !current_user_can('administrator')) {
    wp_die('Access denied. You must be an administrator to view this page.');
  }
}
add_action('template_redirect', 'custom_password_protect');

// Kod za radno vreme
require_once get_template_directory() . '/radno-vreme.php';
require_once get_template_directory() . '/porudzbine.php';


add_action( 'woocommerce_admin_order_data_after_order_details', 'add_eta_field_to_admin_order' );
function add_eta_field_to_admin_order( $order ) {
    $eta = get_post_meta( $order->get_id(), '_order_eta', true );
    ?>
    <div class="form-field form-field-wide">
        <label for="order_eta"><?php _e( 'ETA (Estimated Time of Arrival)', 'your-textdomain' ); ?></label>
        <input type="text" name="order_eta" id="order_eta" value="<?php echo esc_attr( $eta ); ?>" placeholder="YYYY-MM-DD HH:MM" />
        <p class="description"><?php _e( 'Unesite procenjeno vreme dolaska za ovu porudžbinu.', 'your-textdomain' ); ?></p>
    </div>
    <?php
}

add_action( 'woocommerce_process_shop_order_meta', 'save_eta_field_from_admin_order' );
function save_eta_field_from_admin_order( $order_id ) {
    if ( isset( $_POST['order_eta'] ) ) {
        update_post_meta( $order_id, '_order_eta', sanitize_text_field( $_POST['order_eta'] ) );
    }
}

add_action('woocommerce_new_order', 'posalji_email_korisniku_za_porudzbinu', 10, 1);

function posalji_email_korisniku_za_porudzbinu($order_id) {
    if (!$order_id) return;

    $order = wc_get_order($order_id);
    $to = $order->get_billing_email(); // Email korisnika

    $subject = 'Hvala na porudžbini #' . $order->get_order_number();

    $body = 'Zdravo ' . $order->get_billing_first_name() . ",\n\n";
    $body .= "Hvala što ste naručili sa našeg sajta. Evo detalja vaše porudžbine:\n\n";

    foreach ($order->get_items() as $item) {
        $product_name = $item->get_name();
        $quantity = $item->get_quantity();
        $total = wc_price($item->get_total());
        $body .= "- $product_name (x$quantity): $total\n";
    }

    $body .= "\nUkupno: " . $order->get_formatted_order_total();
    $body .= "\n\nVaša porudžbina će uskoro biti obrađena.";
    $body .= "\n\nMozete proveriti status porudzbine na www.opaklopa.rs?opa-order=" . $order_id;

    $headers = array('Content-Type: text/plain; charset=UTF-8');

    wp_mail($to, $subject, $body, $headers);
}