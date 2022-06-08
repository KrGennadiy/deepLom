<?php
include('head.php');
$publisherData = $mysqli->query("SELECT * FROM publisher");
echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ("<Publisher>");
while($publisherDataExtract = $publisherData->fetch_assoc()): 
    echo (" 
        <publisherData>
            <IdPublisher>". $publisherDataExtract['IdPublisher'] ."</IdPublisher>
            <TitlePublisher>". $publisherDataExtract['TitlePublisher'] ."</TitlePublisher>
            <Address>". $publisherDataExtract['Address'] ."</Address>
        </publisherData>    
    ");
endwhile;
echo ("</Publisher>");