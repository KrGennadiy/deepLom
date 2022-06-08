<?php 
session_start();
date_default_timezone_set('Europe/Moscow');
if($_SESSION['type'] == 'a'){
	$mysqli = new mysqli("localhost", "root", "", "rgr");

	$mysqli->query("SET NAMES utf8");
	$mysqli->query("SET CHARACTER SET utf8");
	$mysqli->query("SET character_set_client = utf8");
	$mysqli->query("SET character_set_connection = utf8");
	$mysqli->query("SET character_set_results = utf8");

	$auditData = $mysqli->query("SELECT * FROM audit");
	$numRowsAudit = $auditData->num_rows;
?>        
<!DOCTYPE HTML>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="style.css">
	<html>
		<head>
			<title>Администратор</title>
		</head>
		<body id="bodyAudit">
			<div id="topSide">
                <name> Вы вошли как администратор <login id="log"><?php echo $_SESSION['login']; ?></login> </name>
			</div>
            <div id='leftSide'>
                <form action='exit.php'>
                    <input type='submit' value='Выйти из учетной записи' id='exit' class='button'>
                </form>
                <form action='Admin.php'>
                    <input type='submit' value='Таблица пользователей' class='button'>
                </form>
            </div>        
            <div id=rightSide>
                <div id="tableAudit">
                    <table>
                        <tr>
                            <th>Логин</th>
                            <th>Результат</th>
                            <th>Время</th>
                            <th></th>
                        </tr>
                        
                        <?php for($i = 0; $i < $numRowsAudit; $i++): 
                        $auditDataExtract = $auditData->fetch_assoc();
                        echo ("
                        <tr> 
                            <td>" . $auditDataExtract['login'] . "</td> 
                            <td>" . $auditDataExtract['ivent'] . "</td> 
                            <td>" . $auditDataExtract['datetime'] . "</td> 
                            <td> 
                                <form action='deleteAudit.php' method=POST> 
                                    <input type='hidden' value=" . $auditDataExtract['id'] . " name = auditId>
                                    <input type='submit' value='Удалить' class='buttonTable'> 
                                </form> 
                            </td> 
                        </tr>
                        ");
                        endfor; ?>
                    </table>
                </div>
            </div>
        </body>
    </html>
<?php
}
else{
	echo "Не пройдена авторизация";
}
