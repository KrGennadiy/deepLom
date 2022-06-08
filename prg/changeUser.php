<?php
include 'head.php';
$login = $_POST['login'];
$typeuser = $_POST['typeuser'];
$mysqli->query("UPDATE users SET typeuser='$typeuser' where login='$login'");
