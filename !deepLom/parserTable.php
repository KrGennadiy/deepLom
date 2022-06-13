<?php
//ЗАМЕТКИ
//!не реализован жирный текст
include 'head.php';

$typePlan = $_POST['typePlan'];
$fileSQL = $mysqli->query("SELECT typeplan.nameFilePattern from typeplan where typeplan.idTypePlan='$typePlan'");
        $fileExtract = $fileSQL->fetch_assoc();
        $file = $fileExtract['nameFilePattern'];

$source = __DIR__ . "/upload_files/" . $file;
//Разархивирование документа docx
$zip = new ZipArchive;
$openZip = $zip->open($source);
if ($openZip === TRUE) {
    $zip->extractTo('unzipXML');
    $zip->close();
} else {
    echo 'failed';
}

$path = "unzipXML/word/document.xml";
$xml = simplexml_load_file($path, null, 0, 'w', true); //создание объекта из xml файла
$body = $xml->body;
echo '<div id="docx" style="';
foreach ($body[0] as $bodyKey => $bodyValue) { //Задание ширины страницы для отображения в браузере
    if ($bodyKey == 'sectPr') {
        $pageWidth = $bodyValue->pgSz['w'] / 17.45;
        if ($pageWidth < 400) {
            $pageWidth *= 17.45;
        }
        echo ('width: ' . $pageWidth . 'px; ');
    }
}
echo 'margin-left: auto; margin-right: auto; '; //иллюзия листа А4
echo '">';
foreach ($body[0] as $bodyKey => $bodyValue) {
    if ($bodyKey == "p") { //ниже работа с текстом внутри абзаца
        echo "<p ";
        if (isset($bodyValue->pPr->jc)) { //выравнивание абзаца
            $align = $bodyValue->pPr->jc->attributes('w', true);
            if ($align['val'] == 'center') {
                echo 'align="center"';
            }
            if ($align['val'] == 'left') {
                echo 'align="left"';
            }
            if ($align['val'] == 'right') {
                echo 'align="right"';
            }
        }
        echo 'style="'; //отступ абзаца
        if (isset($bodyValue->pPr->ind)) {
            $indentP = $bodyValue->pPr->ind['left'] / 17.45;
            echo 'margin-left: ' . $indentP . '; ';
        }
        echo '"';
        echo '>';
        foreach ($bodyValue->r as $pKey => $pValue) { //эмуляция табуляции, реализовано неточно
            if (isset($pValue->tab)) {
                echo '&emsp;&emsp;';
            }
            if (isset($pValue->t)) { //вывод на страницу текста, включая белые пробелы
                $string = (string) $pValue->t;
                if (textFinder($string) < spaceFinder($string)) {
                    echo $string;
                    echo zeroPrinter($string, spaceFinder($string));
                } elseif (textFinder($string) > spaceFinder($string)) {
                    echo zeroPrinter($string, spaceFinder($string));
                    echo $string;
                } else {
                    echo $string;
                }
            }
        }
        echo "</p>";
    }
    if ($bodyKey == "tbl") { //поиск таблицы
        echo '<table '; //коэффициент размера таблицы = 17.45, при масшатбе страницы 85%
        if (isset($bodyValue->tblPr->tblLook)) {
            $borderTable = $bodyValue->tblPr->tblLook['val'];
            if ($borderTable > 0) {
                echo 'border="1" ';
            }
        }
        if (isset($bodyValue->tblPr->tblW)) { //задание ширины таблицы
            $widthTable = $bodyValue->tblPr->tblW['w'] / 17.45;
            echo 'width = "' . $widthTable . '" ';
        }
        echo 'style="'; //отступ таблицы
        if (isset($bodyValue->tblPr->tblInd)) {
            $indentTable = $bodyValue->tblPr->tblInd['w'] / 17.45;
            echo 'margin-left: ' . $indentTable . 'px; ';
        }
        if (isset($bodyValue->tblPr->tblCellMar->left)) { //внутренний отступ в ячейках
            $paddingCellTableLeft = $bodyValue->tblPr->tblCellMar->left['w'] / 17.45;
            echo 'padding-left: ' . $paddingCellTableLeft . 'px; ';
        }
        if (isset($bodyValue->tblPr->tblCellMar->right)) {
            $paddingCellTableRight = $bodyValue->tblPr->tblCellMar->right['w'] / 17.45;
            echo 'padding-right: ' . $paddingCellTableRight . 'px; ';
        }
        echo '"';
        echo '>';
        foreach ($bodyValue->tr as $tblKey => $tblValue) { //работа со сторокой
            echo '<tr>';
            foreach ($tblValue->tc as $tcKey => $tcValue) { //работа с ячейками
                echo '<td ';
                if (isset($tcValue->tcPr->vAlign)) { //выравнивание текста в ячейках таблицы
                    $align = $tcValue->tcPr->vAlign->attributes('w', true);
                    if ($align['val'] == 'center') {
                        echo 'align="center"';
                    }
                    if ($align['val'] == 'left') {
                        echo 'align="left"';
                    }
                    if ($align['val'] == 'right') {
                        echo 'align="right"';
                    }
                }
                echo ' ';
                if (isset($tcValue->tcPr->tcW)) { //ширина ячеек
                    $tcWidth = $tcValue->tcPr->tcW['w'] / 17.45;
                    echo ('width="' . $tcWidth . '"');
                }
                echo ' ';
                if (isset($tcValue->tcPr->gridSpan)) { //объединение ячеек
                    $tcSpan = $tcValue->tcPr->gridSpan['val'];
                    echo ('colspan="' . $tcSpan . '"');
                }
                echo '>';
                foreach ($tcValue->p as $pTcKey => $pTcValue) { //работа с абзацами
                    echo '<p ';
                    if (isset($pTcValue->pPr->jc)) {
                        $align = $pTcValue->pPr->jc->attributes('w', true); //выравнивание текста в абзаце
                        if ($align['val'] == 'center') {
                            echo 'align="center"';
                        }
                        if ($align['val'] == 'left') {
                            echo 'align="left"';
                        }
                        if ($align['val'] == 'right') {
                            echo 'align="right"';
                        }
                        echo 'style="';
                        if (isset($bodyValue->pPr->ind)) { //смещение абзаца
                            $indentP = $bodyValue->pPr->ind['left'] / 17.45;
                            echo 'margin-left: ' . $indentP . '; ';
                        }
                        echo '"';
                    }
                    echo '>';
                    foreach ($pTcValue->r as $rTcKey => $rTcValue) { //работа с runText
                        if (isset($rTcValue->tab)) {
                            echo '&emsp;&emsp;';
                        }
                        if (isset($rTcValue->t)) { //вывод на страницу текста, включая белые пробелы
                            $string = (string) $rTcValue->t;
                            if (textFinder($string) < spaceFinder($string)) {
                                echo $string;
                                echo zeroPrinter($string, spaceFinder($string));
                            } elseif (textFinder($string) > spaceFinder($string)) {
                                echo zeroPrinter($string, spaceFinder($string));
                                echo $string;
                            } else {
                                echo $string;
                            }
                        }
                        /*
                        foreach ($rTcValue->t->attributes('xml', true) as $tTcKey => $tTcValue) { //проверка на одинокий пробел
                            if ($tTcKey = 'space') {
                                echo '&nbsp;';
                            };
                        }
                        echo (string)$rTcValue->t; //вывод текста
                        */
                    }
                    echo '</p>';
                }
                echo '</td>';
            }
            echo '</tr>';
        }
        echo '</table>';
    }
}
echo '</div>';

//Функция определяет, с какой стороны runText присутствуют белые пробелы и выводит порядковый номер первого такого пробела
function spaceFinder($string = '')
{
    $spaceCounter = 0;
    for ($i = 0; $i < strlen($string); $i++) {
        if ($string[$i] == ' ' && $spaceCounter == 1) {
            return $i;
        } elseif ($string[$i] != ' ') {
            $spaceCounter = 0;
        } elseif ($string[$i] != ' ' && $i == strlen($string) - 1) {
            return -1;
        } else {
            $spaceCounter++;
        }
    }
}
//Находит порядковый номер символа, с которого начинается текст
function textFinder($string = '')
{
    for ($i = 0; $i < strlen($string); $i++) {
        if ($string[$i] != ' ') {
            return $i;
        } elseif ($i == strlen($string) - 1) {
            return -1;
        }
    }
}
//Функция вывода белых пробелов
function zeroPrinter($string = '', $key = 0)
{
    if ($key == -1) {
        return '';
    }
    $out = '';
    if ($key < strlen($string)) {
        for ($i = $key; $i < strlen($string); $i++) {
            if ($string[(int)$i] == ' ') {
                $out .= '&nbsp;';
            } else {
                break;
            }
        }
    }
    return $out;
}
