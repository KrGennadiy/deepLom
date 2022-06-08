<?php
	require 'vendor/autoload.php';

	$phpWord = new \PhpOffice\PhpWord\PhpWord(); // объект главного класса библиотеки
	$phpWord->setDefaultFontName('Times New Roman');
	$phpWord->setDefaultFontSize(14);
	
	$properties = $phpWord->getDocInfo(); // получение объекта параметров документа
	
	$properties->setCreator('Name');
	$properties->setCompany('Company');
	$properties->setTitle('Title');
	$properties->setDescription('Description');
	$properties->setCategory('My category');
	$properties->setLastModifiedBy('My name');
	$properties->setCreated(mktime(0, 0, 0, 3, 12, 2015));
	$properties->setModified(mktime(0, 0, 0, 3, 14, 2015));
	$properties->setSubject('My subject'); // тема документа
	$properties->setKeywords('my, key, word'); 

    $sectionStyle = array(
                        'orientation' => 'landscape',
                        'marginTop' => \PhpOffice\PhpWord\Shared\Converter::pixelToTwip(10),
                        'marginLeft' => 600,
                        'marginRight' => 600,
                        'colsNum' => 1,
                        'pageNumberingStart' => 1,
                        'borderBottomSize'=>100,
                        'borderBottomColor'=>'C0C0C0'
                    );
    $section = $phpWord->addSection($sectionStyle);
	
    $text = $_POST['textDocx'];
    $nameDocx = $_POST['nameDocx'];

    $fontStyle = array('name'=>'Arial', 'size'=>36, 'color'=>'075776', 'bold'=>TRUE, 'italic'=>TRUE);
    $parStyle = array('align'=>'center','spaceBefore'=>10);
    
    $section->addText(htmlspecialchars($text), $fontStyle,$parStyle);

    $phpWord->save($nameDocx.'.docx', 'Word2007', true);
    exit();
    
   
    

?>
