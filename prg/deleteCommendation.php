<?php
include 'head.php';
$id = $_POST['idRow'];
$mysqli->query("DELETE FROM commendation WHERE idCommendation='$id'");
?>