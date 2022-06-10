<?php
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

$approverPack = $mysqli->query("SELECT idServiceman, idRankServiceman, idPositionServiceman, idDivisionServiceman  from serviceman where idServiceman = '$approver'");
$approverPackExtract = $approverPack->fetch_assoc();
if ($approverPackExtract != '') {
    $mysqli->query("INSERT INTO approver (idServicemanApprover, idRankApprover, idPositionApprover, idDivisionApprover) 
    VALUES ('" . $approverPackExtract['idServiceman'] . "', '" . $approverPackExtract['idRankServiceman'] . "', '" . $approverPackExtract['idPositionServiceman'] . "', '" . $approverPackExtract['idDivisionServiceman'] . "')");
}
$idApproverSQL = $mysqli->query("SELECT idApprover from approver where idServicemanApprover = '" . $approverPackExtract['idServiceman'] . "'");
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

////////////////
for ($i = 0; $i = sizeof($arrayEvent); $i++) {
    $titleEvent = $arrayEvent[$i]['event'];
    $deadLineEvent = $arrayEvent[$i]['deadLineEvent'];
    $executor = $arrayEvent[$i]['executor'];
    $coExecutor = $arrayEvent[$i]['coExecutor'];
    
    $executorPack = $mysqli->query("SELECT idServiceman, idRankServiceman, idPositionServiceman, idDivisionServiceman  from serviceman where idServiceman = '$executor'");
    $executorPackExtract = $executorPack->fetch_assoc();
    if ($executorPackExtract != '') {
        $mysqli->query("INSERT INTO executor (idServiceman, idRank, idPosition, idDivision) 
    VALUES ('" . $executorPackExtract['idServiceman'] . "', '" . $executorPackExtract['idRankServiceman'] . "', '" . $executorPackExtract['idPositionServiceman'] . "', '" . $executorPackExtract['idDivisionServiceman'] . "')");
    }
    $idExecutorSQL = $mysqli->query("SELECT idExecutor from executor where idServiceman = '" . $approverPackExtract['idServiceman'] . "'");
    $idExecutor = $idExecutorSQL->fetch_assoc();
    $idExecutor = $idExecutor['idExecutor'];

    $coExecutorPack = $mysqli->query("SELECT idServiceman, idRankServiceman, idPositionServiceman, idDivisionServiceman  from serviceman where idServiceman = '$coExecutor'");
    $coExecutorPackExtract = $approverPack->fetch_assoc();
    if ($coExecutorPackExtract != '') {
        $mysqli->query("INSERT INTO approver (idServicemanCoExecutor, idRankCoExecutor, idPositionCoExecutor, idDivisionCoExecutor) 
    VALUES ('" . $coExecutorPackExtract['idServiceman'] . "', '" . $coExecutorPackExtract['idRankServiceman'] . "', '" . $coExecutorPackExtract['idPositionServiceman'] . "', '" . $coExecutorPackExtract['idDivisionServiceman'] . "')");
    }
    $idCoExecutorSQL = $mysqli->query("SELECT idCoExecutor from coexecutor where idServiceman = '" . $approverPackExtract['idServiceman'] . "'");
    $idCoExecutor = $idCoExecutorSQL->fetch_assoc();
    $idCoExecutor = $idCoExecutor['idCoExecutor'];

    if ($idExecutor != '' && $idCoExecutor != '' && $titleEvent != '' && $deadLineEvent != '') {
        $mysqli->query("UPDATE event set (idCoExecutorEvent, idExecutorEvent, titleEvent, deadLineEvent, idPlanEvent) VALUES ('$idCoExecutor', '$idExecutor', '$titleEvent', '$deadLineEvent', '$idPlan')");
    }


}





