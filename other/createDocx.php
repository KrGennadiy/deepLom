<?php
require 'vendor/autoload.php';

	$phpWord = new \PhpOffice\PhpWord\PhpWord(); // объект главного класса библиотеки
	$phpWord->setDefaultFontName('Times New Roman');
	$phpWord->setDefaultFontSize(14);
	
	$properties = $phpWord->getDocInfo(); // получение объекта параметров документа




?>