<?php
include 'head.php';
$planMainTableData = $mysqli->query(
    "SELECT plan.idPlan, plan.idTypePlan, typeplan.titleTypePlan, typeplan.nameFilePattern, timeinterval.titleTimeInterval, division.titleDivision
    FROM plan, timeinterval, division, typeplan
    where plan.idTimeInterval=timeinterval.idTimeInterval
    and plan.idDivisionPlan=division.idDivision
    and plan.idTypePlan=typeplan.idTypePlan"
);


echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ("<all>");
while ($planMainTableDataExtract = $planMainTableData->fetch_assoc()) :
    echo (" 
        <planMainTableData>
            <idPlan>" . $planMainTableDataExtract['idPlan'] . "</idPlan>
            <titlePlan>" . $planMainTableDataExtract['titleTypePlan'] . "</titlePlan>
            <titleTimeInterval>" . $planMainTableDataExtract['titleTimeInterval'] . "</titleTimeInterval>
            <titleDivision>" . $planMainTableDataExtract['titleDivision'] . "</titleDivision>
            <idTypePlan>" . $planMainTableDataExtract['idTypePlan'] . "</idTypePlan>
            <nameFilePattern>" . $planMainTableDataExtract['nameFilePattern'] . "</nameFilePattern>
        </planMainTableData>    
    ");
endwhile;
echo ("</all>");
