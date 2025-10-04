<?php if (! is_shop_open()) : ?>
    <div class="shop-closed-modal" id="shopClosedModal" role="dialog" aria-modal="true">
        <div class="shop-closed-modal__overlay"></div>

        <div class="shop-closed-modal__content">
            <button class="shop-closed-modal__close" aria-label="Zatvori modal" onclick="document.getElementById('shopClosedModal').style.display='none'">&times;</button>

            <h2 class="shop-closed-modal__heading">Radnja je zatvorena</h2>
            <p class="shop-closed-modal__subheading">Posetite nas u radnom vremenu</p>

            <div class="shop-closed-modal__message">
                <div class="shop-closed-modal__message-icon">
                    <svg viewBox="0 0 24 24">
                        <rect x="3" y="7" width="18" height="13" rx="2"></rect>
                        <path d="M8 7V5a4 4 0 0 1 8 0v2"></path>
                        <circle cx="12" cy="13.5" r="1"></circle>
                    </svg>
                </div>
                <span>Trenutno zatvoreno — hvala na razumevanju.</span>
            </div>

            <?php

            $options = get_option('working_hours_settings');

            $open = $options['default_open'] ?? null;
            $close = $options['default_close'] ?? null;

            ?>

            <div class="shop-closed-modal__hours">
                <strong>Radno vreme:</strong> <?= $open; ?> — <?= $close; ?>
            </div>
        </div>
    </div>
<?php endif; ?>