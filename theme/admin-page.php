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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.1/js/bootstrap.min.js" integrity="sha512-EKWWs1ZcA2ZY9lbLISPz8aGR2+L7JVYqBAYTq5AXgBkSjRSuQEGqWx8R1zAX16KdXPaCjOCaKE8MCpU0wcHlHA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</head>
<body class="admin-page">

<?php wp_head(); ?>

<main>
    <section>
        <div class="container container--narrow pb-5">
            <h1>Admin</h1>
            <div data-module="ORDERS">

            <h2>Nove porudzbine</h2>
            <div id="new-orders" class="row row-cols-3" ></div>
            <hr>


            <div class="accordion" id="porudzbine">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Prihvacene porudzbine
                    </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#porudzbine">
                        <div class="accordion-body">
                            <div id="accepted-orders" class="row row-cols-3" ></div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Zavrsene porudzbine
                    </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#porudzbine">
                        <div class="accordion-body">
                            <div id="completed-orders" class="row row-cols-3" ></div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Odbijene porudzbine
                    </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#porudzbine">
                        <div class="accordion-body">
                            <div id="rejected-orders" class="row row-cols-3" ></div>
                        </div>
                    </div>
                </div>
            </div>

















            </div>
        </div>
    </section>
</main>

<?php wp_footer(); ?>
</body>
</html>