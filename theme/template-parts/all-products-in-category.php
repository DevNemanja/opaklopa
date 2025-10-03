<?php
$icon = '';

// učitavanje SVG-ova iz fajla
$icons = include __DIR__ . '/category-icons.php';

// dobijanje SVG-a na osnovu kategorije
$icon = $icons[$product_category] ?? '';

$category = get_term_by('slug', $product_category, 'product_cat'); // Get the category object by slug
$title = $category->name; // Use the category name as the title

?>

<section class="products">

  <div class="container">
    <div class="title title--with-icon">
      <h2 class="title__header"><?php echo $title ?></h2>
      <?php echo $icon; ?>
    </div>
    <div class="products__wrapper">
      <?php
      $products_IDs = new WP_Query([
        'post_type'      => 'product',
        'posts_per_page' => -1,
        'product_cat'    => $product_category
      ]);
      while ($products_IDs->have_posts()) : $products_IDs->the_post();
        global $product;

        $has_variations = $product->is_type('variable');
      ?>

        <div class="product"
          data-module="ADD_TO_CART"
          data-id="<?php echo get_the_ID(); ?>"
          data-name="<?php the_title(); ?>"
          data-price="<?php echo $product->get_price(); ?>"
          data-img-url="<?php echo get_the_post_thumbnail_url($post->ID) ?>"
          <?php if ($has_variations) echo 'data-has-variations="true"'; ?>>
          <div class="product__overlay"></div>
          <div class="product__info">
            <div class="product__name-wrapper">
              <div class="product__name">
                <?php the_title(); ?>
              </div>
              <div class="product__price"><?php echo $product->get_price_html(); ?>rsd</div>
            </div>

            <div class="product__ingredients">
              <?php the_content(); ?>
              <?php if ($product->has_weight()) : ?>
                <span><?php echo wc_format_weight($product->get_weight()); ?></span>
              <?php endif; ?>
            </div>

            <?php if ($has_variations) : ?>
              <div class="product__variations">
                <?php
                $variations = $product->get_available_variations();
                $first_variation = true;

                foreach ($variations as $variation) {
                  $variation_id  = $variation['variation_id'];
                  $variation_obj = wc_get_product($variation_id);
                ?>
                  <div class="product__variation">
                    <input class="product__variation-input"
                      data-price="<?php echo $variation_obj->get_price(); ?>"
                      data-id="<?php echo $variation_id; ?>"
                      data-variation="<?php echo $variation_id; ?>"
                      type="radio"
                      name="<?php the_title(); ?>"
                      id="<?php echo $variation_obj->get_name(); ?>"
                      <?php if ($first_variation) echo 'checked'; ?>>
                    <label class="product__variation-label" for="<?php echo $variation_obj->get_name(); ?>">
                      <?php echo $variation_obj->get_name(); ?> <?php echo $variation_obj->get_price_html(); ?>rsd
                    </label>
                  </div>
                <?php
                  $first_variation = false;
                }
                ?>
              </div>
            <?php endif; ?>




            <?php
            $cross_sell_ids = $product->get_cross_sell_ids();

            if (!empty($cross_sell_ids)) {

              $free_products = [];
              $paid_products = [];

              foreach ($cross_sell_ids as $cs_id) {
                $cs_product = wc_get_product($cs_id);
                if (!$cs_product) continue;

                $products_to_add = [];

                if ($cs_product->is_type('grouped')) {
                  $child_ids = $cs_product->get_children();
                  foreach ($child_ids as $child_id) {
                    $child_product = wc_get_product($child_id);
                    if ($child_product) $products_to_add[] = $child_product;
                  }
                } else {
                  $products_to_add[] = $cs_product;
                }

                foreach ($products_to_add as $p) {
                  if ($p->get_price() > 0) {
                    $paid_products[] = $p;
                  } else {
                    $free_products[] = $p;
                  }
                }
              }

              // Spoji tako da free budu prvi
              $all_products_sorted = array_merge($free_products, $paid_products);

              echo '<div class="product__sides-wrapper">';

              // Prikaz proizvoda sa checkbox-om
              foreach ($all_products_sorted as $prod) :
                $price = $prod->get_price();
                $prod_id = $prod->get_id();
                $prod_name = esc_html($prod->get_name());
            ?>
                <div class="product__variation">
                  <input class="sides product__variation-input" id="sides-<?= $prod_id . '-' . $product->get_id(); ?>" type="checkbox" name="<?= $prod_name; ?>" value="<?= $prod_id; ?>" data-price="<?php echo $price; ?>">
                  <label class="product__variation-label" for="sides-<?= $prod_id . '-' . $product->get_id(); ?>">
                    <?= $prod_name; ?>
                    <?php if ($price > 0) : ?>
                      <span><?= wc_price($price); ?></span>
                    <?php endif; ?>
                  </label>
                </div>
              <?php endforeach; ?>

              <div class="product__cart-data">
                <button class="add-to-cart button">Dodaj u korpu</button>
              </div>
            <?php

              echo '</div>';
            }
            ?>

            <?php if (!empty($cross_sell_ids)): ?>
              <div>
                <button class="product__show-sides button">Izaberi priloge</button>
              </div>
            <?php else: ?>
              <div class="product__cart-data">
                <button class="add-to-cart button">Dodaj u korpu</button>
              </div>
            <?php endif; ?>


          </div>

          <div class="product__image-wrapper">
            <?php if (get_the_post_thumbnail_url($post->ID)) :  ?>
              <img src="<?php echo get_the_post_thumbnail_url($post->ID) ?>" alt="<?php the_title(); ?>" title="<?php the_title(); ?>" class="product__image">
            <?php endif; ?>
          </div>
        </div>
      <?php endwhile; ?>
    </div>
  </div>
</section>