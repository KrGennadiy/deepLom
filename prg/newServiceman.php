<?php
include 'head.php';
$document = $_POST['document'];
$fullName = $_POST['fullName'];
$rankServiceman = $_POST['rankServiceman'];
$positionServiceman = $_POST['positionServiceman'];
echo ('<?xml version="1.0" encoding="utf-8"?>');
if($document != '' && $fullName != ''){
    $mysqli->query("INSERT INTO serviceman (document, name, position, rank) VALUES ('$document', '$fullName', '$positionServiceman', '$rankServiceman')");
    $mysqli->query("INSERT INTO chief (document, name, position, rank) VALUES ('$document', '$fullName', '$positionServiceman', '$rankServiceman')");
}