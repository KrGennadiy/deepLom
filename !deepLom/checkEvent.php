<?php
include 'head.php';
$titleEvent = $_POST['titleEvent'];
$commentEvent = $_POST['commentEvent'];
echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ('<all><meta>');
if ($titleEvent == '') {
    echo '<titleEvent>bad</titleEvent>';
} else {
    echo '<titleEvent>good</titleEvent>';
}
if ($commentEvent == '') {
    echo '<commentEvent>bad</commentEvent>';
} else {
    echo '<commentEvent>good</commentEvent>';
}
echo ("</meta></all>");