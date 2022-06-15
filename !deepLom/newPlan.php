<?php

function formatDate($input)
{
    if ($input) {
        $year = $input[0] . $input[1] . $input[2] . $input[3];
        $mounth = $input[5] . $input[6];
        $day = $input[8] . $input[9];
        return $day . '.' . $mounth . '.' . $year;
    } else {
        return '';
    }
}

include 'head.php';
$pattern = $_POST['pattern'];
$approver = $_POST['approver'];
$agreeder = $_POST['agreeder'];
$division = $_POST['division'];
$timeInterval = $_POST['timeInterval'];
$arrayGroupEvent = $_POST['groupEvent'];
$arrayEvent = $_POST['event'];
$arrayExecutor = $_POST['executor'];
$arrayCoExecutor = $_POST['coExecutor'];
$arrayDeadLine = $_POST['deadLineEvent'];
//формируем docx файл
$patternPack = $mysqli->query("SELECT nameFilePattern  from typeplan where idTypePlan = '$pattern'");
$patternPackExtract = $patternPack->fetch_assoc();
$patternFile = $patternPackExtract['nameFilePattern'];

$source = __DIR__ . "/upload_samples/" . $patternFile;
$zip = new ZipArchive;
$openZip = $zip->open($source);
if ($openZip === TRUE) {
    $zip->extractTo('unzipXML');
} else {
    echo 'failed';
}
$path = "unzipXML/word/document.xml";
$newXml = simplexml_load_file($path, null, 0, 'w', true); //создание объекта из xml файла

//Извлекаю из БД данные, которые находятся вне таблицы

$approverPackSQL = $mysqli->query("SELECT idServiceman, secondNameServiceman, idRankServiceman, idPositionServiceman, idDivisionServiceman  from serviceman where idServiceman = '$approver'");
$approverPackExtract = $approverPackSQL->fetch_assoc();

$idRankApprover = $approverPackExtract['idRankServiceman'];
$idPositionApprover = $approverPackExtract['idPositionServiceman'];

$approverRankSQL = $mysqli->query("SELECT titleMilitaryRank from militaryrank where idRank = '$idRankApprover'");
$approverRankExtract = $approverRankSQL->fetch_assoc();
$approverRank = $approverRankExtract['titleMilitaryRank'];

$approverPositionSQL = $mysqli->query("SELECT titlePosition from militaryposition where idPosition = '$idPositionApprover'");
$approverPositionExtract = $approverPositionSQL->fetch_assoc();
$approverPosition = $approverPositionExtract['titlePosition'];

$agreederPackSQL = $mysqli->query("SELECT idServiceman, secondNameServiceman, idRankServiceman, idPositionServiceman, idDivisionServiceman  from serviceman where idServiceman = '$agreeder'");
$agreederPackExtract = $agreederPackSQL->fetch_assoc();

$idRankAgreeder = $agreederPackExtract['idRankServiceman'];
$idPositionAgreeder = $agreederPackExtract['idPositionServiceman'];

$agreederRankSQL = $mysqli->query("SELECT titleMilitaryRank from militaryrank where idRank = '$idRankAgreeder'");
$agreederRankExtract = $agreederRankSQL->fetch_assoc();
$agreederRank = $agreederRankExtract['titleMilitaryRank'];

$agreederPositionSQL = $mysqli->query("SELECT titlePosition from militaryposition where idPosition = '$idPositionAgreeder'");
$agreederPositionExtract = $agreederPositionSQL->fetch_assoc();
$agreederPosition = $agreederPositionExtract['titlePosition'];

$titlePlanSQL = $mysqli->query("SELECT titleTypePlan from typeplan where idTypePlan = '$pattern'");
$titlePlanExtract = $titlePlanSQL->fetch_assoc();
$titlePlan = $titlePlanExtract['titleTypePlan'];

$titleDivisionSQL = $mysqli->query("SELECT titleDivision from division where idDivision = '$division'");
$titleDivisionExtract = $titleDivisionSQL->fetch_assoc();
$titleDivision = $titleDivisionExtract['titleDivision'];

$titleTimeIntervalSQL = $mysqli->query("SELECT titleTimeInterval from timeinterval where idTimeInterval = '$timeInterval'");
$titleTimeIntervalExtract = $titleTimeIntervalSQL->fetch_assoc();
$titleTimeInterval = $titleTimeIntervalExtract['titleTimeInterval']; //проблемная кодировка

$approverFNSQL = $mysqli->query("SELECT SUBSTRING(firstNameServiceman, 1, 1) AS FN from serviceman where idServiceman = '$approver'");
$approverFNSQLExtract = $approverFNSQL->fetch_assoc();
$approverFN = $approverFNSQLExtract['FN'];

