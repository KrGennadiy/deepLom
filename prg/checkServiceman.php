<?php
include 'head.php';
$document = $_POST['document'];
$fullName = $_POST['fullName'];
$sql=$mysqli->query("SELECT document from serviceman where document='$document'");
$row=$sql->fetch_assoc();
echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ('<all><meta>');
if(!$row['document']){
    echo ("<free>good</free>\n");
}
else{
    echo ("<free>bad</free>\n");
}
if($document == '' && $fullName == ''){
    echo ("<correct>all bad</correct>");
}
if($document == '' && $fullName != ''){
    echo ("<correct>document bad</correct>");
}
if($document != '' && $fullName == ''){
    echo ("<correct>name bad</correct>");
}
if($document != '' && $fullName != ''){
    echo ("<correct>good</correct>  ");
}
echo("</meta></all>");
