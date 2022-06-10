<?php
include 'head.php';
$titleEvent = $_POST['titleEvent'];
$commentEvent = $_POST['commentEvent'];
echo ('<?xml version="1.0" encoding="utf-8"?>');
if ($titleEvent != '' && $commentEvent != '') {
    $mysqli->query("INSERT INTO event (titleEvent, commentEvent) VALUES ('$titleEvent', '$commentEvent')");
}
