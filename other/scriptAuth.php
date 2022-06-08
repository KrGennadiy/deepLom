<?php
include 'head.php';
$login= $_POST["login"];
$pass = $_POST["pass"];
$_SESSION['login'] = $login;
$_SESSION['pass'] = $pass;

//echo '<link rel="stylesheet" type="text/css" href="style.css">';

if ($mysqli->connect_errno) {
    printf("Ошибка соединения: %s\n", $mysqli->connect_error);
    exit();
}
$query = "SELECT * FROM auth where login='$login'";

$res = $mysqli->query($query);
$row = $res->fetch_assoc();
if (!$row) {
	?>
		<body id=bodyEnter>
			<div id='divBack'>
				<form action="index.html" method="POST">
					<h3 id='error'> логина не существует </h3>
					<input type="submit" class='submit' id='back' value="Назад">
				</form>
			</div>
		</body>
		<?php
}
else { 
	$newPass = sha1($pass);
	$_SESSION['auth'] = 1;
	if($row['password'] == $newPass) {
		header("Location: mainPage.php");
	}
	else{
		?>
		<body id=bodyEnter>
			<div id='divBack'>
				<form action="index.html" method="POST">
					<h3 id='error'> неверный пароль </h3>
					<input type="submit" class='submit' id='back' value="Назад">
				</form>
			</div>
		</body>
		<?php
		
	}
}
mysqli_close($mysqli);

?>