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

$body = '';
$bufer = '';
foreach ($phpWord->getSections() as $section) {
    $arrays = $section->getElements();

    foreach ($arrays as $element) {
        if (get_class($element) === 'PhpOffice\PhpWord\Element\TextRun') {
            //$body .= '(beginTR)';
            foreach ($element->getElements() as $text) {
                if (get_class($text) === 'PhpOffice\PhpWord\Element\Text') {
                    $font = $text->getFontStyle();

                    $size = $font->getSize() / 10;
                    $bold = $font->isBold() ? 'font-weight:700;' : '';
                    $color = $font->getColor();
                    $fontFamily = $font->getName();
                    $body .= '<span style="font-size:' . $size . 'em;font-family:' . $fontFamily . '; ' . $bold . '; color:#' . $color . '">';
                    //$body .= '(text_TR)';
                    $body .= $text->getText() . '</span>';

                    //$bufer = $text->getText();
                    /*
                    if ($bufer[strlen($bufer) - 1] == ' ') {
                        $body .= '<br/>';
                    }
                    */
                }
                if (get_class($text) === 'PhpOffice\PhpWord\Element\TextBreak' || get_class($text) === 'PhpOffice\PhpWord\Section\TextBreak') {
                    $body .= '<br/>';
                }
            }
        } else if (get_class($element) === 'PhpOffice\PhpWord\Element\TextBreak' || get_class($element) === 'PhpOffice\PhpWord\Section\TextBreak') {
            $body .= '<br/>';
        } else if (get_class($element) === 'PhpOffice\PhpWord\Element\Table') {
            $body .= '<table border="2px">';
            $rows = $element->getRows();
            foreach ($rows as $row) {
                $body .= '<tr>';
                $cells = $row->getCells();
                foreach ($cells as $cell) {
                    $body .= '<td style="width:' . $cell->getWidth() . '">';
                    $celements = $cell->getElements();
                    foreach ($celements as $celem) {
                        if (get_class($celem) === 'PhpOffice\PhpWord\Element\Text') {
                            //$body .= '(text_table)';
                            $body .= $celem->getText();
                        } elseif (get_class($celem) === 'PhpOffice\PhpWord\Element\TextBreak' || get_class($celem) === 'PhpOffice\PhpWord\Section\TextBreak') {
                            $body .= '<br/>';
                        } elseif (get_class($celem) === 'PhpOffice\PhpWord\Element\TextRun') {
                            //$body .= '(begin_TR_table)';
                            foreach ($celem->getElements() as $text) {
                                if (get_class($text) === 'PhpOffice\PhpWord\Element\Text') {
                                    //$body .= '(text_TR_Table)';
                                    $body .= $text->getText();
                                }elseif(get_class($text) === 'PhpOffice\PhpWord\Element\TextBreak' || get_class($text) === 'PhpOffice\PhpWord\Section\TextBreak'){
                                    $body .= '<br/>';    
                                }
                            }
                        }
                    }
                    $body .= '</td>';
                }
                $body .= '</tr>';
            }
            $body .= '</table>';
        } elseif (get_class($element) === 'PhpOffice\PhpWord\Element\Text') {
            //$body .= '(text)';
            $body .= $element->getText();
        } 
    }
    break;
}
echo ($body);

 
//include 'templ.php';