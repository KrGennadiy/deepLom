<?php
session_start();
$mysqli = new mysqli("localhost", "root", "", "rgr");
$oldLogin = $_POST['oldlogin'];
if($_POST['typeuser'] == 'admin'){
    $typeuser = 'a';      
}
else{
    $typeuser = 'u';
}   
$mysqli->query("UPDATE users SET typeuser='$typeuser' where login='$oldLogin'");
header("Location: admin.php");
?>

