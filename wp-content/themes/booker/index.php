<!doctype html>
<html <?php language_attributes(); ?> class="<?php echo 'scheme_' . esc_attr($set_header_options['body_scheme']); ?>">
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>" />
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title></title>
        <meta name="description" content="">
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
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