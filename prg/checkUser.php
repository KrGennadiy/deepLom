<?php
include 'head.php';
$login = $_POST['login'];
$password = $_POST['password'];
$sql=$mysqli->query("SELECT login from users where login='$login'");
$row=$sql->fetch_assoc();
echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ('<all><meta>');
if($row['login']!=''){
    echo ("
        <free>bad</free> 
    ");
}
else{
    echo ("
    <free>good</free> 
");
}
if($login == '' && $password == ''){
    echo ("
        <correct>all bad</correct> 
    ");
}
if($login == '' && $password != ''){
    echo ("
        <correct>login bad</correct>
    ");
}
if($login != '' && $password == ''){
    echo ("
        <correct>password bad</correct> 
    ");
}
if($login != '' && $password != ''){
    echo ("
            <meta>
                <correct>good</correct>
            </meta>    
    ");
}
echo("</meta></all>");
