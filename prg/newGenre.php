<?php
session_start();
$mysqli = new mysqli("localhost", "root", "", "rgr");
$mysqli->query("SET NAMES utf8");
$mysqli->query("SET CHARACTER SET utf8");
$mysqli->query("SET character_set_client = utf8");
$mysqli->query("SET character_set_connection = utf8");
$mysqli->query("SET character_set_results = utf8");
$nameGenre = $_POST['NameGenre'];
if($nameGenre != ''){
    $mysqli->query("INSERT INTO genre (NameGenre) VALUES ('$nameGenre')");
}
else{
    echo 'Ошибка, ввод пустых значений';
}