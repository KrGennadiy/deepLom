<?php
include 'head.php';
$titleGroupEvent = $_POST['titleGroupEvent'];
echo ('<?xml version="1.0" encoding="utf-8"?>');
if ($titleGroupEvent != '') {
    $mysqli->query("INSERT INTO groupEvent (titleGroupEvent) VALUES ('$titleGroupEvent')");
}
