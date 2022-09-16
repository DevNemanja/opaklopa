
<footer class="footer">
    <div class="container">
        <div class="footer__container">
            <div class="title title--with-icon">
                <h2>Radno vreme</h2>
                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/clock.svg" alt="" class="title__icon">
            </div>
            <p>Ponedeljak – Petak:   09:00h – 16:45h</p>
            <?php require('template-parts/contact.php'); ?>
            <div class="title title--with-icon">
                <h2>Detalji</h2>
                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/info.svg" alt="" class="title__icon">
            </div>
            <div>
                <p>Besplatna dostava na teritoriji Novog Beograda</p>
                <p>Na porudžbine preko 2000 din popust 10%</p>
                <p>Na porudžbinu preko 1500din poklon 0,5 orange juice</p>
                <p>Velike pogodnosti za Vaše proslave (pozovite nas da se dogovorimo)</p>
                <p>Minimum za porudžbinu 500rsd izuzev P.C”Usce”, Bezanijska kosa, Bezanija, Blokovi 44, 45, 70a, 70, 61, 62, 63, 64 gde je minimum za dostavu 1200din.</p>
            </div>
        </div>
        <ul class="footer__social-icons">
            <li>
                <a href="#" target="_blank">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/insta.svg" alt="">
                </a>
            </li>
            <li>
                <a href="#" target="_blank">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/fb.svg" alt="">
                </a>
            </li>
        </ul>
    </div>
</footer>
    <a class="floating-call" href="tel:066/513-85-76">
        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/call.svg" alt="">
    </a>
<?php wp_footer(); ?>
</body>
</html>
