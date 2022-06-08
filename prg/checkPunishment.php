<?php
include 'head.php';
$date = $_POST['date'];
$reason = $_POST['reason'];
$name = $_POST['namePunishment'];
echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ('<all><meta>');
if($reason == '' && $name == ''){
    echo ("
        <correct>all bad</correct> 
    ");
}
if($reason == '' && $name != ''){
    echo ("
        <correct>reason bad</correct>
    ");
}
if($reason != '' && $name == ''){
    echo ("
        <correct>name bad</correct> 
    ");
}
if($reason != '' && $name != ''){
    echo ("
            <correct>good</correct>    
    ");
}
echo("</meta></all>");
