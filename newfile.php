<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

// config
$datafile = 'quiz.data';
$maxtries = 100;

// create blocking file
$blockfile = $datafile.'.blocked';
$tries = 0;
while (file_exists($blockfile)) {
    $tries++;
    usleep(10000);
    if ($tries == $maxtries) {
	break;
    }
}
touch($blockfile);
$jsondata = json_decode(file_get_contents($datafile),true);
if ($jsondata === NULL) {
    $jsondata = array();
}

if (!in_array($_POST['email'],$jsondata['mails'])) {
    $jsondata['mails'][] = $_POST['email'];
    $jsondata['data'][] = $_POST;
    $jsondata['highscore'] = array(
	'name' => $_POST['name'],
	'score' => $_POST['score']
    );
}

// sort by score
usort($jsondata['highscore'], function($a, $b) {
    return $b['score'] - $a['score'];
});

// write json to data file
file_put_contents($datafile,json_encode($jsondata));

// return highscore
$return = array (
    "success" => true,
    "highscore" => array_slice($jsondata['highscore'],0,10)
);
echo json_encode($return);