$agreederFNSQL = $mysqli->query("SELECT SUBSTRING(firstNameServiceman, 1, 1) AS FN from serviceman where idServiceman = '$agreeder'");
$agreederFNSQLExtract = $agreederFNSQL->fetch_assoc();
$agreederFN = $agreederFNSQLExtract['FN'];

$approverMNSQL = $mysqli->query("SELECT SUBSTRING(middleNameServiceman, 1, 1) AS MN from serviceman where idServiceman = '$approver'");
$approverMNSQLExtract = $approverMNSQL->fetch_assoc();
$approverMN = $approverMNSQLExtract['MN'];

$agreederMNSQL = $mysqli->query("SELECT SUBSTRING(middleNameServiceman, 1, 1) AS MN from serviceman where idServiceman = '$agreeder'");
$agreederMNSQLExtract = $agreederMNSQL->fetch_assoc();
$agreederMN = $agreederMNSQLExtract['MN'];


$SN = $approverPackExtract['secondNameServiceman'];
$fullNameApprover = $SN . ' ' . $approverFN . '. ' . $approverMN . '.';

$SN = $agreederPackExtract['secondNameServiceman'];
$fullNameAgreeder = $SN . ' ' . $agreederFN . '. ' . $agreederMN . '.';

/*
$newXml = simplexml_load_string(str_replace("$(nameApprover)", $fullNameApprover, $newXml->asXML()));
$newXml = simplexml_load_string(str_replace("$(rankApprover)", $approverRank, $newXml->asXML()));
$newXml = simplexml_load_string(str_replace("$(positionApprover)", $approverPosition, $newXml->asXML()));
$newXml = simplexml_load_string(str_replace("$(titlePlan)", $titlePlan, $newXml->asXML()));
$newXml = simplexml_load_string(str_replace("$(titleDivision)", $titleDivision, $newXml->asXML()));
$newXml = simplexml_load_string(str_replace("$(timeInterval)", $titleTimeInterval, $newXml->asXML()));
$newXml = simplexml_load_string(str_replace("$(nameAgreeder)", $fullNameAgreeder, $newXml->asXML()));
$newXml = simplexml_load_string(str_replace("$(rankAgreeder)", $agreederRank, $newXml->asXML()));
$newXml = simplexml_load_string(str_replace("$(positionAgreeder)", $agreederPosition, $newXml->asXML()));
*/



$buferXml = str_replace("$(nameApprover)", $fullNameApprover, $newXml->asXML());
$buferXml = str_replace("$(rankApprover)", $approverRank, $buferXml);
$buferXml = str_replace("$(positionApprover)", $approverPosition, $buferXml);
$buferXml = str_replace("$(titlePlan)", $titlePlan, $buferXml);
$buferXml = str_replace("$(titleDivision)", $titleDivision, $buferXml);
$buferXml = str_replace("$(timeInterval)", $titleTimeInterval, $buferXml);
$buferXml = str_replace("$(nameAgreeder)", $fullNameAgreeder, $buferXml);
$buferXml = str_replace("$(rankAgreeder)", $agreederRank, $buferXml);
$buferXml = str_replace("$(positionAgreeder)", $agreederPosition, $buferXml);
$newXml = simplexml_load_string($buferXml, null, 0, 'w', true);


