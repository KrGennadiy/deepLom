<?php
include('head.php');
$typeData = $mysqli->query("SELECT * FROM type");
echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ("<Type>");
while($typeDataExtract = $typeData->fetch_assoc()): 
    echo (" 
        <typeData>
            <typeId>". $typeDataExtract['type_id'] ."</typeId>
            <type>". $typeDataExtract['type'] ."</type>
        </typeData>    
    ");
endwhile;
echo ("</Type>");