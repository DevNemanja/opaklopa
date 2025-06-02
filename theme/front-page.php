<?php get_header(); ?>

<main>
  <div class="left">
    <?php

    if (!is_shop_open()) {
      echo '<div style="background: #ffdddd; padding: 10px; text-align: center; font-weight: bold; color: #d00;">Radnja je trenutno zatvorena. Molimo Vas da dođete kasnije.</div>';
    }
    ?>


    <?php

    $product_category = 'pizza';
    $title = 'Pizza';
    require('template-parts/all-products-in-category.php');

    // require('template-parts/free-delivery.php');

    $product_category = 'sendvici';
    require('template-parts/all-products-in-category.php');

    $product_category = 'slane-palacinke';
    require('template-parts/all-products-in-category.php');

    $product_category = 'palacinke';
    require('template-parts/all-products-in-category.php');

    $product_category = 'smoothie';
    require('template-parts/all-products-in-category.php');

    $product_category = 'piletina';
    require('template-parts/all-products-in-category.php');

    $product_category = 'pohovano';
    require('template-parts/all-products-in-category.php');

    $product_category = 'salate';
    require('template-parts/all-products-in-category.php');

    $product_category = 'tortilje';
    require('template-parts/all-products-in-category.php');

    $product_category = 'hrono-obroci';
    require('template-parts/all-products-in-category.php');

    $product_category = 'omleti-u-somunu';
    require('template-parts/all-products-in-category.php');

    $product_category = 'komplet-lepinje';
    require('template-parts/all-products-in-category.php');

    $product_category = 'poslastice';
    require('template-parts/all-products-in-category.php');

    $product_category = 'pica';
    require('template-parts/all-products-in-category.php');

    ?>

  </div>

  <?php require('template-parts/cart-sidebar.php');  ?>
  <?php require('template-parts/order-confirmation.php');  ?>

</main>

<?php get_footer(); ?>