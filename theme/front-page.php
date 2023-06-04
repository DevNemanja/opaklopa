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
    <div class="right cart-sidebar" data-module="CART_SIDEBAR">
      <ul class="cart-sidebar__list"></ul>
      <button class="cart-sidebar__submit-cart">SUBMIT</button>
      <form>
        <div class="form-control">
          <label for="name">Ime i prezime</label>
          <input id="name" type="text">
        </div>
        <div class="form-control">
          <label for="address">Adresa</label>
          <input id="address" type="text">
        </div>
        <div class="form-control">
          <label for="mail">E-mail</label>
          <input id="mail" type="mail">
        </div>
        <div class="form-control">
          <label for="telefon">Telefon</label>
          <input id="telefon" type="tel">
        </div>
        <div class="form-control">
          <label for="poruka">Poruka</label>
          <textarea id="poruka"></textarea>
        </div>
      </form>
    </div> 
</main>

<?php get_footer(); ?>