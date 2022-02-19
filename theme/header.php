<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?> Opa Klopa</title>
</head>
<body>

<?php wp_head(); ?>

<header class="header" data-module="HEADER">
  <div class="container">
    <div class="header__container">
      <a class="header__logo" title="Go to Homepage" href="/">
        <img src="<?php echo get_stylesheet_directory_uri() ?>/assets/images/logo.png" alt="Milica's Logo">
      </a>
      <nav class="header__nav <?php if(is_front_page()) echo 'header__nav--homepage' ?>">
        <?php
        wp_nav_menu( array( 
          'theme_location' => 'main-menu' ) ); 
          ?>
      </nav>
    </div>
  </div>
</header>
