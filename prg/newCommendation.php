<?php
include 'head.php';
$serviceman = $_POST['serviceman'];
$chief = $_POST['chief'];
$date = $_POST['date'];
if($date == ''){
    $date = date("Y-m-d");
}
$reason = $_POST['reason'];
$name = $_POST['nameCommendation'];
$rankServiceman1 = $mysqli->query("SELECT serviceman.rank FROM serviceman where serviceman.document='$serviceman'");
$rankServiceman2 = $rankServiceman1->fetch_assoc();
$rankServiceman = $rankServiceman2['rank'];

$positionServiceman1 = $mysqli->query("SELECT serviceman.position FROM serviceman where serviceman.document='$serviceman'");
$positionServiceman2 = $positionServiceman1->fetch_assoc();
$positionServiceman = $positionServiceman2['position'];

$rankChief1 = $mysqli->query("SELECT chief.rank FROM chief where chief.document='$chief'");
$rankChief2 = $rankChief1->fetch_assoc();
$rankChief = $rankChief2['rank'];

$positionChief1 = $mysqli->query("SELECT chief.position FROM chief where chief.document='$chief'");
$positionChief2 = $positionChief1->fetch_assoc();
$positionChief = $positionChief2['position'];

if($reason != ''){
    $mysqli->query(
        "INSERT INTO commendation (documentChief, documentServiceman, rankChief, rankServiceman, positionChief, positionServiceman, reason, date, nameCommendation) 
         VALUES ('$chief', '$serviceman', '$rankChief', '$rankServiceman', '$positionChief', '$positionServiceman', '$reason', '$date', '$name')");
}