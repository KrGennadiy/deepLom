<?php
include 'head.php';
$titleTimeInterval = $_POST['titleTimeInterval'];
$beginTimeInterval = $_POST['inputBeginTimeInterval'];
$endTimeInterval = $_POST['inputEndTimeInterval'];
echo ('<?xml version="1.0" encoding="utf-8"?>');
if ($titleTimeInterval != '') {
    $mysqli->query("INSERT INTO timeinterval (titleTimeInterval) VALUES ('$titleTimeInterval')"); //добавить даты 
}
