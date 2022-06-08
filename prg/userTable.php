<?php
include 'head.php';
$servicemanData = $mysqli->query(
   "SELECT serviceman.document, serviceman.name, militaryrank.nameRank, position.namePosition
    FROM serviceman, militaryrank, position
    where serviceman.rank=militaryrank.idRank
    and serviceman.position=position.idPosition"
);

$usersData = $mysqli->query(
    "SELECT login, typeuser FROM users"
);

$dateData = $mysqli->query(
    "SELECT number, january, february, march, april, may, june, jule, august, september, october, november, december FROM data"
);

echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ("<all>");
while($servicemanDataExtract = $servicemanData->fetch_assoc()): 
    echo (" 
        <tableData>
            <document>".$servicemanDataExtract['document']."</document>
            <name>". $servicemanDataExtract['name'] ."</name>
            <rank>". $servicemanDataExtract['nameRank'] ."</rank>
            <position>". $servicemanDataExtract['namePosition'] ."</position>
        </tableData>    
    ");
endwhile;
while($usersDataExtract = $usersData->fetch_assoc()): 
    echo (" 
        <usersData>
            <login>".$usersDataExtract['login']."</login>
            <typeuser>". $usersDataExtract['typeuser'] ."</typeuser>
        </usersData>    
    ");
endwhile;
echo ("</all>");
