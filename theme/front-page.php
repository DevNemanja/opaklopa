<?php get_header(); ?>

<main>
  <div class="left">
<!-- <pre class="test">
<?php // var_dump($woocommerce->cart->add_to_cart(178, 1)); ?>
  <?php var_dump($woocommerce->cart->get_cart()); ?>
  <button class="AJMO">Add to cart</button>
  </pre> -->

  <?php 
    // $product_category = 'pizza';
    // $title = 'Pizza';
    // require('template-parts/all-products-in-category.php'); 

    // require('template-parts/free-delivery.php');

    $product_category = 'sendvici';
    $title = 'Sendvici';
    require('template-parts/all-products-in-category.php'); 

    $product_category = 'slane-palacinke';
    $title = 'Slane Palacinke';
    require('template-parts/all-products-in-category.php'); 

    $product_category = 'palacinke';
    $title = 'Slatke Palacinke';
    require('template-parts/all-products-in-category.php'); 

    $product_category = 'smoothie';
    $title = 'Smoothie';
    require('template-parts/all-products-in-category.php'); 

    $product_category = 'piletina';
    $title = 'Piletina';
    require('template-parts/all-products-in-category.php'); 

    $product_category = 'pohovano';
    $title = 'Pohovano';
    require('template-parts/all-products-in-category.php'); 
  
    $product_category = 'salate';
    $title = 'Salate';
    require('template-parts/all-products-in-category.php'); 
  
    $product_category = 'tortilje';
    $title = 'Tortilje';
    require('template-parts/all-products-in-category.php'); 
  
    $product_category = 'hrono-obroci';
    $title = 'Hrono Obroci';
    require('template-parts/all-products-in-category.php'); 
  
    $product_category = 'omleti-u-somunu';
    $title = 'Omleti';
    require('template-parts/all-products-in-category.php'); 
    
    $product_category = 'komplet-lepinje';
    $title = 'Komplet lepinje';
    require('template-parts/all-products-in-category.php'); 
    
    $product_category = 'poslastice';
    $title = 'Poslastice';
    require('template-parts/all-products-in-category.php'); 
  ?>

  </div>
  <div class="right">
    <p>Cart count: (<?php echo WC()->cart->get_cart_contents_count(); ?>)</p>
    <p>Total Price: <?php echo WC()->cart->get_cart_total(); ?>din</p>
    <pre>
      <?php //print_r(WC()->cart->cart_contents); ?>
      <?php //print_r(WC()->cart->get_customer()); ?>

      <?php 
        $cartContents = WC()->cart->cart_contents;

        foreach ($cartContents as $item) : ?>

          <?php $nonce = wp_create_nonce('wc_store_api'); ?>

          <p id="nonce"><?php echo $nonce; ?></p>

          <?php print_r($item['data']->get_data()['name']) ?>

          <div>
            <p>Title: <?php echo $item['data']->get_data()['name']; ?>  </p>
            <p>Price: <?php echo $item['line_total']; ?> </p>
            <p>Quantity: <?php echo $item['quantity']; ?> </p>
            <button id="add" data-id="<?php echo $item['data']->get_data()['id'] ?>">Add item to cart</button>
            <button id="remove" data-id="<?php echo $item['data']->get_data()['id'] ?>">Remove item to cart</button>
            <button id="log-cart">Log cart</button>
          </div>

      <?php endforeach; ?>
    </pre>
  </div>
</main>

<?php get_footer(); ?>