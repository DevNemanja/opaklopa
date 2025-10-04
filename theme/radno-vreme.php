<?php
/*
Plugin Name: Radno Vreme
Description: Ovde se definiše kad prodavnica radi.
Version: 1.1
Author: Nemanja Blagojevic
*/

if (!defined('ABSPATH')) exit;

// Dodaj stranicu u admin meni
add_action('admin_menu', function () {
    add_menu_page(
        'Radno Vreme',
        'Radno Vreme',
        'manage_options',
        'radno-vreme',
        'working_hours_page',
        'dashicons-clock',
        60
    );
});

// Registruj postavke
add_action('admin_init', function () {
    register_setting('working_hours_group', 'working_hours_settings');

    // Sekcija za default radno vreme
    add_settings_section(
        'default_hours_section',
        'Default Radno Vreme',
        null,
        'radno-vreme'
    );

    add_settings_field(
        'default_hours',
        'Default vreme (od-do)',
        'default_hours_callback',
        'radno-vreme',
        'default_hours_section'
    );

    // Sekcija za radno vreme po danima
    add_settings_section(
        'working_hours_section',
        'Radno vreme po danima',
        null,
        'radno-vreme'
    );

    $days = ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota', 'Nedelja'];
    foreach ($days as $day) {
        $day_key = strtolower($day);
        add_settings_field(
            $day_key,
            $day,
            'working_hours_field_callback',
            'radno-vreme',
            'working_hours_section',
            ['day' => $day]
        );
    }
});

// Default radno vreme callback
function default_hours_callback()
{
    $options = get_option('working_hours_settings');
    $default_open = isset($options['default_open']) ? $options['default_open'] : '';
    $default_close = isset($options['default_close']) ? $options['default_close'] : '';
?>
    <label>Od: <input type="time" name="working_hours_settings[default_open]" value="<?php echo esc_attr($default_open); ?>"></label>
    <label style="margin-left:10px;">Do: <input type="time" name="working_hours_settings[default_close]" value="<?php echo esc_attr($default_close); ?>"></label>
<?php
}

// Radni dani callback
function working_hours_field_callback($args)
{
    $options = get_option('working_hours_settings');
    $day_key = strtolower($args['day']);

    $enabled = isset($options[$day_key]['enabled']) ? $options[$day_key]['enabled'] : '';
    $open = isset($options[$day_key]['open']) ? $options[$day_key]['open'] : '';
    $close = isset($options[$day_key]['close']) ? $options[$day_key]['close'] : '';

?>
    <label>
        <input type="checkbox" name="working_hours_settings[<?php echo esc_attr($day_key); ?>][enabled]" value="1" <?php checked($enabled, '1'); ?>>
        Otvoreno
    </label>
    <br>
    <label>Od: <input type="time" name="working_hours_settings[<?php echo esc_attr($day_key); ?>][open]" value="<?php echo esc_attr($open); ?>"></label>
    <label style="margin-left: 10px;">Do: <input type="time" name="working_hours_settings[<?php echo esc_attr($day_key); ?>][close]" value="<?php echo esc_attr($close); ?>"></label>
<?php
}



// Enqueue jQuery UI za datepicker
add_action('admin_enqueue_scripts', function ($hook) {
    if ($hook != 'toplevel_page_radno-vreme') return;

    wp_enqueue_script('jquery-ui-datepicker');
    wp_enqueue_style('jquery-ui-css', 'https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css');
});

// Prikaz stranice
function working_hours_page()
{
?>
    <div class="wrap">
        <h1>Radno Vreme</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('working_hours_group');
            do_settings_sections('radno-vreme');
            submit_button();
            ?>
        </form>
    </div>
<?php
}

// Funkcija koja proverava da li je radnja otvorena
function is_shop_open()
{
    $options = get_option('working_hours_settings');



    if (!$options) {
        return false; // Nema podešavanja, radnja zatvorena
    }

    $day_map = [
        'monday' => 'ponedeljak',
        'tuesday' => 'utorak',
        'wednesday' => 'sreda',
        'thursday' => 'Četvrtak',
        'friday' => 'petak',
        'saturday' => 'subota',
        'sunday' => 'nedelja',
    ];

    $current_day = strtolower(date_i18n('l')); // uzima WP timezone i lokalizaciju
    $today = $day_map[$current_day] ?? '';
    $current_time = current_time('H:i'); // vreme u WP timezone

    if (!isset($options[$today]['enabled'])) {
        // Ako nije cekiran danasnji dan, radnja je zatvorena.
        return false;
    }

    // 2️⃣ Proveri da li je za danas definisano radno vreme
    $open = $options[$today]['open'] ?? null;
    $close = $options[$today]['close'] ?? null;

    // 3️⃣ Ako nema vremena za danas, koristi default radno vreme
    if (!$open || !$close) {
        $open = $options['default_open'] ?? null;
        $close = $options['default_close'] ?? null;
    }

    // 4️⃣ Ako i dalje nema ni default vremena, neka radnja bude otvorena
    if (!$open || !$close) {
        return true;
    }

    $current = strtotime($current_time);
    $open = strtotime($open);
    $close = strtotime($close);

    if ($current >= $open && $current <= $close) {
        return true;
    }

    return false; // Radnja je zatvorena
}
