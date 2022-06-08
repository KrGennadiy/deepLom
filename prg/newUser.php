<?php
include 'head.php';

$login = $_POST['login'];
$password = sha1($_POST['password']);
$typeuser = $_POST['typeuser'];
if($login != '' && $password != ''){
    $mysqli->query("INSERT INTO users (login, password, typeuser) VALUES ('$login', '$password', '$typeuser')");
}