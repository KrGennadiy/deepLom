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
if($title != ''){
    $mysqli->query("INSERT INTO book (TitleBook, Author_Id, Publisher_Id, Genre_Id, Type_Id) VALUES ('$title', '$author', '$publisher', '$genre', '$type')");
}
else{
    echo 'Ошибка, ввод пустых значений';
}