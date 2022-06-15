<?php
//ЗАМЕТКИ
//!не реализован жирный текст
include 'head.php';
$idPlan = $_POST['planForParser'];

function clear(string $string){
    $bufer = '';
    for($i = 0; $i < strlen($string); $i++ ){
        if($string[$i] != '$' && $string[$i] != ')' && $string[$i] != '('){
            $bufer .= $string[$i];
        }
    }
    return $bufer;
}

$sql = $mysqli->query("SELECT * FROM plan where plan.idPlan = '$idPlan'");
$row = $sql->fetch_assoc();
$idTypePlan = $row['idTypePlan'];

$sql = $mysqli->query("SELECT * FROM typeplan where typeplan.idTypePlan = '$idTypePlan'");
$row = $sql->fetch_assoc();
$nameFilePattern = $row['nameFilePattern'];
$sourcePlan = __DIR__ . "/newDocx/" . $idPlan . $nameFilePattern;
$sourcePattern = __DIR__ . "/upload_samples/" . $nameFilePattern;


//Разархивирование документа docx
$zip = new ZipArchive;
$openZip = $zip->open($sourcePlan);
if ($openZip === TRUE) {
    $zip->extractTo('unzipPlan');
} else {
    echo 'failed';
}

$zip = new ZipArchive;
$openZip = $zip->open($sourcePattern);
if ($openZip === TRUE) {
    $zip->extractTo('unzipPattern');
} else {
    echo 'failed';
}
//запись содержимого документа в одну строку
$pathPlan = "unzipPlan/word/document.xml";
$pathPattern = 'unzipPattern/word/document.xml';

echo ('<?xml version="1.0" encoding="utf-8"?>');

$xmlPlan = simplexml_load_file($pathPlan, null, 0, 'w', true); //создание объекта из xml файла
$xmlPattern = simplexml_load_file($pathPattern, null, 0, 'w', true); //создание объекта из xml файла
$bodyPlan = $xmlPlan->body;
$bodyPattern = $xmlPattern->body;
$pPlan = $bodyPlan->p;
$tblPlan = $bodyPlan->tbl;
$pPattern = $bodyPattern->p;
$tblPattern = $bodyPattern->tbl;
echo ('<all>');
$indexGroupEvent = false;
$indexEvent = false;
foreach($bodyPlan as $bodyKeyPlan => $bodyValuePlan){
    
}

/*
for ($i = 0; $i < sizeof($bodyPlan); $i++) {
    echo $pPlan->asXML();
    $rPlan = $pPlan[$i]->r;
    $rPattern = $pPattern[$i]->r;
    for ($u = 0; $u < sizeof($rPattern); $u++) {
        if (isset($rPattern[$u]->t)) {
            $a = $rPattern[$u]->t;
            if ($a[0] == '$') {
                echo '<' . clear($a) . '>' . $rPlan[$u]->t . '</' . clear($a) . '>';
            }
        }
    }
}
*/
for ($i = 0; $i < sizeof($tblPattern); $i++) {

    $trPlan = $tblPlan[$i]->tr;
    $trPattern = $tblPattern[$i]->tr;
    for ($u = 0; $u < sizeof($trPattern); $u++) {
        $tcPlan = $trPlan[$u]->tc;
        $tcPattern = $trPattern[$u]->tc;
        for ($j = 0; $j < sizeof($tcPattern); $j++) {
            $pPlan = $tcPlan[$j]->p;
            $pPattern = $tcPattern[$j]->p;
            for ($j1 = 0; $j1 < sizeof($pPattern); $j1++) {
                $rPlan = $pPlan[$j1]->r;
                $rPattern = $pPattern[$j1]->r;
                for ($j2 = 0; $j2 < sizeof($rPattern); $j2++) {
                    if (strlen($rPattern[$j2]->t) > 0) {
                        $a = $rPattern[$j2]->t;
                        if ($a[0] == '$') {
                            if ($rPattern[$j2]->t != '$(titleGroupEvent)' && $rPattern[$j2] != '$(titleEvent)') {
                                echo '<' . clear($rPattern[$j2]->t) . '>' . $rPlan[$j2]->t . '</' . clear($rPattern[$j2]->t) . '>';
                            } else {
                                for ($u10 = $u; $u10 < sizeof($trPlan); $u10++) {
                                    $tcPlan = $trPlan[$u10]->tc;
                                    for ($j10 = $j; $j10 < sizeof($tcPlan); $j10++) {
                                        //проверка на группу мероприятий
                                        if ($tcPlan->tcPr->gridSpan['val'] == '4') {
                                            $pPlan = $tcPlan->p;
                                            for ($j20 = 0; $j20 < sizeof($pPlan); $j20++) {
                                                $rPlan = $pPlan->r;
                                                for ($j30 = 0; $j30 < sizeof($rPlan); $j30++) {
                                                    $tPlan = $rPlan->t;

                                                    if ($tPlan != '' && $tPlan != '.' && $indexGroupEvent == false) {
                                                        echo '<groupEventIndex>' . $tPlan . '</groupEventIndex>';
                                                        $indexGroupEvent = true;
                                                    } elseif ($tPlan != '' && $tPlan != '.' && $indexGroupEvent == true) {
                                                        echo '<groupEventTitle>' . $tPlan . '</groupEventTitle>';
                                                        $indexGroupEvent = false;
                                                    }
                                                }
                                            }
                                        } else {
                                            $pPlan = $tcPlan->p;
                                            for ($j20 = 0; $j20 < sizeof($pPlan); $j20++) {
                                                $rPlan = $pPlan->r;
                                                for ($j30 = 0; $j30 < sizeof($rPlan); $j30++) {
                                                    $tPlan = $rPlan->t;

                                                    if ($tPlan != '' && $tPlan != '.' && $indexEvent == false) {
                                                        echo '<eventIndex>' . $tPlan . '</eventIndex>';
                                                        $indexEvent=true;
                                                    } elseif ($tPlan != '' && $tPlan != '.' && $indexEvent == true) {
                                                        echo '<eventTitle>' . $tPlan . '</eventTitle>';
                                                        $indexEvent=false;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
echo ('</all>');
