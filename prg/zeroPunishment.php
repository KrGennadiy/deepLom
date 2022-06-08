<?php
include 'head.php';
$id = $_POST['idRow'];
$mysqli->query("UPDATE punishment SET actuality='0' where idPunishment='$id'");