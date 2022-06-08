<?php
session_start();
$mysqli = new mysqli("localhost", "root", "", "rgr");
$mysqli->query("SET NAMES utf8");
$mysqli->query("SET CHARACTER SET utf8");
$mysqli->query("SET character_set_client = utf8");
$mysqli->query("SET character_set_connection = utf8");
$mysqli->query("SET character_set_results = utf8");
$title = $_POST['titlePublisher'];
$address = $_POST['address'];
if($title != '' && $address != ''){
    $mysqli->query("INSERT INTO publisher (TitlePublisher, Address) VALUES ('$title', '$address')");
}
else{
    echo 'Ошибка, ввод пустых значений';
}