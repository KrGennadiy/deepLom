<?php
session_start();
include 'head.php';
$type = $_POST['NameType'];
if($type != ''){
    $mysqli->query("INSERT INTO type (type) VALUES ('$type')");
}
else{
    echo 'Ошибка, ввод пустых значений';
}