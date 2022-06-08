<?php
include 'head.php';
$document = $_POST['idRow'];
$mysqli->query("DELETE FROM serviceman WHERE document='$document'");
$mysqli->query("DELETE FROM chief WHERE document='$document'");
?>