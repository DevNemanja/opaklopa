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
    <div class="header__wrapper">
      <div class="container">
        <div class="header__container">
          <h1 class="header__logo">OpaKlopa</h1>
          <button class="header__cart">
            <img class="header__cart-icon" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/cart.svg" alt="Cart icon" title="Vaša korpa">
          </button>
          <?php require('template-parts/hamburger-menu.php'); ?>
          <?php require('template-parts/mobile-menu.php'); ?>
        </div>
      </div>
    </div>
  </header>

  <div class="layout-wrapper">
    <?php require('template-parts/navigator.php'); ?>



    <?php if (!is_shop_open()): ?>
      <style>
        /* .add-to-cart,
      .header__cart {
        display: none;
      } */
      </style>
    <?php endif; ?>