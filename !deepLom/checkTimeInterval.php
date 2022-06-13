<?php
include 'head.php';
$titleTimeInterval = $_POST['titleTimeInterval'];
echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ('<all><meta>');
if ($titleTimeInterval == '') {
    echo '<titleTimeInterval>bad</titleTimeInterval>';
} else {
    echo '<titleTimeInterval>good</titleTimeInterval>';
}
echo ("</meta></all>");