<?php
date_default_timezone_set('Europe');

$twitter = array(
    'consumer_key' =>           '',
    'consumer_secret' =>        '',
    'access_token' =>           '',
    'access_token_secret' =>    ''
);

$instagram = array(
    'client_id' =>      '',
    'client_secret' =>  '',
    'website_url' =>    '',
    'redirect_uri' =>   '',
    'access_token' =>   ''
);

$db = array(
    'host' =>           '127.0.0.1',
    'user' =>           'root',
    'password' =>       'root',
    'name' =>           'Hashtag-pull',
    'media_table' =>    'media'
);

$hashtag = 'fragrance';

define(HASHTAG_ALLOWED_ADMIN, TRUE);
define(AUTO_UPDATE, TRUE);
define(ITEMS_PER_PAGE, 20);
define(LAZY_LOAD, TRUE);

?>
