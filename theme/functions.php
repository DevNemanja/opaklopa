<?php

function wpstart_scripts() {
  // Check if the current page is not the 'admin-page' template
  if (!is_page_template('admin-page.php')) {
    // Enqueue the scripts and styles
    wp_enqueue_style( 'style', get_stylesheet_directory_uri() . '/assets/css/style.css', [], time(), $media = 'all' );
  }
  wp_enqueue_script( 'app', get_stylesheet_directory_uri() . '/assets/js/app.min.js', [], time(), true );
}

add_action( 'wp_enqueue_scripts', 'wpstart_scripts' );

function wpb_custom_new_menu() {
  register_nav_menu('main-menu',__( 'Main Menu' ));
}

add_action( 'init', 'wpb_custom_new_menu' );

function add_tags_to_pages() {
  register_taxonomy_for_object_type( 'post_tag', 'project' );
}
add_action( 'init', 'add_tags_to_pages');

add_theme_support( 'post-thumbnails' );

add_filter('nav_menu_css_class' , 'special_nav_class' , 10 , 2);

function special_nav_class ($classes, $item) {
  if (in_array('current-menu-item', $classes) ){
    $classes[] = 'active';
  }
  return $classes;
}

// Remove all currency symbols
function codeAstrology_remove_wc_currency_symbols( $currency_symbol, $currency ) {
  $currency_symbol = '';
  return $currency_symbol;
}
add_filter('woocommerce_currency_symbol', 'codeAstrology_remove_wc_currency_symbols', 10, 2);
add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' ); // remove Woo CSS

// Protect admin page
function custom_password_protect() {
  if (is_page('admin-page') || is_page('admin-page') && !is_user_logged_in()) {
    auth_redirect();
  }
  elseif (is_page('admin-page') || is_page('admin-page') && !current_user_can('administrator')) {
    wp_die('Access denied. You must be an administrator to view this page.');
  }
}
add_action('template_redirect', 'custom_password_protect');
