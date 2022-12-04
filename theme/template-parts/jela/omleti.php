<section class="products">
  <div class="container">
    <div class="title title--with-icon">
      <h2 class="title__header">Omleti</h2>
      <svg width="42" height="40" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="title__icon">
        <path d="M30.0426 9.3125C27.114 5.04687 23.5739 2.5 20.597 2.5C17.6201 2.5 14.0799 5.04687 11.1513 9.3125C8.22267 13.5781 6.43652 18.9375 6.43652 23.75C6.43652 27.3967 7.92842 30.8941 10.584 33.4727C13.2396 36.0513 16.8414 37.5 20.597 37.5C24.3526 37.5 27.9543 36.0513 30.6099 33.4727C33.2655 30.8941 34.7574 27.3967 34.7574 23.75C34.7574 18.9375 33.0356 13.6719 30.0426 9.3125V9.3125ZM20.597 35C17.5255 34.9959 14.5811 33.8093 12.4093 31.7004C10.2374 29.5915 9.01541 26.7324 9.01115 23.75C9.01115 19.4219 10.572 14.6563 13.3076 10.6875C15.6408 7.28125 18.5695 5 20.597 5C22.1257 5 24.1693 6.29687 26.0841 8.40625L19.9211 15.0625C19.784 15.214 19.6862 15.3952 19.6358 15.5909C19.5854 15.7866 19.5839 15.9911 19.6315 16.1875C19.6837 16.3829 19.7822 16.5637 19.9191 16.7156C20.056 16.8675 20.2275 16.9863 20.42 17.0625L24.0566 18.4219L23.0911 23.2031C23.0297 23.5302 23.1033 23.8677 23.296 24.1425C23.4887 24.4173 23.7851 24.6075 24.121 24.6719H24.3624C24.6622 24.6704 24.9524 24.5686 25.184 24.3836C25.4156 24.1986 25.5744 23.9417 25.6336 23.6562L26.7922 17.8594C26.8467 17.5708 26.7963 17.2727 26.6496 17.0162C26.5028 16.7596 26.2688 16.5606 25.9876 16.4531L23.0911 15.3594L27.6933 10.3906L27.8864 10.6719C30.6219 14.6406 32.1828 19.4062 32.1828 23.7344C32.1828 26.7195 30.9627 29.5826 28.7904 31.6949C26.6181 33.8071 23.6712 34.9959 20.597 35V35Z" fill="#ECA917"/>
      </svg>
    </div>
    <div class="products__wrapper">
      <?php 
        $products_IDs = new WP_Query( array(
          'post_type' => 'product',
          'posts_per_page' => -1,
          'product_cat' => 'omleti-u-somunu'
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