<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Twitter API</title>
  <link rel="stylesheet" href="twitter.css" screen="media">
</head>
<body>
  <div class="header">
    <h1>Twitter Tweets</h1>
    <h4>Displays tweets with more than 10 favorites</h4>
    <hr>
  </div>
<?php

require "twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

$consumerkey = "3Uz4rRS5XCYYDToitxU2kIyUf";
$consumersecret = "qFVEa4ccKELEIIx6I2uagPeoLVc2M9ft7JCQM5v38SNrjsG7K7";
$access_token = "964666710879080448-CosBcMQMaNxii7fGvG3IvgKG0A7gozv";
$access_token_secret = "YjkgECCQ1DMuFURQNtNmilAkWMkz3B8xEXcJsPyWZjjFd";

$connection = new TwitterOAuth($consumerkey, $consumersecret, $access_token, $access_token_secret);
$content = $connection->get("account/verify_credentials");

$statuses = $connection->get("statuses/home_timeline", ["count" => 25, "exclude_replies" => true]);

foreach($statuses as $tweet){
  if($tweet -> favorite_count >= 10) {
    $status = $connection->get("statuses/oembed", ["id" => $tweet -> id]);
    echo $status -> html;
  }
}

?>
</body>
</html>