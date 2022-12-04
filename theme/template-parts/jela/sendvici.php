<section class="products">
  <div class="container">
    <div class="title title--with-icon">
      <h2 class="title__header">Sendviči</h2>
      <svg width="40" height="23" viewBox="0 0 40 23" fill="none" xmlns="http://www.w3.org/2000/svg" class="title__icon">
        <path d="M38.2506 14.7299L38.251 9.88517C39.1273 9.62187 39.7678 8.8081 39.7678 7.84715C39.7678 3.52023 36.2476 0 31.9206 0H7.84762C3.52069 0 0.000466029 3.52023 0.000466029 7.84715C0.000466029 8.80802 0.640945 9.62187 1.51731 9.88517L1.51692 14.7301C0.640479 14.9933 0 15.8072 0 16.7681V18.5264C0 20.9931 2.00726 23 4.4745 23H35.2938C37.7605 23 39.7673 20.9931 39.7673 18.5264V16.7681C39.7673 15.8069 39.1269 14.9929 38.2506 14.7299ZM30.6669 1.37214L32.1992 2.90453C32.627 3.33288 32.627 4.02967 32.1998 4.45741C31.7712 4.88538 31.0746 4.88554 30.6467 4.45772L27.5613 1.37222H30.6669V1.37214ZM20.3693 1.37214L21.9016 2.90453C22.3293 3.33288 22.3293 4.02967 21.9023 4.45741C21.4739 4.88523 20.7771 4.88507 20.3492 4.45772L17.2637 1.37222H20.3693V1.37214ZM7.84754 1.37222H10.0719L11.6042 2.9046C12.0319 3.33296 12.0319 4.02975 11.6048 4.45749C11.1765 4.88515 10.4797 4.88515 10.0517 4.4578L7.0208 1.4269C7.2918 1.39218 7.5673 1.37222 7.84754 1.37222ZM1.37261 7.84715C1.37261 5.1135 3.07633 2.77178 5.47708 1.82365L9.08174 5.4283C9.56315 5.90917 10.1955 6.14956 10.8279 6.14956C11.4605 6.14956 12.0933 5.90894 12.5751 5.42768C13.5369 4.46471 13.5369 2.89785 12.5748 1.93456L12.0125 1.3723H15.323L19.3791 5.42838C19.8606 5.90925 20.4928 6.14964 21.1252 6.14964C21.7579 6.14964 22.3907 5.90901 22.8725 5.42776C23.8343 4.46479 23.8343 2.89792 22.8722 1.93464L22.31 1.37238H25.6205L29.6763 5.42815C30.1576 5.90948 30.7898 6.15003 31.4224 6.15003C32.055 6.15003 32.6879 5.90932 33.17 5.42784C34.1316 4.46487 34.1316 2.898 33.1697 1.93472L32.6495 1.41455C35.8777 1.77813 38.3953 4.52359 38.3953 7.84731C38.3953 8.26393 38.0564 8.60289 37.6398 8.60289H37.5646H2.20331H2.1282C1.71157 8.60274 1.37261 8.26378 1.37261 7.84715ZM2.88946 11.6211V9.97488H36.8787V11.6211H2.88946ZM36.8783 12.9938V14.6401H18.0235L19.6697 12.9938H36.8783ZM17.7291 12.9938L13.4857 17.2378L9.24174 12.9938H17.7291ZM8.94744 14.6401H2.88907V12.9938H7.30112L8.94744 14.6401ZM35.2938 21.6277H4.4745C2.76394 21.6277 1.3723 20.2364 1.3723 18.5264V16.768C1.3723 16.3513 1.71134 16.0124 2.12797 16.0124H2.203H10.3197L13.0006 18.6932C13.1292 18.8219 13.3037 18.8942 13.4857 18.8942C13.6677 18.8942 13.8422 18.8218 13.9709 18.6932L16.6514 16.0124H37.5644H37.6404C38.0565 16.0124 38.3951 16.3513 38.3951 16.768V18.5264C38.3951 20.2365 37.0038 21.6277 35.2938 21.6277Z" fill="#ECA917"/>
      </svg>

    </div>
    <div class="products__wrapper">
      <?php 
        $products_IDs = new WP_Query( array(
          'post_type' => 'product',
          'posts_per_page' => -1,
          'product_cat' => 'sendvici'
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