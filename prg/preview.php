<?php
include 'head.php';
$login= $_POST["login"];
$pass = $_POST["pass"];
$_SESSION['login'] = $login;
$_SESSION['pass'] = $pass;

echo '<link rel="stylesheet" type="text/css" href="style.css">';

if ($mysqli->connect_errno) {
    printf("Ошибка соединения: %s\n", $mysqli->connect_error);
    exit();
}
$query = "SELECT * FROM users where login='$login'";

$res = $mysqli->query($query);
$row = $res->fetch_assoc();
if (!$row) {
	?>
		<body id=bodyEnter>
			<div id='divBack'>
				<form action="Enter.html" method="POST">
					<h3 id='error'> неверный логин/пароль </h3>
					<input type="submit" class='submit' id='back' value="Назад">
				</form>
			</div>
		</body>
		<?php
}
else { 
	$newPass = sha1($pass);
	if($row['password'] == $newPass) {
		if($row['typeuser'] == '0'){
			$_SESSION['typeuser'] = 'a';	
		}
		else{
			$_SESSION['typeuser'] = 'u';
		}
		if($_SESSION['typeuser'] == 'a'){
			header("Location: admin.php");
		}
		else{
			header("Location: user.php");
		}
	}
	else{
		?>
		<body id=bodyEnter>
			<div id='divBack'>
				<form action="Enter.html" method="POST">
					<h3 id='error'> неверный логин/пароль </h3>
					<input type="submit" class='submit' id='back' value="Назад">
				</form>
			</div>
		</body>
		<?php
		
	}
}
mysqli_close($mysqli);

function deleteAudit(){
	$mysqli->query("");	
}

?>