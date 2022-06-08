<?php
session_start();
$mysqli = new mysqli("localhost", "root", "", "rgr");
$mysqli->query("SET NAMES utf8");
$mysqli->query("SET CHARACTER SET utf8");
$mysqli->query("SET character_set_client = utf8");
$mysqli->query("SET character_set_connection = utf8");
$mysqli->query("SET character_set_results = utf8");
$FirstName = $_POST['FirstName'];
$LastName = $_POST['LastName'];
if($FirstName != '' && $LastName != ''){
    $mysqli->query("INSERT INTO author (FirstName, LastName) VALUES ('$FirstName', '$LastName')");
}
else{
    echo 'Ошибка, ввод пустых значений';
}