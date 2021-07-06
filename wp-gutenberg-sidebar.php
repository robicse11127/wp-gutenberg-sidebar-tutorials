<?php
/**
 * @link            http://pluginsurl.com
 * @since           1.0.0
 * @package         WP_Gutenberg_Sidebar_Plugin
 *
 * Plugin Name:     WP Gutenberg Sidebar Plugin
 * Plugin URI:      http://pluginsurl.com
 * Description:     A learning plugin to learn Gutenberg Sidebar Plugin.
 * Version:         1.0.0
 * Author:          Md. Rabiul Islam Robi
 * Author URI:      http://robicse11127.github.io/
 * License:         GPLv3 or later
 * License URI:     http://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:     wp-gutenberg-sidebar
 */
if( !defined( 'ABSPATH' ) ) exit(); // No Direct Access

// Enqueue gutenberg sidebar scripts.
function prefix_enqueue_assets() {
    wp_enqueue_script(
        'prefix-gutenberg-sidebar',
        plugins_url( 'build/index.js', __FILE__ ),
        [ 'wp-plugins', 'wp-edit-post', 'wp-i18n', 'wp-element', 'wp-components', 'wp-data' ]
    );
}
add_action( 'enqueue_block_editor_assets', 'prefix_enqueue_assets' );

// Register Metaboxes.
function prefix_register_meta_fields() {
    register_meta(
        'post',
        '_prefix_text_field',
        [
            'show_in_rest'      => true,
            'type'              => 'string',
            'single'            => true,
            'sanitize_callback' => 'sanitize_text_string',
            'auth_callback'     => function() {
                return current_user_can( 'edit_posts' );
            }
        ]
    );
}
add_action( 'init', 'prefix_register_meta_fields' );