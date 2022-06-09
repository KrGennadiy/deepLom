<?php
include 'head.php';
$document = $_POST['document'];
$firstName = $_POST['firstName'];
$secondName = $_POST['secondName'];
$middleName = $_POST['middleName'];
$sql = $mysqli->query("SELECT serviceman.document from serviceman where serviceman.document='$document'");
$row = $sql->fetch_assoc();
echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ('<all><meta>');
if (!$row['document']) {
    echo ("<free>good</free>");
} else {
    echo ("<free>bad</free>");
}
if ($document == '') {
    echo '<document1>bad</document1>';
} else {
    echo '<document1>good</document1>';
}
if ($firstName == '') {
    echo '<firstName>bad</firstName>';
} else {
    echo '<firstName>good</firstName>';
}
if ($secondName == '') {
    echo '<secondName>bad</secondName>';
} else {
    echo '<secondName>good</secondName>';
}
if ($middleName == '') {
    echo '<middleName>bad</middleName>';
} else {
    echo '<middleName>good</middleName>';
}
echo ("</meta></all>");
