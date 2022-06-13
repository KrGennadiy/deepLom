<?php
include 'head.php';
$titleDivision = $_POST['titleDivision'];
echo ('<?xml version="1.0" encoding="utf-8"?>');
if ($titleTimeInterval != '') {
    $mysqli->query("INSERT INTO division (titleDivision) VALUES ('$titleDivision')"); //добавить даты 
}