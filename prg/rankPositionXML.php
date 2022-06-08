<?php
include 'head.php';
$rankData = $mysqli->query(
   "SELECT * FROM militaryrank"
);

$positionData = $mysqli->query(
    "SELECT * FROM position"
);

echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ("<all>");
while($rankDataExtract = $rankData->fetch_assoc()): 
    echo (" 
        <rankData>
            <idRank>".$rankDataExtract['idRank']."</idRank>
            <nameRank>". $rankDataExtract['nameRank'] ."</nameRank>
        </rankData>    
    ");
endwhile;
while($positionDataExtract = $positionData->fetch_assoc()): 
    echo (" 
        <positionData>
            <idPosition>".$positionDataExtract['idPosition']."</idPosition>
            <namePosition>". $positionDataExtract['namePosition'] ."</namePosition>
        </positionData>    
    ");
endwhile;
echo ("</all>");