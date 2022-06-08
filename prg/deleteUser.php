<?php
include 'head.php';
$login = $_POST['idRow'];
$mysqli->query("DELETE FROM users WHERE login='$login'");
?>