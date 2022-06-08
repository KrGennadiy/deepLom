<?php
require 'vendor/autoload.php';
$uploaddir = __DIR__."/upload_files/";
$uploadfile = $uploaddir.basename($_FILES['uploadfile']['name']);

// Копируем файл из каталога для временного хранения файлов:
if (copy($_FILES['uploadfile']['tmp_name'], $uploadfile)) {
    echo "<h3>Файл успешно загружен на сервер</h3>";
}
else { 
    echo "<h3>Ошибка! Не удалось загрузить файл на сервер!</h3>"; exit; 
}
$source = __DIR__."/upload_files/".$_FILES['uploadfile']['name']; 
$objReader = \PhpOffice\PhpWord\IOFactory::createReader('Word2007');
$phpWord = $objReader->load($source);

//$body = '';
$iSection = 0;
foreach($phpWord->getSections() as $section) {
    $arrays = $section->getElements();
    echo('section'.++$iSection.'</br>'); 
    //echo($section); --не конвертируется в string
    //print_r($section); --рабочий вариант 
    $iElem = 0; //счетчик элементов
    foreach($arrays as $element) {
        $iTextRun = 0; //счетчик блоков сложного текста внутри элемента
        echo('element'.++$iElem.'</br>');
        if(get_class($element) === 'PhpOffice\PhpWord\Element\TextRun') {
            foreach($element->getElements() as $text) {
                echo('textRun'.++$iTextRun.'</br>');
                $font = $text->getFontStyle();
                
                $size = $font->getSize()/10;
                $bold = $font->isBold() ? 'font-weight:700;' :'';
                $color = $font->getColor();
                $fontFamily = $font->getName();
                
                //$body .= '<span style="font-size:' . $size . 'em;font-family:' . $fontFamily . '; '.$bold.'; color:#'.$color.'">';
                //$body .= $text->getText().'</span>';
                echo($text->getText());
                echo('</br>');
            }
        }
    
        else if(get_class($element) === 'PhpOffice\PhpWord\Element\TextBreak') {
            //$body .= '<br/>';
            echo('</br>');
        }
    
        else if(get_class($element) === 'PhpOffice\PhpWord\Element\Table') {
            //$body .= '<table border="2px">';
            $rows = $element->getRows();
            foreach($rows as $row) {
                //$body .= '<tr>';
                $cells = $row->getCells();
                foreach($cells as $cell) {
                    //$body .= '<td style="width:'.$cell->getWidth().'">';
                    $celements = $cell->getElements();
                    foreach($celements as $celem) {
                        if(get_class($celem) === 'PhpOffice\PhpWord\Element\Text') {
                            //$body .= $celem->getText();
                            echo($celem->getText());
                            echo('</br>');
                        }
                        else if(get_class($celem) === 'PhpOffice\PhpWord\Element\TextRun') { 
    
                                foreach($celem->getElements() as $text) {
                                    //$body .= $text->getText();
                                    echo($text->getText());
                                    echo('</br>');
                                }
                        }
                    } 
                    //$body .= '</td>';
                }
                //$body .= '</tr>';
            }  
            //$body .= '</table>';
        }
        else {
            //$body .= $element->getText();
            echo($element->getText());
            echo('</br>');
        }
    }
    break;
}
//echo($body);
 
//include 'templ.php';