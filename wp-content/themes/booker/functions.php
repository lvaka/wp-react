<?php

require 'custom_rest_routes.php';

function load_booker_scripts() {
    wp_enqueue_script('booker_react', get_stylesheet_directory_uri() . '/build/js/app.js', '', '1', true );
    wp_enqueue_style('booker_style', get_stylesheet_directory_uri() . '/build/css/main.css' );
}
add_action('wp_enqueue_scripts', 'load_booker_scripts', 10);
add_theme_support( 'post-thumbnails' );

function default_permalink_structure() {
    global $wp_rewrite;
    $wp_rewrite->set_permalink_structure('/post/%postname%/');
}
add_action('init', 'default_permalink_structure');
?>