<?php $args = array(
    'taxonomy'   => "product_cat",
    'number'     => $number,
    'orderby'    => 'none',
    'order'      => $order,
    'hide_empty' => $hide_empty,
    'include'    => $ids
);
$product_categories = get_terms($args); ?>

    <?php foreach ($product_categories as $key => $category): ?>
        <?php if ($category->name !== 'Uncategorized') {
            //  echo $category->name;
        } ?>
    <?php endforeach; ?> 

<nav class="navigator" data-module="NAVIGATOR">
    <ul class="navigator__list">
        <li class="navigator__list-item navigator__list-item--active">Pizza</li>
        <li class="navigator__list-item">Sendviči</li>
        <li class="navigator__list-item">Slane palacinke</li>
        <li class="navigator__list-item">Slatke palačinke</li>
        <li class="navigator__list-item">Smoothie</li>
        <li class="navigator__list-item">Piletina</li>
        <li class="navigator__list-item">Pohovano</li>
        <li class="navigator__list-item">Salate</li>
        <li class="navigator__list-item">Tortilje</li>
        <li class="navigator__list-item">Hrono obroci</li>
        <li class="navigator__list-item">Omleti</li>
        <li class="navigator__list-item">Komplet lepinje</li>
        <li class="navigator__list-item">Poslastice</li>
    </ul>
</nav>
