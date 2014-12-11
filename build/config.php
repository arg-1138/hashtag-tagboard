<?php
date_default_timezone_set('Europe');

//nicemondays twitter dev account
$twitter = array(
    'consumer_key' =>           'ZsJ9pD22injM67NPQh2WlWv9V',
    'consumer_secret' =>        'UJGk11fBYEi9JQMc8zbNaK8tvut2Polg3dXW1LleHZKRnq4oH1',
    'access_token' =>           '2784216410-mNY2UTfOLOIzMEC6TRnQYoTrtSYxVRONYZBiiK0',
    'access_token_secret' =>    'mrEC03cbAGlnN6GYOSZ0D3Ui0k8U7qNyKos1FsEp2Dpop'
);

//nicemondays instagram dev account
$instagram = array(
    'client_id' =>       '8b46a7e7cf6d4261aea7a6e196024f3e',
    'client_secret' =>  '048ad2ed63e647a7808c5a920e226417',
    'website_url' =>    'http://nicemondays.com/proyectos/hashtag-pull/',
    'redirect_uri' =>   'http://nicemondays.com/proyectos/hashtag-pull/instagram/',
    'access_token' =>   '1581426559.8b46a7e.24428c65b49a4bd0a3d27cbe574c76be'
);

$db = array(
    'host' =>           '127.0.0.1',
    'user' =>           'nmdev',
    'password' =>       'golondrina00',
    'name' =>           'clapes',
    'media_table' =>    'media'
);

$hashtag = 'puigconnect';

define(HASHTAG_ALLOWED_ADMIN, TRUE);
define(AUTO_UPDATE, TRUE);
define(ITEMS_PER_PAGE, 20);
define(LAZY_LOAD, TRUE);

?>
