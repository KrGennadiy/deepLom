<?php
//ЗАМЕТКИ
//!не реализован жирный текст
include 'head.php';
$uploaddir = __DIR__ . "/upload_files/";
$uploadfile = $uploaddir . basename($_FILES['uploadfile']['name']);

// Копируем файл из каталога для временного хранения файлов:
if (!copy($_FILES['uploadfile']['tmp_name'], $uploadfile)) {
    echo "<h3>Ошибка! Не удалось загрузить файл на сервер!</h3>";
}
if (!$_FILES['uploadfile']['tmp_name']) {
    echo "<h3>FILES</h3>";
}

$mysqli->query("INSERT INTO pattern (titlePattern) VALUES ('needTitle')");
$sql = $mysqli->query("SELECT idPattern FROM pattern WHERE titlePattern='needTitle'");
$row = $sql->fetch_assoc();
$name = (string)$row['idPattern'];
$fileName = $name . '_' . $_FILES['uploadfile']['name'];
$mysqli->query(" UPDATE pattern SET titlePattern = '$fileName' WHERE idPattern = '$name'");

$source = __DIR__ . "/upload_files/" . $_FILES['uploadfile']['name'];
//Разархивирование документа docx
$zip = new ZipArchive;
$openZip = $zip->open($source);
if ($openZip === TRUE) {
    $zip->extractTo('unzipXML');
} else {
    echo 'failed';
}
//запись содержимого документа в одну строку
$path = "unzipXML/word/document.xml";
$xml = simplexml_load_file($path, null, 0, 'w', true); //создание объекта из xml файла
$body = $xml->body;
$text = '';
foreach ($body[0] as $bodyKey => $bodyValue) {
    if ($bodyKey == "p") { //ниже работа с текстом внутри абзаца
        foreach ($bodyValue->r as $pKey => $pValue) { //эмуляция табуляции, реализовано неточно
            if (isset($pValue->t)) { //вывод на страницу текста, включая белые пробелы
                $string = (string) $pValue->t;
                $text .= $string;
            }
        }
    }
    if ($bodyKey == "tbl") { //поиск таблицы
        foreach ($bodyValue->tr as $tblKey => $tblValue) { //работа со сторокой
            foreach ($tblValue->tc as $tcKey => $tcValue) { //работа с ячейками
                foreach ($tcValue->p as $pTcKey => $pTcValue) { //работа с абзацами 
                    foreach ($pTcValue->r as $rTcKey => $rTcValue) { //работа с runText
                        if (isset($rTcValue->t)) { //вывод на страницу текста, включая белые пробелы
                            $string = (string) $rTcValue->t;
                            $text .= $string;
                        }
                    }
                }
            }
        }
    }
}
//заполнение массива переменных документа
$beginVariable = 0;
$bufer = '';
$variables = array();
for ($i = 0; $i < strlen($text); $i++) { //заполнение массива переменных
    if ($beginVariable == 1 && $text[$i] == ')') {
        $beginVariable = 0;
        array_push($variables, $bufer);
        $bufer = '';
    }
    if ($text[$i] != '(' && $beginVariable == 1) {
        $bufer .= $text[$i];
    }
    if ($text[$i - 1] == '$' && $text[$i] == '(') {
        $beginVariable = 1;
    }
}
//приведение документа к виду, в котором TR содержит только полные переменные.

