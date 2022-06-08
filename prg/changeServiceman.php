<?php
include 'head.php';
$document = $_POST['document'];
$name = $_POST['fullname'];
$position = $_POST['positionServiceman'];
$rank = $_POST['rankServiceman'];
if($name != ''){
    $mysqli->query("UPDATE serviceman SET name='$name', position='$position', rank='$rank' where document='$document'");
    $mysqli->query("UPDATE chief SET name='$name', position='$position', rank='$rank' where document='$document'");
}