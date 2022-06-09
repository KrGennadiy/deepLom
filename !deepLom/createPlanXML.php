<?php
include 'head.php';
$servicemanData = $mysqli->query(
    "SELECT serviceman.idServiceman, militaryposition.titlePosition, 
    militaryrank.titleMilitaryRank, division.titleDivision, 
    serviceman.firstNameServiceman, serviceman.secondNameServiceman, 
    serviceman.middleNameServiceman
    FROM serviceman, militaryrank, militaryposition, division
    where serviceman.idRankServiceman = militaryrank.idRank 
    and serviceman.idPositionServiceman = militaryposition.idPosition 
    and serviceman.idDivisionServiceman = division.idDivision"
);


echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ("<all>");
while ($eventDataExtract = $servicemanData->fetch_assoc()) {
    echo (" 
        <serviceman>
            <idServiceman>" . $eventDataExtract['idServiceman'] . "</idServiceman>
            <titleMilitaryRank>" . $eventDataExtract['titleMilitaryRank'] . "</titleMilitaryRank>
            <titlePosition>" . $eventDataExtract['titlePosition'] . "</titlePosition>
            <titleDivision>" . $eventDataExtract['titleDivision'] . "</titleDivision>
            <firstNameServiceman>" . $eventDataExtract['firstNameServiceman'] . "</firstNameServiceman>
            <secondNameServiceman>" . $eventDataExtract['secondNameServiceman'] . "</secondNameServiceman>
            <middleNameServiceman>" . $eventDataExtract['middleNameServiceman'] . "</middleNameServiceman>
        </serviceman>    
    ");
}

$planData = $mysqli->query(
    "SELECT plan.numberPlan, plan.idPlan, plan.titlePlan, division.titleDivision, 
    timeinterval.titleTimeInterval, timeinterval.beginTimeInterval, 
    timeinterval.endTimeInterval, typePlan.titleTypePlan from plan, division, timeinterval, typePlan 
    where plan.idDivisionPlan=division.idDivision 
    and plan.idTimeInterval  = timeinterval.idTimeInterval
    and plan.titlePlan = typePlan.idTypePlan"
);

while ($eventDataExtract = $planData->fetch_assoc()) {
    echo (" 
        <plan>
            <idPlan>" . $eventDataExtract['idPlan'] . "</idPlan>
            <titlePlan>" . $eventDataExtract['titleTypePlan'] . "</titlePlan>
            <titleDivision>" . $eventDataExtract['titleDivision'] . "</titleDivision>
            <titleTimeInterval>" . $eventDataExtract['titleTimeInterval'] . "</titleTimeInterval>
            <beginTimeInterval>" . $eventDataExtract['beginTimeInterval'] . "</beginTimeInterval>
            <endTimeInterval>" . $eventDataExtract['endTimeInterval'] . "</endTimeInterval>
            <numberPlan>" . $eventDataExtract['numberPlan'] . "</numberPlan>
        </plan>    
    ");
}

$eventData = $mysqli->query(
    "SELECT event.idEvent, groupevent.titleGroupEvent, event.titleEvent, 
    event.deadLineEvent, event.commentEvent 
    FROM event, groupevent 
    WHERE event.idGroupEventEvent = groupevent.idGroupEvent"
);

while ($eventDataExtract = $eventData->fetch_assoc()) {
    echo (" 
        <event>
            <idEvent>" . $eventDataExtract['idEvent'] . "</idEvent>
            <titleEvent>" . $eventDataExtract['titleEvent'] . "</titleEvent>
            <titleGroupEvent>" . $eventDataExtract['titleGroupEvent'] . "</titleGroupEvent>
            <deadLineEvent>" . $eventDataExtract['deadLineEvent'] . "</deadLineEvent>
            <commentEvent>" . $eventDataExtract['commentEvent'] . "</commentEvent>
        </event>    
    ");
}

$divisionData = $mysqli->query(
    "SELECT division.idDivision, division.titleDivision, 
    division.idUpperDivision, division.idLowerDivision 
    from division"
);

while ($divisionDataExtract = $divisionData->fetch_assoc()) {
    echo (" 
        <division>
            <idDivision>" . $divisionDataExtract['idDivision'] . "</idDivision>
            <titleDivision>" . $divisionDataExtract['titleDivision'] . "</titleDivision>
            <idUpperDivision>" . $divisionDataExtract['idUpperDivision'] . "</idUpperDivision>
            <idLowerDivision>" . $divisionDataExtract['idLowerDivision'] . "</idLowerDivision>
        </division>    
    ");
}

$timeIntervalData = $mysqli->query(
    "SELECT * FROM timeinterval"
);

while ($timeIntervalDataExtract = $timeIntervalData->fetch_assoc()) {
    echo (" 
        <timeInterval>
            <idTimeInterval>" . $timeIntervalDataExtract['idTimeInterval'] . "</idTimeInterval>
            <titleTimeInterval>" . $timeIntervalDataExtract['titleTimeInterval'] . "</titleTimeInterval>
            <beginTimeInterval>" . $timeIntervalDataExtract['beginTimeInterval'] . "</beginTimeInterval>
            <endTimeInterval>" . $timeIntervalDataExtract['endTimeInterval'] . "</endTimeInterval>
        </timeInterval>    
    ");
}

$groupEventData = $mysqli->query(
    "SELECT * FROM groupevent"
);

while ($groupEventDataExtract = $groupEventData->fetch_assoc()) {
    echo (" 
        <groupEvent>
            <idGroupEvent>" . $groupEventDataExtract['idGroupEvent'] . "</idGroupEvent>
            <titleGroupEvent>" . $groupEventDataExtract['titleGroupEvent'] . "</titleGroupEvent>
        </groupEvent>    
    ");
}
echo '</all>';
