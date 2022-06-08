<?php
    session_start();
    date_default_timezone_set('Europe/Moscow');
    $time=date(DATE_RFC822);
    $mysqli = new mysqli("localhost", "root", "", "rgr");

    $mysqli->query("SET NAMES utf8");
    $mysqli->query("SET CHARACTER SET utf8");
    $mysqli->query("SET character_set_client = utf8");
    $mysqli->query("SET character_set_connection = utf8");
    $mysqli->query("SET character_set_results = utf8");
    
    $log=$_SESSION['login'];
    $mysqli->query("INSERT INTO audit (login,datetime,ivent) VALUES ('$log', '$time', 'Выход из аккаунта')");
    $_SESSION['type'] = '0';
    header("Location: enter.html");
?>