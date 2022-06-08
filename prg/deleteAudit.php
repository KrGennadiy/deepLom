<?php
session_start();
$mysqli = new mysqli("localhost", "root", "", "rgr");
$id = $_POST['auditId'];
$mysqli->query("DELETE FROM audit WHERE id='$id'");
header("Location: Audit.php");
?>