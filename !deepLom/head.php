<?php
session_start();
$mysqli = new mysqli("localhost", "root", "", "plan");
$mysqli->query("SET NAMES utf8");
$mysqli->query("SET CHARACTER SET utf8");
$mysqli->query("SET character_set_client = utf8");
$mysqli->query("SET character_set_connection = utf8");
$mysqli->query("SET character_set_results = utf8");