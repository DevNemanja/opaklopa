<?php get_header(); ?>

<main>
  <div class="left">
    <?php
    get_template_part('template-parts/shop-closed-modal');
    ?>

    <div data-module="ORDER"></div>

    <?php
    // Define all categories to render
    $categories = [
      'novo-u-ponudi',
      'pizza'              => 'Pizza',
      'sendvici',
      'obroci-na-meru',
      'opa-klopa-obroci',
      'burgeri',
      'rostilj',
      'klasik',
      'slane-palacinke',
      'palacinke',
      'smoothie',
      'salate',
      'tortilje',
      'hrono-obroci',
      'komplet-lepinje',
      'poslastice',
      'prilozi',
      'pica',
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