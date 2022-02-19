<section class="projects" data-module="PROJECTS">
    <div class="container">
        <div class="projects__filters-area-wrapper">
            <button class="projects__filters-toggler">Filters</button>
            <div class="projects__filters-wrapper">
                <ul class="projects__filters"> 
                    <li class="projects__single-filter active">
                        <button class="projects__button">ALL</button>
                    </li>   
                    <?php
                $tags = get_tags('post_tag');
                
                if ( $tags ) :
                    foreach ( $tags as $tag ) : ?>
                        <li class="projects__single-filter">
                            <button class="projects__button"><?php echo esc_html( $tag->name ); ?></button>
                        </li>
                        <?php endforeach; ?>
                        <?php endif; ?>
                </ul>
            </div>
        </div>
        <ul class="projects__grid">
        <?php
            $loop = new WP_Query(
                array(
                    'post_type' => 'project', // This is the name of your post type - change this as required,
                    'posts_per_page' => 50 // This is the amount of posts per page you want to show
                )
            );
            while ( $loop->have_posts() ) : $loop->the_post(); ?>
            
            <li class="projects__grid-item <?php echo get_the_tags()[0]->name ?>">
                <a class="projects__link" title="<?php the_title(); ?>" href="<?php the_permalink(); ?>">
                    <picture>
                        <source media="(min-width:600px)" srcset="<?php echo get_the_post_thumbnail_url(null, 'medium'); ?>">
                        <img src="<?php echo get_the_post_thumbnail_url(null, 'large'); ?>" alt="<?php the_title(); ?>">
                    </picture>
                </a>
                <a href="<?php the_permalink(); ?>" class="projects__title"><?php the_title(); ?></a>
            </li>
            
            <?php endwhile;
            wp_reset_postdata();
        ?>
        </ul>
    </div>
</section>