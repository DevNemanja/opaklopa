<?php get_header(); ?>

<main>
  <div class="left">
    <?php

    if (!is_shop_open()) {
      echo '<div style="background: #ffdddd; padding: 10px; text-align: center; font-weight: bold; color: #d00;">Radnja je trenutno zatvorena. Molimo Vas da dođete kasnije.</div>';
    }
    ?>

    <div data-module="ORDER"></div>

    <?php
    // Define all categories to render
    $categories = [
      'pizza'              => 'Pizza',
      // 'novo-u-ponudi',
      // 'sendvici',
      // 'obroci-na-meru',
      // 'opa-klopa-obroci',
      // 'prilozi',
      // 'burgeri',
      'rostilj',
      // 'klasik',
      // 'slane-palacinke',
      // 'palacinke',
      // 'smoothie',
      // 'salate',
      // 'tortilje',
      // 'hrono-obroci',
      // 'komplet-lepinje',
      // 'poslastice',
      // 'pica',
    ];

    foreach ($categories as $slug => $title) {
      // Support both "slug only" or "slug => title"
      $product_category = is_int($slug) ? $title : $slug;
      $title = is_int($slug) ? null : $title;

      require 'template-parts/all-products-in-category.php';
    }
    ?>

  </div>



  <?php require('template-parts/cart-sidebar.php');  ?>
  <?php require('template-parts/order-confirmation.php');  ?>

</main>

<?php get_footer(); ?>