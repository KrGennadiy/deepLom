<?php
session_start();
$mysqli = new mysqli("localhost", "root", "", "rgr");

$mysqli->query("SET NAMES utf8");
$mysqli->query("SET CHARACTER SET utf8");
$mysqli->query("SET character_set_client = utf8");
$mysqli->query("SET character_set_connection = utf8");
$mysqli->query("SET character_set_results = utf8");

$title = $_POST['titleBook'];
$author = $_POST['authorBook'];
$publisher = $_POST['publisherBook'];
$genre = $_POST['genreBook'];
$type = $_POST['typeBook'];
$id = $_POST['IdRow'];
if($title != ''){
    $mysqli->query("UPDATE book SET TitleBook='$title', Author_Id='$author', Publisher_Id='$publisher', Genre_Id='$genre', Type_Id='$type' where IdBook='$id'");
}
else{
    echo 'Ошибка, ввод пустых значений';
}