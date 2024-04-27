<?php
# Database Configuration
define( 'DB_NAME', 'wp_snowycreek8' );
define( 'DB_USER', 'snowycreek8' );
define( 'DB_PASSWORD', 'zjjZ9oTYJEmSEUu96Lwl' );
define( 'DB_HOST', '127.0.0.1:3306' );
define( 'DB_HOST_SLAVE', '127.0.0.1:3306' );
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', 'utf8_unicode_ci');
$table_prefix = 'wp_';

# Security Salts, Keys, Etc
define('AUTH_KEY',         'uQs8:HzNRabi@@jjyAQW7pC]BRaQfIU.8>P)KCq6S%KBM?h3hfh:`Igh&7a0L#SM');
define('SECURE_AUTH_KEY',  'YbkdG6f?GDC*-TW+ooG+B![RMyNx!~b6GO|>ps7X+zs6|J->!9`:Sva7uEf[R7_,');
define('LOGGED_IN_KEY',    'x_<ZBd7pG)CRNj=~2-SA0H.y!|7(^bj@&k[VCL|n5UoKJ*5:{=>w/: R+Lqt+a^A');
define('NONCE_KEY',        'm)AFJQQi<HnV*QAbRL)Pl{+9I*[!$XX8WU~>TW|wP9m:|,`nHynv|)Q7C0_ Npcl');
define('AUTH_SALT',        'jwU[+(pM2/Z5u<6{G>2vg<2^m;m.{XQVOl{|&xQG^[y+Y&fI$FZLxK@|VD[tgD8Y');
define('SECURE_AUTH_SALT', '8;5YZ5W6rkoi3]=aT)20d87,6a{0!p^p#K(8jh|Eufy#lGu1`UN|jYLz2:p|[G(a');
define('LOGGED_IN_SALT',   '[?H9h:O;O];_tz6(Hl,yw=Pie+i!}l!d ]Glj7ga4 bXhOK>j3:;Jo)q_~0n> Z]');
define('NONCE_SALT',       'L?OIOu+SQMAXvG&+Ei@LNNW4tf{X$u0*%k)?%tV1q]e%c^v{maQB*!|+z<N(e9t:');

	define('WP_HOME', 'https://www.townhouseatwhistler.com');
define('WP_SITEURL', 'https://townhouseatwhistler.com/wordpress');


# Localized Language Stuff

define( 'WP_CACHE', TRUE );

define( 'WP_AUTO_UPDATE_CORE', false );

define( 'PWP_NAME', 'snowycreek8' );

define( 'FS_METHOD', 'direct' );

define( 'FS_CHMOD_DIR', 0775 );

define( 'FS_CHMOD_FILE', 0664 );

define( 'PWP_ROOT_DIR', '/nas/wp' );

define( 'WPE_APIKEY', '8f69e39a9b4fe62c213f2b30d8c822d974f2bb73' );

define( 'WPE_CLUSTER_ID', '120224' );

define( 'WPE_CLUSTER_TYPE', 'pod' );

define( 'WPE_ISP', true );

define( 'WPE_BPOD', false );

define( 'WPE_RO_FILESYSTEM', false );

define( 'WPE_LARGEFS_BUCKET', 'largefs.wpengine' );

define( 'WPE_SFTP_PORT', 2222 );

define( 'WPE_LBMASTER_IP', '' );

define( 'WPE_CDN_DISABLE_ALLOWED', true );

define( 'DISALLOW_FILE_MODS', FALSE );

define( 'DISALLOW_FILE_EDIT', FALSE );

define( 'DISABLE_WP_CRON', false );

define( 'WPE_FORCE_SSL_LOGIN', true );

define( 'FORCE_SSL_LOGIN', true );

/*SSLSTART*/ if ( isset($_SERVER['HTTP_X_WPE_SSL']) && $_SERVER['HTTP_X_WPE_SSL'] ) $_SERVER['HTTPS'] = 'on'; /*SSLEND*/

define( 'WPE_EXTERNAL_URL', false );

define( 'WP_POST_REVISIONS', FALSE );

define( 'WPE_WHITELABEL', 'wpengine' );

define( 'WP_TURN_OFF_ADMIN_BAR', false );

define( 'WPE_BETA_TESTER', false );

umask(0002);

$wpe_cdn_uris=array ( );

$wpe_no_cdn_uris=array ( );

$wpe_content_regexs=array ( );

$wpe_all_domains=array ( 0 => 'townhouseatwhistler.com', 1 => 'snowycreek8.wpengine.com', 2 => 'www.townhouseatwhistler.com', 3 => 'snowycreek8.wpenginepowered.com', );

$wpe_varnish_servers=array ( 0 => 'pod-120224', );

$wpe_special_ips=array ( 0 => '104.197.69.251', );

$wpe_ec_servers=array ( );

$wpe_largefs=array ( );

$wpe_netdna_domains=array ( );

$wpe_netdna_domains_secure=array ( );

$wpe_netdna_push_domains=array ( );

$wpe_domain_mappings=array ( );

$memcached_servers=array ( );

define( 'WPE_SFTP_ENDPOINT', '' );
define('WPLANG','');

# WP Engine ID


# WP Engine Settings

define('WP_MEMORY_LIMIT', '512M');
define( 'WP_MAX_MEMORY_LIMIT', '512M' );




# That's It. Pencils down
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');
require_once(ABSPATH . 'wp-settings.php');
























