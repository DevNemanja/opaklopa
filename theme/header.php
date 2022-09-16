<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?> Opa Klopa</title>
</head>
<body>

<?php wp_head(); ?>
<style>
  body:before {
    background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/assets/images/opa-bg.png);
  }
</style>
<header class="header" data-module="HEADER">
  <div class="container">
    <div class="header__container">
        <h1 class="header__logo">OpaKlopa</h1>
    </div>
  </div>
</header>
