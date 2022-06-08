<?php
include('head.php');
$genreData = $mysqli->query("SELECT * FROM genre");
echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ("<Genre>");
while($genreDataExtract = $genreData->fetch_assoc()): 
    echo (" 
        <genreData>    
        <IdGenre>". $genreDataExtract['IdGenre'] ."</IdGenre>
        <NameGenre>". $genreDataExtract['NameGenre'] ."</NameGenre>
        </genreData>    
    ");
endwhile;
echo ("</Genre>");