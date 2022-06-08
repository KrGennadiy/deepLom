<?php
session_start();
$mysqli = new mysqli("localhost", "root", "", "rgr");
$id = $_POST['idRow'];
$mysqli->query("DELETE FROM book WHERE IdBook='$id'");
?>