$counter = 0; //объявление счетчика для массива переменных
foreach ($body[0] as $bodyKey => $bodyValue) {
    $wordKiller = 0; //инициализация индикатора для убийцы мусорной части переменных
    if ($bodyKey == "p") { //ниже работа с текстом внутри абзаца
        $bufer = ' '; //присвоение буферу пустого пробела для случаев, когда в абзаце отсутствуют переменные, однако обращение к 1-му элементу массива все равно идет
        foreach ($bodyValue->r as $pKey => $pValue) {
            $buferNonV = ''; //строка, в которую аккумулируются символы "не переменных"
            if (isset($pValue->t)) {
                $string = (string) $pValue->t;
                for ($i = 0; $i < strlen($string); $i++) {
                    if ($string[$i] == '$') { //запись в TR всей переменной
                        $bufer = '$(' . $variables[$counter++] . ')';
                        $pValue->t = $bufer;
                        //echo ' p ' . $counter . ' ' . $pValue->t;
                        $wordKiller = 1;
                        $key = 1;
                    } elseif ($wordKiller == 1) { // работа убийцы мусорной части
                        if ($string[$i] == $bufer[$key]) { // проверка TR на наличие мусорной части переменной (далее МЧП)
                            $key++; //игнорирование мусорной части
                        }
                        if ($key == strlen($bufer)) { // условие остановки убийцы МЧП
                            $wordKiller = 0;
                        }
                    } elseif ($wordKiller == 0) { // сохранение данных TR, не содержащих переменные
                        $buferNonV .= $string[$i];
                    }
                }
                if ($bufer[0] == '$') { //исключение записи строки без переменных поверх строки с переменной
                    $bufer[0] = '@';
                } else {
                    $pValue->t = $buferNonV;
                }
            }
        }
    }
    if ($bodyKey == "tbl") { //поиск таблицы
        foreach ($bodyValue->tr as $tblKey => $tblValue) { //работа со сторокой
            foreach ($tblValue->tc as $tcKey => $tcValue) { //работа с ячейками
                foreach ($tcValue->p as $pTcKey => $pTcValue) { //работа с абзацами 
                    $bufer = ' '; // аналогично с ' bodyKey == "p" ', см. выше 
                    foreach ($pTcValue->r as $rTcKey => $rTcValue) { //работа с runText
                        $buferNonV = '';
                        if (isset($rTcValue->t)) {
                            $string = (string) $rTcValue->t;
                            for ($i = 0; $i < strlen($string); $i++) {
                                if ($string[$i] == '$') {
                                    $bufer = '$(' . $variables[$counter++] . ')';
                                    $rTcValue->t = $bufer;
                                    //echo ' tbl ' . $counter . ' ' . $rTcValue->t;
                                    $wordKiller = 1;
                                    $key = 1;
                                } elseif ($wordKiller == 1) {
                                    if ($string[$i] == $bufer[$key]) {
                                        $key++;
                                    }
                                    if ($key == strlen($bufer)) {
                                        $wordKiller = 0;
                                    }
                                } elseif ($wordKiller == 0) {
                                    $buferNonV .= $string[$i];
                                }
                            }
                            if ($bufer[0] == '$') {
                                $bufer[0] = '@';
                            } else {
                                $rTcValue->t = $buferNonV;
                            }
                        }
                    }
                }
            }
        }
    }
}
$trueFile = fopen("unzipXML/document.xml", "w");
fwrite($trueFile, $xml->asXML());
fclose($trueFile);



$openZip = $zip->open($source);
if ($openZip === TRUE) {
    $zip->addFile('unzipXML/document.xml', 'word/document.xml');
    $zip->close();
} else {
    echo 'failed';
}
unlink('unzipXML/document.xml'); //удаление временного файла

//обратно архивируем измененный docx

$pathDir = 'unzipXML/'; // путь к папке, файлы которой будем архивировать
$nameArhive = $fileName; //название архива
$zip = new ZipArchive; // класс для работы с архивами
if ($zip->open('upload_samples/' . $nameArhive, ZipArchive::CREATE) === TRUE) { // создаем архив, если все прошло удачно продолжаем
    $dir0 = opendir($pathDir); // открываем папку с файлами
    while ($file0 = readdir($dir0)) { // перебираем все файлы из нашей папки
        if ($file0 == '..') {
            continue;
        }
        if ($file0 == '.') {
            continue;
        }
        if (is_file($pathDir . $file0)) {
            $zip->addFile($pathDir . $file0, $file0); // и архивируем
        } else {
            $dir1 = opendir($pathDir . $file0 . '/');
            while ($file1 = readdir($dir1)) {
                if ($file1 == '..') {
                    continue;
                }
                if (
                    $file1 == '.'
                ) {
                    continue;
                }
                if (is_file($pathDir . $file0 . '/' . $file1)) {
                    $zip->addFile($pathDir . $file0 . '/' . $file1, $file0 . '/' . $file1); // и архивируем
                } else {
                    $dir2 = opendir($pathDir . $file0 . '/' . $file1 . '/');
                    while ($file2 = readdir($dir2)) {
                        if ($file2 == '..') {
                            continue;
                        }
                        if ($file2 == '.') {
                            continue;
                        }
                        if (is_file($pathDir . $file0 . '/' . $file1 . '/' . $file2)) {
                            $zip->addFile($pathDir . $file0 . '/' . $file1 . '/' . $file2, $file0 . '/' . $file1 . '/' . $file2); // и архивируем
                        } else {
                            $dir3 = opendir($pathDir . $file0 . '/' . $file1 . '/' . $file2 . '/');
                            while ($file3 = readdir($dir3)) {
                                if ($file3 == '..') {
                                    continue;
                                }
                                if ($file3 == '.') {
                                    continue;
                                }
                                if (is_file($pathDir . $file0 . '/' . $file1 . '/' . $file2 . '/' . $file3)) {
                                    $zip->addFile($pathDir . $file0 . '/' . $file1 . '/' . $file2 . '/' . $file3, $file0 . '/' . $file1 . '/' . $file2 . '/' . $file3); // и архивируем
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    $zip->close(); // закрываем архив.
} else {
    die('Произошла ошибка при создании архива');
}

$titleTypePlan = $_POST['titleTypePlan'];
echo ('<?xml version="1.0" encoding="utf-8"?>');
if ($titleTypePlan != '' && $fileName != '') {
    $mysqli->query("INSERT INTO typeplan (titleTypePlan, nameFilePattern) VALUES ('$titleTypePlan', '$fileName')");
}
echo "<script>self.location='afterUploadPattern.php';</script>";

