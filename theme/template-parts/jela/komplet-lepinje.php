<section class="products">
  <div class="container">
    <div class="title title--with-icon">
      <h2 class="title__header">Komplet lepinje</h2>
      <svg width="64" height="42" viewBox="0 0 64 42" fill="none" xmlns="http://www.w3.org/2000/svg" class="title__icon">
        <path d="M31.6393 1C48.5612 1 62.2786 13.1648 62.2786 28.1729C62.2786 41.889 48.5612 40.9878 31.6393 40.9878C14.7175 40.9878 1 41.889 1 28.1729C1 13.1648 14.7175 1 31.6393 1Z" stroke="#ECA917" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.12891 9.74464L28.5182 6.0177L30.7196 15.0663C30.7878 15.3475 30.9489 15.5975 31.1769 15.7758C31.4048 15.9541 31.6862 16.0502 31.9756 16.0486C32.265 16.047 32.5454 15.9479 32.7714 15.7671C32.9974 15.5864 33.1558 15.3347 33.2209 15.0527L35.3138 6.0177L54.1453 9.74464" stroke="#ECA917" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="products__wrapper">
      <?php 
        $products_IDs = new WP_Query( array(
          'post_type' => 'product',
          'posts_per_page' => -1,
          'product_cat' => 'komplet-lepinje'
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