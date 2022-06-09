<?php
session_start();
if ($_SESSION['auth'] == 1) { ?>
    <!DOCTYPE html>
    <html lang="ru">
    <link rel="stylesheet" type="text/css" href="style.css">

    <head>
        <meta charset="utf-8">
        <title>Прототип</title>
    </head>

    <body id="bodyUser" onload="startAjax();">
        <div id="topSide">
            <name> Вы вошли под <login id="log"><?php echo $_SESSION['login']; ?></login>
            </name>
        </div>
        <div id='rightSide'>
            <form id='formTable'>
                <div id='table'></div>
            </form>
            <div id='switchTable'></div>
        </div>
        <div id="leftSide">
            <form action='exit.php'>
                <div id='exitUser'>
                    <input type='submit' class="button" id="exit" value='Выйти из пользователя'>
                </div>
            </form>
            <!--
                <form action="downloadList.php">
                    <input type="submit" class="button" value="Добавить сотрудника"><br>  
                </form>
                -->

            <div id='temporary'>
                <form id='formTemp'>
                    <input type="button" class="button" onclick="newServiceman();" value="Добавить сотрудника"><br>
                    <input type="button" class="button" onclick="newEvent();" value="Добавить мероприятие"><br>
                    <input type="button" class="button" onclick="newPlan(); newEvent();" value="Создать планир. документ"><br>
                    <input type="button" class="button" onclick="uploadPlan();" value="Просмотреть docx"><br>
                    <input type="button" class="button" onclick="uploadPattern();" value="Загрузить шаблон"><br>
                </form>
            </div>
        </div>
    </body>
    <script type="text/javascript" src="AJAX.js"></script>
    <script type="text/javascript" src="../js/fusioncharts.js"></script>
    <script type="text/javascript" src="../js/themes/fusioncharts.theme.fusion.js"></script>

    </html>
<?php
} else {
    echo 'Не пройдена аутентификация';
}