if ($approverPackExtract != '') {
    $mysqli->query("INSERT INTO approver (idServicemanApprover, idRankApprover, idPositionApprover, idDivisionApprover) 
    VALUES ('" . $approverPackExtract['idServiceman'] . "', '" . $approverPackExtract['idRankServiceman'] . "', '" . $approverPackExtract['idPositionServiceman'] . "', '" . $approverPackExtract['idDivisionServiceman'] . "')");
}
$idApproverSQL = $mysqli->query("SELECT idApprover  from approver where idServicemanApprover = '" . $approverPackExtract['idServiceman'] . "'");
$idApprover = $idApproverSQL->fetch_assoc();
$idApprover = $idApprover['idApprover'];

$agreederPack = $mysqli->query("SELECT idServiceman, idRankServiceman, idPositionServiceman, idDivisionServiceman  from serviceman where idServiceman = '$agreeder'");
$agreederPackExtract = $agreederPack->fetch_assoc();
if ($agreederPackExtract != '') {
    $mysqli->query("INSERT INTO agreeder (idServicemanAgreeder, idRankAgreeder, idPositionAgreeder, idDivisionAgreeder) 
    VALUES ('" . $agreederPackExtract['idServiceman'] . "', '" . $agreederPackExtract['idRankServiceman'] . "', '" . $agreederPackExtract['idPositionServiceman'] . "', '" . $agreederPackExtract['idDivisionServiceman'] . "')");
}
$idAgreederSQL = $mysqli->query("SELECT idAgreeder from agreeder where idServicemanAgreeder = '" . $agreederPackExtract['idServiceman'] . "'");
$idAgreeder = $idAgreederSQL->fetch_assoc();
$idAgreeder = $idAgreeder['idAgreeder'];

if ($timeInterval != '' && $idApprover != '' && $idAgreeder != '' && $timeInterval != '' && $division != '' && $pattern != '') {
    $mysqli->query("INSERT INTO plan (idTimeInterval, idApprover, idAgreeder, numberPlan, idDivisionPlan, idTypePlan) VALUES ('$timeInterval', '$idApprover', '$idAgreeder', '$timeInterval', '$division', '$pattern')");
    $idPlan =  mysqli_insert_id($mysqli);
}
//извлекаю из БД данные для табличной части документа
$body = $newXml->body;
$text = '';
$buferTitleGroup = '';
$buferTitleEvent = '';
foreach ($body[0] as $bodyKey => $bodyValue) {
    if ($bodyKey == "tbl") { //поиск таблицы
        foreach ($bodyValue->tr as $tblKey => $tblValue) { //работа со сторокой
            $search = $tblValue->asXML();
            if (str_contains($search, '$(titleGroup)')) {
                $buferTitleGroup = $tblValue->asXML();
            }
            if (str_contains($search, '$(titleEvent)')) {
                $buferTitleEvent = $tblValue->asXML();
            }
        }
    }
}
$box = '';
for ($i = 1; $i <= sizeof($arrayGroupEvent); $i++) {
    $titleGroupEvent = $arrayGroupEvent[$i];
    $titleGroupSQL = $mysqli->query("SELECT groupevent.titleGroupEvent from groupevent where groupevent.idGroupEvent='$titleGroupEvent'");
    $titleGroupExtract = $titleGroupSQL->fetch_assoc();
    $titleGroupEvent = $titleGroupExtract['titleGroupEvent'];

    $bufer = str_replace("$(indexGroup)", $i, $buferTitleGroup);
    $bufer = str_replace('$(titleGroup)', $titleGroupEvent, $bufer);
    $box .= $bufer;
    for ($u = 1; $u <= sizeof($arrayEvent[$i]); $u++) {
        $titleEvent = $arrayEvent[$i][$u];
        $deadLineEvent = formatDate($arrayDeadLine[$i][$u]);
        $executor = $arrayExecutor[$i][$u];
        $coExecutor = $arrayCoExecutor[$i][$u];

        $commentSQL = $mysqli->query("SELECT event.commentEvent from event where event.idEvent='$titleEvent'");
        $commentExtract = $commentSQL->fetch_assoc();
        $comment = $commentExtract['commentEvent'];

        $titleEventSQL = $mysqli->query("SELECT event.titleEvent from event where event.idEvent='$titleEvent'");
        $titleEventExtract = $titleEventSQL->fetch_assoc();
        $titleEvent = $titleEventExtract['titleEvent'];


        $executorPack = $mysqli->query("SELECT idServiceman, idRankServiceman, idPositionServiceman, idDivisionServiceman, secondNameServiceman from serviceman where idServiceman = '$executor'");
        $executorFNSQL = $mysqli->query("SELECT SUBSTRING(firstNameServiceman, 1, 1) AS FN from serviceman where idServiceman = '$executor'");
        $executorMNSQL = $mysqli->query("SELECT SUBSTRING(middleNameServiceman, 1, 1) AS MN from serviceman where idServiceman = '$executor'");

        $executorPackExtract = $executorPack->fetch_assoc();
        $executorFNExtract = $executorFNSQL->fetch_assoc();
        $executorMNExtract = $executorMNSQL->fetch_assoc();

        $executorFN = $executorFNExtract['FN'];
        $executorMN = $executorMNExtract['MN'];
        $executorSecondName = $executorPackExtract['secondNameServiceman'];
        $executorFullName = $executorSecondName . ' ' . $executorFN . '. ' . $executorMN . '.';
        $executorPosition = $executorPackExtract['idPositionServiceman'];
        $executorRank = $executorPackExtract['idRankServiceman'];
        $executorServiceman = $executorPackExtract['idServiceman'];

        if ($executorPackExtract != '') {
            $mysqli->query("INSERT INTO executor (idServiceman, idRank, idPosition) 
            VALUES ('$executorServiceman', '$executorRank', '$executorPosition')");
        }
        $idExecutorSQL = $mysqli->query("SELECT idExecutor from executor where idServiceman = '$executorServiceman'");
        $idExecutorExtract = $idExecutorSQL->fetch_assoc();
        $idExecutor = $idExecutorExtract['idExecutor'];

        $coExecutorPack = $mysqli->query("SELECT idServiceman, idRankServiceman, idPositionServiceman, idDivisionServiceman, secondNameServiceman from serviceman where idServiceman = '$coExecutor'");
        $coExecutorFNSQL = $mysqli->query("SELECT SUBSTRING(firstNameServiceman, 1, 1) AS FN from serviceman where idServiceman = '$coExecutor'");
        $coExecutorMNSQL = $mysqli->query("SELECT SUBSTRING(middleNameServiceman, 1, 1) AS MN from serviceman where idServiceman = '$coExecutor'");

        $coExecutorPackExtract = $coExecutorPack->fetch_assoc();
        $coExecutorFNExtract = $coExecutorFNSQL->fetch_assoc();
        $coExecutorMNExtract = $coExecutorMNSQL->fetch_assoc();

        $coExecutorFN = $coExecutorFNExtract['FN'];
        $coExecutorMN = $coExecutorMNExtract['MN'];
        $coExecutorSecondName = $coExecutorPackExtract['secondNameServiceman'];
        $coExecutorFullName = $coExecutorSecondName . ' ' . $coExecutorFN . '. ' . $coExecutorMN . '.';
        $coExecutorPosition = $coExecutorPackExtract['idPositionServiceman'];
        $coExecutorRank = $coExecutorPackExtract['idRankServiceman'];
        $coExecutorServiceman = $coExecutorPackExtract['idServiceman'];

        if ($executorPackExtract != '') {
            $mysqli->query("INSERT INTO coExecutor (idServicemanCoExecutor, idRankCoExecutor, idPositionCoExecutor) 
            VALUES ('$coExecutorServiceman', '$coExecutorRank', '$coExecutorPosition')");
        }
        $idCoExecutorSQL = $mysqli->query("SELECT idCoExecutor from coexecutor where idServicemanCoExecutor = '$coExecutorServiceman'");
        $idCoExecutorExtract = $idCoExecutorSQL->fetch_assoc();
        $idCoExecutor = $idCoExecutorExtract['idCoExecutor'];



        $bufer = str_replace("$(indexGroup)", $i, $buferTitleEvent);
        $bufer = str_replace("$(indexEvent)", $u, $bufer);
        $bufer = str_replace("$(titleEvent)", $titleEvent, $bufer);
        $bufer = str_replace("$(commentEvent)", $comment, $bufer);
        $bufer = str_replace("$(deadLineEvent)", $deadLineEvent, $bufer);
        $bufer = str_replace("$(coExecutors)", $coExecutorFullName, $bufer);
        $bufer = str_replace("$(executor)", $executorFullName, $bufer);
        $box .= $bufer;

        if ($idExecutor != '' && $idCoExecutor != '' && $idPlan != '' && $deadLineEvent != '' && $titleGroupEvent != '') {
            $mysqli->query("UPDATE event set idCoExecutorEvent = '$idCoExecutor', idExecutorEvent = '$idExecutor', deadLineEvent = '$deadLineEvent', idPlanEvent = '$idPlan', idGroupEventEvent = '$arrayGroupEvent[$i]'");
        }
    }
}

$newestXml = str_replace($buferTitleGroup, '', $newXml->asXML());
$newestXml = str_replace($buferTitleEvent, $box, $newestXml);

$newXml = simplexml_load_string($newestXml, null, 0, 'w', true);

//формирование docx документа

$trueFile = fopen("unzipXML/document.xml", "w");
fwrite($trueFile, $newXml->asXML());
fclose($trueFile);

copy($source, 'newDocx/' . $idPlan . $patternFile);
copy($source, 'newDocx/plan.docx');
$openZip = $zip->open('newDocx/' . $idPlan .$patternFile);
if ($openZip === TRUE) {
    $zip->addFile('unzipXML/document.xml', 'word/document.xml');
    $zip->close();
} else {
    echo 'failed';
}

$openZip = $zip->open('newDocx/plan.docx');
if ($openZip === TRUE) {
    $zip->addFile('unzipXML/document.xml', 'word/document.xml');
    $zip->close();
} else {
    echo 'failed';
}
unlink('unzipXML/document.xml'); //удаление временного файла
