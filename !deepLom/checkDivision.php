<?php
include 'head.php';
$titleEvent = $_POST['titleDivision'];
echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ('<all><meta>');
if ($titleEvent == '') {
    echo '<titleDivision>bad</titleDivision>';
} else {
    echo '<titleDivision>good</titleDivision>';
}
echo ("</meta></all>");