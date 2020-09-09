<?php
/**
Custom Rest End Points
**/

function get_post_by_slug($data) {
    $slug = $data['slug'];
    $posts = get_posts(array(
        'name' => $slug,
        'numberposts' => 1,
        'post_type' => 'post',
        'post_status' => 'publish'
    ));
    if ( empty($posts) ) {
        return null;
    }

    $author_name = get_the_author_meta('display_name', $posts[0]->post_author);
    $author_description = get_the_author_meta('description', $posts[0]->post_author);
    $author = array(
        'name' => $author_name,
        'desc' => $author_description
    );

    $attached_media = get_the_post_thumbnail($posts[0], 'large');

    $categories = wp_get_post_categories($posts[0]->ID, array('fields' => 'all'));
    $tags = wp_get_post_tags($posts[0]->ID, array('fields' => 'all'));

    $posts[0]->author = $author;
    $posts[0]->attached_media = $attached_media;
    $posts[0]->categories = $categories;
    $posts[0]->tags = $tags;

    return $posts[0];
}
add_action('rest_api_init', function() {
    register_rest_route('posts/v1', '/post/(?P<slug>[\S-]+)', array(
        'methods' => 'GET',
        'callback' => 'get_post_by_slug',
        'permission_callback' => '__return_true'
    ));
});

function get_category_id_by_slug($data) {
    $slug = $data['slug'];
    $cat = get_category_by_slug($slug);
    return $cat;
}
add_action('rest_api_init', function() {
    register_rest_route('categories/v1', '/category/(?P<slug>[\S-]+)', array(
        'methods' => 'GET',
        'callback' => 'get_category_id_by_slug',
        'permission_callback' => '__return_true'
    ));
});

function get_tag_id_by_slug($data) {
    $slug = $data['slug'];
    $tag = get_term_by('slug', $slug, 'post_tag');
    return array('id' => $tag ? $tag->term_id : null);
}
add_action('rest_api_init', function() {
    register_rest_route('tags/v1/', '/tag/(?P<slug>[\S-]+)', array(
        'methods' => 'GET',
        'callback' => 'get_tag_id_by_slug',
        'permission_callback' => '__return_true'
    ));
});

function post_contact(WP_REST_Request $req) {
    $params = $req->get_body_params();
    $res;
    if(isset($params['name']) && isset($params['message']) && isset($params['email'])){
        $subject = 'Message Received from '.$params['name'].' - '.$params['email'];
        wp_mail('eric@ericjshin.com',
                $subject,
                $params['message']);
        $res = new WP_REST_Response(
            'Message received'
        );
        $res->set_status(200);
    } else {
        $res = new WP_REST_Response(
            array('data' => 'invalid form')
        );
        $res->set_status(400);

    }
    return $res;
}
add_action('rest_api_init', function() {
    register_rest_route('contact/v1', '/new', array(
        'methods' => 'POST',
        'callback' => 'post_contact',
        'permission_callback' => '__return_true'
    ));
});
?>