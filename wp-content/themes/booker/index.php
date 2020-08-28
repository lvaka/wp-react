<!doctype html>
<html <?php language_attributes(); ?> class="<?php echo 'scheme_' . esc_attr($set_header_options['body_scheme']); ?>">
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
        <meta name="stylesheet_uri" content="<?php echo get_stylesheet_directory_uri() ?>">
        <meta name="site_uri" content="<?php echo wp_make_link_relative(get_site_url()) ?>">
        <meta name="site_abs_uri" content="<?php echo get_site_url() ?>">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossorigin="anonymous" />
        <?php
            wp_head();
            show_admin_bar(current_user_can('administrator'));
        ?>
    </head>
    <body>
        <div id="root"></div>
    </body>
    <?php wp_footer();?>
</html>