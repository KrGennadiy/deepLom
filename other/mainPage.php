<?php
session_start();
if($_SESSION['auth'] == 1){?>
    <!DOCTYPE html>
    <html lang="ru">
    <!-- <link rel="stylesheet" type="text/css" href="style.css"> -->
        <head>
            <meta charset="utf-8">
            <title>Прототип</title>
        </head>
        <body id="bodyUser" onload="startAjax();"> 
            <div id="topSide">
                <name> Аутентификация пройедна <!--<login id="log"><?php echo $_SESSION['login']; ?></login>--> </name>
            </div>
            <div id='rightSide'>
            </div>
            <div id="leftSide">
            </div>
        </body>
        <script type="text/javascript" src="AJAX.js"></script>
    </html>
<?php
}
else{
    echo 'Не пройдена аутентификация';
}  