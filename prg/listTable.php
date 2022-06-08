<?php
include 'head.php';

$commendationData = $mysqli->query(
   "SELECT commendation.documentServiceman, commendation.idCommendation, commendation.nameCommendation, militaryrank.nameRank, position.namePosition, commendation.date, commendation.reason, chief.name
    FROM commendation, militaryrank, position, chief
    where commendation.rankChief=militaryrank.idRank
    and commendation.positionChief=position.idPosition
    and commendation.documentChief=chief.document" 
);

$punishmentData = $mysqli->query(
    "SELECT punishment.documentServiceman, punishment.idPunishment, punishment.namePunishment, militaryrank.nameRank, position.namePosition, punishment.date, punishment.reason, punishment.actuality, chief.name
     FROM punishment, militaryrank, position, chief
     where punishment.rankChief=militaryrank.idRank
     and punishment.positionChief=position.idPosition
     and punishment.documentChief=chief.document"
 );

echo ('<?xml version="1.0" encoding="utf-8"?>');
echo ("<all>");
while($commendationDataExtract = $commendationData->fetch_assoc()): 
    echo (" 
        <commendationData>
            <documentServiceman>". $commendationDataExtract['documentServiceman'] ."</documentServiceman>
            <idCommendation>".$commendationDataExtract['idCommendation']."</idCommendation>
            <nameCommendation>". $commendationDataExtract['nameCommendation'] ."</nameCommendation>
            <nameRank>". $commendationDataExtract['nameRank'] ."</nameRank>
            <namePosition>". $commendationDataExtract['namePosition']. "</namePosition>
            <date>". $commendationDataExtract['date'] ."</date>
            <reason>". $commendationDataExtract['reason'] ."</reason>
            <nameChief>". $commendationDataExtract['name'] ."</nameChief>
        </commendationData>    
    ");
endwhile;
while($punishmentDataExtract = $punishmentData->fetch_assoc()): 
    echo (" 
        <punishmentData>
            <documentServiceman>". $punishmentDataExtract['documentServiceman'] ."</documentServiceman>
            <idPunishment>".$punishmentDataExtract['idPunishment']."</idPunishment>
            <namePunishment>". $punishmentDataExtract['namePunishment'] ."</namePunishment>
            <nameRank>". $punishmentDataExtract['nameRank'] ."</nameRank>
            <namePosition>". $punishmentDataExtract['namePosition']. "</namePosition>
            <date>". $punishmentDataExtract['date'] ."</date>
            <reason>". $punishmentDataExtract['reason'] ."</reason>
            <actuality>". $punishmentDataExtract['actuality'] ."</actuality>
            <nameChief>". $punishmentDataExtract['name'] ."</nameChief>
        </punishmentData>    
    ");
endwhile;
/*
while($publisherDataExtract = $publisherData->fetch_assoc()): 
    echo (" 
        <publisherData>
            <IdPublisher>". $publisherDataExtract['IdPublisher'] ."</IdPublisher>
            <TitlePublisher>". $publisherDataExtract['TitlePublisher'] ."</TitlePublisher>
            <Address>". $publisherDataExtract['Address'] ."</Address>
        </publisherData>    
    ");
endwhile;
while($authorDataExtract = $authorData->fetch_assoc()): 
    echo (" 
        <authorData>    
            <IdAuthor>". $authorDataExtract['IdAuthor'] ."</IdAuthor>
            <FirstName>". $authorDataExtract['FirstName'] ."</FirstName>
            <LastName>". $authorDataExtract['LastName'] ."</LastName>
        </authorData>   
    ");
endwhile;
while($genreDataExtract = $genreData->fetch_assoc()): 
    echo (" 
        <genreData>    
            <IdGenre>". $genreDataExtract['IdGenre'] ."</IdGenre>
            <NameGenre>". $genreDataExtract['NameGenre'] ."</NameGenre>
        </genreData>    
    ");
endwhile;
while($typeDataExtract = $typeData->fetch_assoc()): 
    echo (" 
        <typeData>
            <typeId>". $typeDataExtract['type_id'] ."</typeId>
            <type>". $typeDataExtract['type'] ."</type>
        </typeData>    
    ");
endwhile;
*/
echo ("</all>");