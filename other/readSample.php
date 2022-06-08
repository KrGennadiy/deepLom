<?php
require 'E:/xampp/htdocs/vendor/autoload.php';

$uploaddir = __DIR__ . "/upload_files/";
$uploadfile = $uploaddir . basename($_FILES['uploadfile']['name']);

// Копируем файл из каталога для временного хранения файлов:
if (copy($_FILES['uploadfile']['tmp_name'], $uploadfile)) {
    echo "<h3>Файл успешно загружен на сервер</h3>";
} else {
    echo "<h3>Ошибка! Не удалось загрузить файл на сервер!</h3>";
    exit;
}

$source = __DIR__ . "/upload_files/" . $_FILES['uploadfile']['name'];

$objReader = \PhpOffice\PhpWord\IOFactory::createReader('Word2007');

$phpWord = $objReader->load($source);

$longString = '';
foreach ($phpWord->getSections() as $section) {
    $arrays = $section->getElements();

    foreach ($arrays as $element) {
        if (get_class($element) === 'PhpOffice\PhpWord\Element\TextRun') {
            foreach ($element->getElements() as $text) {

                $font = $text->getFontStyle();

                $size = $font->getSize() / 10;
                $bold = $font->isBold() ? 'font-weight:700;' : '';
                $color = $font->getColor();
                $fontFamily = $font->getName();
                $longString .= $text->getText();
            }
        } else if (get_class($element) === 'PhpOffice\PhpWord\Element\TextBreak') {
            $body = 0; //заглушка
        } else if (get_class($element) === 'PhpOffice\PhpWord\Element\Table') {
            $rows = $element->getRows();
            foreach ($rows as $row) {
                $cells = $row->getCells();
                foreach ($cells as $cell) {
                    $celements = $cell->getElements();
                    foreach ($celements as $celem) {
                        if (get_class($celem) === 'PhpOffice\PhpWord\Element\Text') {
                            $longString .= $celem->getText();
                        } else if (get_class($celem) === 'PhpOffice\PhpWord\Element\TextRun') {

                            foreach ($celem->getElements() as $text) {
                                $longString .= $text->getText();
                                //$body .= $cell->getWidth(); -- проверка ширины ячейки таблицы
                            }
                        }
                    }
                }
            }
        } else {
            $longString .= $element->getText();
        }
    }
    break;
}
echo ($longString);
$sizeArray = strlen($longString);
$beginVariable = 0;
$arraySample = array();
$buferElement = '';
for ($i = 0; $i < $sizeArray; $i++) {
    if ($longString[$i] != '!' && $beginVariable == 1) {
        $buferElement .= $longString[$i];    
    }
    if ($longString[$i] == '!' && $beginVariable == 1) {
        $beginVariable = 0;
        array_push($arraySample, $buferElement); 
    } elseif ($longString[$i] == '!' && $beginVariable == 0) {
        $beginVariable = 1;
        $buferElement = '';
    }
}
echo('начало массива<br/>');
print_r($arraySample);

 
//include 'templ.php';