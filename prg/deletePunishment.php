<?php
include 'head.php';
$id = $_POST['idRow'];
$mysqli->query("DELETE FROM punishment WHERE idPunishment='$id'");
?>