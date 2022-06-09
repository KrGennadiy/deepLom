<?php
include 'head.php';
$login = $mysqli->query(
    "SELECT auth.login
    FROM auth"
);

echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ("<all>");
echo ('sdf');
while ($servicemanDataExtract = $login->fetch_assoc()) :
    echo (" 
        <data>
            <login>" . $servicemanDataExtract['document'] . "</login>
        </data>    
    ");
endwhile;
echo ("</all>");
