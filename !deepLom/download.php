<?
  echo '<p><a href="newDocx/119_sample.docx" download>Скачать файл</a>';
 echo '123';
header("Cache-Control: public");
 header("Content-Description: File Transfer");
 header("Content-Disposition: attachment; filename=119_sample.docx");
 header("Content-Transfer-Encoding: binary");
 header("Content-Type: binary/octet-stream");
 readfile('newDocx/119_sample.docx', true);



?>