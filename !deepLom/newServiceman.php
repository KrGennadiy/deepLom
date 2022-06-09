<?php
include 'head.php';
$document = $_POST['document'];
$firstName = $_POST['firstName'];
$secondName = $_POST['secondName'];
$middleName = $_POST['middleName'];
$rankServiceman = $_POST['rankServiceman'];
$positionServiceman = $_POST['positionServiceman'];
$divisionServiceman = $_POST['divisionServiceman'];
echo ('<?xml version="1.0" encoding="utf-8"?>');
if ($document != '' && $firstName != '' && $secondName != '' && $middleName != '') {
    $mysqli->query("INSERT INTO serviceman (document, firstnameServiceman, secondnameServiceman, middlenameServiceman, idPositionServiceman, idRankServiceman, idDivisionServiceman) VALUES ('$document', '$firstName', '$secondName','$middleName', '$positionServiceman', '$rankServiceman', '$divisionServiceman')");
}
