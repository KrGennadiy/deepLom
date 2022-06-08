<?php
include('head.php');
$authorData = $mysqli->query("SELECT * FROM author");
echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ("<author>");
while($authorDataExtract = $authorData->fetch_assoc()): 
    echo (" 
        <authorData>    
            <IdAuthor>". $authorDataExtract['IdAuthor'] ."</IdAuthor>
            <FirstName>". $authorDataExtract['FirstName'] ."</FirstName>
            <LastName>". $authorDataExtract['LastName'] ."</LastName>
        </authorData>   
    ");
endwhile;
echo ("</author>");