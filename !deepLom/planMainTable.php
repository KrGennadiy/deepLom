<?php
include 'head.php';
$planMainTableData = $mysqli->query(
    "SELECT plan.idPlan, plan.titlePlan, timeinterval.titleTimeInterval, division.titleDivision
    FROM plan, timeinterval, division
    where plan.idTimeInterval=timeinterval.idTimeInterval
    and plan.idDivisionPlan=division.idDivision"
);


echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ("<all>");
while ($planMainTableDataExtract = $planMainTableData->fetch_assoc()) :
    echo (" 
        <planMainTableData>
            <idPlan>" . $planMainTableDataExtract['idPlan'] . "</idPlan>
            <titlePlan>" . $planMainTableDataExtract['titlePlan'] . "</titlePlan>
            <titleTimeInterval>" . $planMainTableDataExtract['titleTimeInterval'] . "</titleTimeInterval>
            <titleDivision>" . $planMainTableDataExtract['titleDivision'] . "</titleDivision>
        </planMainTableData>    
    ");
endwhile;
echo ("</all>");
