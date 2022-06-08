<?php
session_start();
date_default_timezone_set('Europe/Moscow');
$time=date(DATE_RFC822);
$mysqli = new mysqli("localhost", "root", "", "rgr");

$mysqli->query("SET NAMES utf8");
$mysqli->query("SET CHARACTER SET utf8");
$mysqli->query("SET character_set_client = utf8");
$mysqli->query("SET character_set_connection = utf8");
$mysqli->query("SET character_set_results = utf8");

$usersData = $mysqli->query("SELECT login FROM users");
$numRows = $usersData->num_rows;
$login = $_POST["login"];
$pass = sha1($_POST["pass"]);
$log = $_SESSION['login'];
$allBad = 0;

for($i = 0; $i < $numRows; $i++){
    $usersDataExtract = $usersData->fetch_assoc();
    if($login == $usersDataExtract['login']){
        $allBad = 1;
    }
}
if($_POST['typeuser'] == 'admin'){
    $typeuser = 'a';      
}
else{
    $typeuser = 'u';
}
if($login != '' && $pass != '' && $allBad == 0){
    $mysqli->query("INSERT INTO users (login,password,typeuser) VALUES ('$login', '$pass', '$typeuser')");
    $mysqli->query("INSERT INTO audit (login,datetime,ivent) VALUES ('$log', '$time', 'Создание пользователя')");
    header("Location: admin.php");
}
else if($allBad == 1){
        echo ('
        <link rel="stylesheet" type="text/css" href="style.css">
        <body id=bodyEnter>
            <div id="divBack">
                <form action="newUser.php" method="POST">
                    <h3 id="error"> Ошибка: логин занят </h3>
                    <input type="submit" class="submit" id="back" value="Назад">
                </form>
            </div>
        </body>
        ');
}
    else{
        echo ('
        <link rel="stylesheet" type="text/css" href="style.css">
        <body id=bodyEnter>
            <div id="divBack">
                <form action="newUser.php" method="POST">
                    <h3 id="error"> Ошибка: ввод пустых значений </h3>
                    <input type="submit" class="submit" id="back" value="Назад">
                </form>
            </div>
        </body>
        ');
    }




?>