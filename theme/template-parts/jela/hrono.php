<section class="products">
  <div class="container">
    <div class="title title--with-icon">
      <h2 class="title__header">Hrono obroci</h2>
      <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="title__icon">
          <path d="M15.8658 13.9383C17.6272 13.2569 27.4107 4.48834 21.0564 0.618181C15.2489 -2.91892 13.6135 9.72658 14.5406 13.1547C14.5859 13.536 15.2765 14.0058 15.8658 13.9383Z" fill="#ECA917"/>
          <path d="M28.3454 14.2696C22.0776 9.81636 16.8821 15.754 15.645 15.754C15.6218 15.754 15.5033 15.754 15.48 15.754C14.2431 15.754 9.04735 9.81627 2.77972 14.2696C-3.48807 18.7229 1.21278 40.0001 13.1708 40.0001C14.127 40.0001 14.9118 40.0001 15.7068 40.0001C16.4065 40.0001 17.114 40.0001 17.9544 40.0001C29.9124 40.0001 34.6131 18.7229 28.3454 14.2696ZM22.9847 25.0331C22.6546 27.0592 20.0502 29.5295 17.9578 31.5145C17.3929 32.0487 16.8212 32.5904 16.4688 32.9724C16.4329 33.0154 16.0379 33.4641 15.5925 33.4641C15.1503 33.4641 14.7464 33.022 14.7014 32.9718C14.37 32.615 13.861 32.1362 13.2715 31.5807L13.2231 31.5353C11.1072 29.5448 8.47322 27.0679 8.13966 25.0339C7.91123 23.632 8.11932 22.4963 8.75774 21.6586C9.40167 20.8135 10.4138 20.3276 11.8525 20.173C11.9717 20.1611 12.0941 20.1539 12.2206 20.1539C13.4975 20.1539 14.7698 20.7533 15.5627 21.7054C16.3546 20.7533 17.6275 20.1539 18.9052 20.1539C19.0317 20.1539 19.1548 20.1611 19.2715 20.173C20.7126 20.3276 21.7249 20.8132 22.3684 21.6589C23.0073 22.497 23.214 23.6322 22.9847 25.0331Z" fill="#ECA917"/>
      </svg>
    </div>
    <div class="products__wrapper">
      <?php 
        $products_IDs = new WP_Query( array(
          'post_type' => 'product',
          'posts_per_page' => -1,
          'product_cat' => 'hrono-obroci'
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