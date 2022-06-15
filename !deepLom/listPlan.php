<?php
include 'head.php';
echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ('<all>');
$sql = $mysqli->query("SELECT * from plan");
while ($row = $sql->fetch_assoc()) {
    echo '<forPlan>';
    $idTypePlan = $row['idTypePlan'];
    echo '<idPlan>' . $row['idPlan'] . '</idPlan>';
    $sqlForPlan = $mysqli->query("SELECT * from typeplan where typeplan.idTypePlan='$idTypePlan'");
    $rowType = $sqlForPlan->fetch_assoc();
    echo '<nameFilePattern>'.$rowType['nameFilePattern'].'</nameFilePattern>';
    echo '<titleTypePlan>'.$rowType['titleTypePlan'].'</titleTypePlan>';
    echo '</forPlan>';   
}
echo ("</all>");
