<?php
include 'head.php';
$patternId = $_POST['patternId'];
echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ('<all><meta>');
$sql = $mysqli->query("SELECT typeplan.nameFilePattern from typeplan where typeplan.idTypePlan='$patternId'");
$row = $sql->fetch_assoc();


if($row){
    echo '<nameFilePattern>'.$row['nameFilePattern'].'</nameFilePattern>';
}
echo ("</meta></all>");