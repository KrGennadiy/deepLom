<?php
include 'head.php';
$titleGroupEvent = $_POST['titleGroupEvent'];
echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ('<all><meta>');
if ($titleGroupEvent == '') {
    echo '<titleGroupEvent>bad</titleGroupEvent>';
} else {
    echo '<titleGroupEvent>good</titleGroupEvent>';
}
echo ("</meta></all>");