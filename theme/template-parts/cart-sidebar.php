<div class="cart-sidebar" data-module="CART_SIDEBAR">
  <div class="cart-sidebar__overlay"></div>
  <div class="cart-sidebar__sidebar">
    <button class="cart-sidebar__close-button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF" width="24px" height="24px">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M18 6L6 18M6 6l12 12" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <h2 class="cart-sidebar__title">Vaša korpa</h2>
    <ul class="cart-sidebar__list">
      <!-- Populated via JS -->
    </ul>
    <div class="cart-sidebar__suggestion">
      <p class="cart-sidebar__suggestion-title">Sugestije:</p>

      <ul class="cart-sidebar__empty-cart-suggestion">
        <?php
          $args = array(
              'post_type' => 'product',
              'posts_per_page' => -1,
              'tax_query' => array(
                  array(
                      'taxonomy' => 'product_tag',
                      'field' => 'slug',
                      'terms' => array('prazna-korpa-sugestija'),
                      'operator' => 'IN',
                  ),
              ),
          );

          $products_query = new WP_Query($args);

          if ($products_query->have_posts()) {
              while ($products_query->have_posts()) {
                  $products_query->the_post();
                  global $product;
                  // Display your product information here
                  ?>
                  <li class="product" data-module="ADD_TO_CART" data-id="<?php echo get_the_ID(); ?>" data-name="<?php the_title(); ?>" data-price="<?php echo $product->get_price(); ?>" data-img-url="<?php echo get_the_post_thumbnail_url($post->ID) ?>">
                    <div class="product__info">
                      <div class="product__name-wrapper">
                        <div class="product__name"><?php the_title(); ?></div>
                        <div class="product__price"><?php echo $product->get_price_html(); ?>rsd</div>
                      </div>
                      <div class="product__ingredients">
                        <?php the_content(); ?>
                      </div>
                      
                      <?php if ($has_variations) : ?>
                        <div class="product__variations">
                          <?php
                            $variations = $product->get_available_variations();
                            $first_variation = true; // Flag to track the first variation

                            foreach ($variations as $variation) {
                              $variation_id = $variation['variation_id'];
                              $variation_obj = wc_get_product($variation_id);
                          ?>
                              <div class="product__variation">
                                <input class="product__variation-input" data-price="<?php echo $variation_obj->get_price(); ?>" data-id="<?php echo $variation_id; ?>" type="radio" name="<?php the_title(); ?>" id="<?php echo $variation_obj->get_name(); ?>" <?php if ($first_variation) echo 'checked'; ?>>
                                <label class="product__variation-label" for="<?php echo $variation_obj->get_name(); ?>"><?php echo $variation_obj->get_name(); ?> <?php echo $variation_obj->get_price_html(); ?>rsd</label>
                              </div>
                          <?php
                              $first_variation = false; // Set the flag to false after the first variation
                            }
                          ?>
                        </div>
                      <?php endif; ?>

                      
                      <div class="product__cart-data">
                        <button class="add-to-cart button">Dodaj u korpu</button>
                      </div>  
                    </div>
                    <div class="product__image-wrapper">
                      <?php if(get_the_post_thumbnail_url($post->ID)) :  ?>
                        <img src="<?php echo get_the_post_thumbnail_url($post->ID) ?>" alt="<?php the_title(); ?>"  title="<?php the_title(); ?>" class="product__image">
                      <?php endif; ?>
                    </div>
                  </li>
                  <?php
              }
          }

          wp_reset_postdata();
          ?>

      </ul>

      <ul class="cart-sidebar__full-cart-suggestion">
        <?php
          $args = array(
              'post_type' => 'product',
              'posts_per_page' => -1,
              'tax_query' => array(
                  array(
                      'taxonomy' => 'product_tag',
                      'field' => 'slug',
                      'terms' => array('puna-korpa-sugestija'),
                      'operator' => 'IN',
                  ),
              ),
          );

          $products_query = new WP_Query($args);

          if ($products_query->have_posts()) {
              while ($products_query->have_posts()) {
                  $products_query->the_post();
                  global $product;
                  // Display your product information here
                  ?>
                    <li>
                      <button class="cart-sidebar__suggestion-button" data-suggestion-id="<?php echo get_the_ID(); ?>" data-suggestion-name="<?php the_title(); ?>" data-price="<?php echo $product->get_price(); ?>" data-img-url="<?php echo get_the_post_thumbnail_url($post->ID) ?>">
                        <p class="cart-sidebar__suggestion-desc"><?php the_title(); ?></p>
                        <img class="cart-sidebar__suggestion-img" src="<?php echo get_the_post_thumbnail_url($post->ID) ?>" alt="<?php the_title(); ?>" title="Dodaj <?php the_title(); ?>">
                      </button>
                    </li>
                  <?php
              }
          }

          wp_reset_postdata();
          ?>
      </ul>
    </div>
    <div class="cart-sidebar__loading">
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
    <form class="order-form order-form--hidden">
      <div class="order-form__form-control">
        <input class="order-form__input writtable" placeholder="Ime i prezime" id="name" type="text">
      </div>
      <div class="order-form__form-control">
        <input class="order-form__input writtable" placeholder="Adresa" id="address" type="text">
      </div>
      <div class="order-form__form-control">
        <input class="order-form__input writtable" placeholder="Email" id="mail" type="mail">
      </div>
      <div class="order-form__form-control">
        <input class="order-form__input writtable" placeholder="Telefon" id="telefon" type="tel">
      </div>
      <div class="order-form__form-control">
        <textarea class="order-form__textarea writtable" placeholder="Poruka" id="poruka"></textarea>
      </div>
      <button class="order-form__submit-cart button">Potvrdi porudžbinu</button>
    </form>
  </div> 
</div>
