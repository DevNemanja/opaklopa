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
        OPA KLOPA
      </a>
    </div>
    <h2>PIZZA</h2>
    <?php 
      $products_IDs = new WP_Query( array(
        'post_type' => 'product',
        'posts_per_page' => -1,
        'product_cat' => 'slane palacinke'
    ));
      while ($products_IDs->have_posts() ) : $products_IDs->the_post();
        global $product;
      ?>

          <?php echo $product->get_price_html(); ?>
          <p><?php the_title(); ?></p>
        <?php 
      endwhile;
    ?>
  </div>
</header>
