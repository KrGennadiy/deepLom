<?php
	session_start();
    $m = mysqli_connect("localhost", "root", "", "prg_kp");
    mysqli_query($m,'SET character_set_database = utf8'); 
	mysqli_query ($m,"SET NAMES 'utf8'");
    mysqli_query($m, "SET NAMES utf8");
    mysqli_query($m, "SET CHARACTER SET utf8");
    mysqli_query($m, "SET character_set_client = utf8");
    mysqli_query($m, "SET character_set_connection = utf8");
    mysqli_query($m, "SET character_set_results = utf8");
        
    error_reporting(E_ALL); 
    ini_set("display_errors", 1);
        
    if( !defined( "ExcelExport" ) ) {
		define( "ExcelExport", 1 );
		class ExportToExcel {
			var $xlsData = ""; 
			var $fileName = ""; 
			var $countRow = 0; 
			var $countCol = 0; 
			var $totalCol = 6;
			function __construct (){
				$this->xlsData = pack( "ssssss", 0x809, 0x08, 0x00,0x10, 0x0, 0x0 );
			}
			function RecNumber( $row, $col, $value ){
				$this->xlsData .= pack( "sssss", 0x0203, 14, $row, $col, 0x00 );
				$this->xlsData .= pack( "d", $value );
				return;
			}
			function RecText( $row, $col, $value ){
				$len = strlen( $value );
				$this->xlsData .= pack( "s*", 0x0204, 8 + $len, $row, $col, 0x00, $len);
				$this->xlsData .= $value;
				return;
			}
			function InsertNumber( $value ){
				if ( $this->countCol == $this->totalCol ) {
					$this->countCol = 0;
					$this->countRow++;
				}
				$this->RecNumber( $this->countRow, $this->countCol, $value );
				$this->countCol++;
				return;
			}
			function InsertText( $value ){
				if ( $this->countCol == $this->totalCol ) {
						$this->countCol = 0;
						$this->countRow++;
				}
				$this->RecText( $this->countRow, $this->countCol, $value );
				$this->countCol++;
				return;
			}
			function GoNewLine(){
				$this->countCol = 0;
				$this->countRow++;
				return;
			}
			function EndData(){
				$this->xlsData .= pack( "ss", 0x0A, 0x00 );
				return;
			}
			function SaveFile( $fileName ){
				$this->fileName = $fileName;
				$this->SendFile();
			}
			function SendFile(){
				$this->EndData();
				header ( "Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT" );
				header ( "Cache-Control: no-store, no-cache, must-revalidate" );
				header ( "Pragma: no-cache" );
				header ( "Content-type: application/x-msexcel" );
				header ( "Content-Disposition: attachment; fileName=$this->fileName.xls" );
				print $this->xlsData;
			}
		} 
    }
  
	   
	$date= gmdate("D,d M Y H:i:s");
	$filename = 'Дисциплинарная_практика_кафедры'; 
	$excel = new ExportToExcel(); 
    $sqlS=
        "SELECT serviceman.document, serviceman.name, militaryrank.nameRank, position.namePosition
		FROM serviceman, militaryrank, position
		where serviceman.rank=militaryrank.idRank
		and serviceman.position=position.idPosition";
    $sqlC=
	   "SELECT serviceman.document, commendation.idCommendation, commendation.nameCommendation, militaryrank.nameRank, position.namePosition, commendation.date, commendation.reason, chief.name
       FROM commendation, militaryrank, position, chief, serviceman
       where commendation.rankChief=militaryrank.idRank
       and commendation.positionChief=position.idPosition
       and commendation.documentChief=chief.document
       and commendation.documentServiceman=serviceman.document";
    $sqlP=
       "SELECT serviceman.document, punishment.documentServiceman, punishment.idPunishment, punishment.namePunishment, militaryrank.nameRank, position.namePosition, punishment.date, punishment.reason, punishment.actuality, chief.name
        FROM punishment, militaryrank, position, chief, serviceman
        where punishment.rankChief=militaryrank.idRank
        and punishment.positionChief=position.idPosition
        and punishment.documentChief=chief.document
        and punishment.documentServiceman=serviceman.document";
                     
    mysqli_query($m,"set names cp1251");
    $rezS=mysqli_query($m,$sqlS);
	$excel->InsertText('Вывод данных из системы учета дисциплинарной практики кафедры: ');
	$excel->InsertText($date);
	$excel->GoNewLine();
	$excel->GoNewLine();
    
    while($rowS=mysqli_fetch_assoc($rezS)){
        $excel->InsertText('Дисц. карточка: '.$rowS['namePosition'].' '.$rowS['nameRank'].' '.$rowS['name']);
        $excel->GoNewLine();
        $excel->InsertText('Вид');
        $excel->InsertText('От кого');
        $excel->InsertText('Причина');
        $excel->InsertText('Дата');
        $excel->GoNewLine();
		$rezC=mysqli_query($m,$sqlC);
		while($rowC=mysqli_fetch_assoc($rezC)){
            if($rowC['document']==$rowS['document']){
                $excel->InsertText($rowC['nameCommendation']);
                $excel->InsertText($rowC['namePosition'].' '.$rowC['nameRank'].' '.$rowC['name']);
                $excel->InsertText($rowC['reason']);
                $excel->InsertText($rowC['date']);
                $excel->GoNewLine();
            }
        }
		$rezP=mysqli_query($m,$sqlP);
		while($rowP=mysqli_fetch_assoc($rezP)){
            if($rowP['document']==$rowS['document']){
                $excel->InsertText($rowP['namePunishment']);
                $excel->InsertText($rowP['namePosition'].' '.$rowP['nameRank'].' '.$rowP['name']);
                $excel->InsertText($rowP['reason']);
				if($rowP['actuality'] == '0'){
					$outActuality = 'снято';
				}
				else{
					$outActuality = 'действует';	
				}
				$excel->InsertText($rowP['date'].' '.$outActuality);
                $excel->GoNewLine();
            }
		}
		$excel->GoNewLine();
		$excel->GoNewLine();
    }
    $excel->SaveFile($filename);
?>