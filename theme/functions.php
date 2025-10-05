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


add_action('woocommerce_admin_order_data_after_order_details', 'add_eta_field_to_admin_order');
function add_eta_field_to_admin_order($order)
{
  $eta = get_post_meta($order->get_id(), '_order_eta', true);
?>
  <div class="form-field form-field-wide">
    <label for="order_eta"><?php _e('ETA (Estimated Time of Arrival)', 'your-textdomain'); ?></label>
    <input type="text" name="order_eta" id="order_eta" value="<?php echo esc_attr($eta); ?>" placeholder="YYYY-MM-DD HH:MM" />
    <p class="description"><?php _e('Unesite procenjeno vreme dolaska za ovu porudžbinu.', 'your-textdomain'); ?></p>
  </div>
<?php
}

add_action('woocommerce_process_shop_order_meta', 'save_eta_field_from_admin_order');
function save_eta_field_from_admin_order($order_id)
{
  if (isset($_POST['order_eta'])) {
    update_post_meta($order_id, '_order_eta', sanitize_text_field($_POST['order_eta']));
  }
}

// add_action('woocommerce_order_status_processing', 'posalji_email_korisniku_za_porudzbinu', 10, 1);

// function posalji_email_korisniku_za_porudzbinu($order_id)
// {
//   if (!$order_id) return;

//   $order = wc_get_order($order_id);
//   $to = $order->get_billing_email(); // Email korisnika

//   $subject = 'Hvala na porudžbini #' . $order->get_order_number();

//   $body = 'Zdravo ' . $order->get_billing_first_name() . ",\n\n";
//   $body .= "Hvala što ste naručili sa našeg sajta. Evo detalja vaše porudžbine:\n\n";

//   foreach ($order->get_items() as $item) {
//     $product_name = $item->get_name();
//     $quantity = $item->get_quantity();
//     $total = wc_price($item->get_total());
//     $body .= "- $product_name (x$quantity): $total\n";
//   }

//   $eta = get_post_meta($order->get_id(), '_order_eta', true);

//   if (!empty($eta)) {
//     $body .= "\nOčekivano vreme isporuke (ETA): " . $eta . "\n";
//   }

//   $body .= "\nUkupno: " . $order->get_formatted_order_total();
//   $body .= "\n\nVaša porudžbina će uskoro biti obrađena.";
//   $body .= "\n\nMozete proveriti status porudzbine na www.opaklopa.rs?opa-order=" . $order_id;

//   $headers = array('Content-Type: text/plain; charset=UTF-8');

//   wp_mail($to, $subject, $body, $headers);
// }

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
                                <a href='mailto:podrska@opaklopa.rs' style='color:#eca917;text-decoration:none;'>podrska@opaklopa.rs</a>
                                ili pozovite <span style='color:#eca917;'>+381 60 123 456</span>.
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
