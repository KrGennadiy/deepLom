<?php
include 'head.php';
$rankData = $mysqli->query(
   "SELECT * FROM militaryrank"
);

$positionData = $mysqli->query(
    "SELECT * FROM militaryposition"
);

$divisionData = $mysqli->query(
    "SELECT * FROM division"
);

echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ("<all>");
while($rankDataExtract = $rankData->fetch_assoc()): 
    echo (" 
        <rankData>
            <idRank>".$rankDataExtract['idRank']."</idRank>
            <titleMilitaryRank>". $rankDataExtract['titleMilitaryRank'] ."</titleMilitaryRank>
        </rankData>    
    ");
endwhile;
while($positionDataExtract = $positionData->fetch_assoc()): 
    echo (" 
        <positionData>
            <idPosition>".$positionDataExtract['idPosition']."</idPosition>
            <titlePosition>". $positionDataExtract['titlePosition'] ."</titlePosition>
        </positionData>    
    ");
endwhile;
while($divisionDataExtract = $divisionData->fetch_assoc()): 
    echo (" 
        <divisionData>
            <idDivision>".$divisionDataExtract['idDivision']."</idDivision>
            <titleDivision>". $divisionDataExtract['titleDivision'] ."</titleDivision>
        </divisionData>    
    ");
endwhile;
echo ("</all>");