<section class="products" data-module="OPA">
  <div class="container">
    <div class="title title--with-icon">
      <h2 class="title__header">Pohovano</h2>
      <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/fries.svg" alt="" class="title__icon">
    </div>
    <div class="products__wrapper">
      <?php 
        $products_IDs = new WP_Query( array(
          'post_type' => 'product',
          'posts_per_page' => -1,
          'product_cat' => 'pohovano'
        ));
        while ($products_IDs->have_posts() ) : $products_IDs->the_post();
        global $product;
      ?>

      <div class="product">
          <div class="product__info">
            <div class="product__name"><?php the_title(); ?></div>
            <div class="product__ingredients">
              <?php the_content(); ?>
            </div>
            <div class="product__price"><?php echo $product->get_price_html(); ?>rsd</div>
          </div>
          <div class="product__image-wrapper">
            <?php if(get_the_post_thumbnail_url($post->ID)) :  ?>
              <img src="<?php echo get_the_post_thumbnail_url($post->ID) ?>" alt="SLIKA" class="product__image">
            <?php else: ?>
              <!-- <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/pizza.png" alt="" class="product__image"> -->
            <?php endif; ?>          
          </div>
      </div>
      <?php endwhile; ?>
    </div>
  </div>
</section>