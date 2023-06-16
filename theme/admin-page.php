<?php
/**
 * Template Name: Admin page
 */
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?> Opa Klopa</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body class="admin-page">

<?php wp_head(); ?>

<main>
    <section>
        <div class="container container--narrow">
            <h1>Admin</h1>
            <div id="orders" data-module="ORDERS"></div>
        </div>
    </section>
</main>

<?php wp_footer(); ?>
</body>
</html>