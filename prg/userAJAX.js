function startAjax(){	
    var request;
    if(window.XMLHttpRequest){ 
        request = new XMLHttpRequest(); 
    } else if(window.ActiveXObject){ 
        request = new ActiveXObject("Microsoft.XMLHTTP");  
    } else { 
        return; 
    } 
    request.overrideMimeType("text/xml");  	
    request.onreadystatechange = function(){
        switch (request.readyState) {
            case 1: break
            case 2: break
            case 3: break
            case 4: {
                if(request.status==200) {								
                    var xmlDoc = request.responseXML;
                    var table="<table class='table' id='bookTable'><tr><th>Должность</th><th>Звание</th><th>ФИО</th><th>Номер военного билета</th><th></th></tr>";				
                    var messages = xmlDoc.getElementsByTagName("tableData");
                    numberServicemans = messages.length
                    for (i = 0; i < messages.length; i++) { 
                        outDocument = 'None'
                        outName = 'None'
                        outRank = 'None'
                        outPosition = 'None'

                        outDocument = messages[i].getElementsByTagName("document")[0].childNodes[0].nodeValue
                        outName = messages[i].getElementsByTagName("name")[0].childNodes[0].nodeValue
                        outRank = messages[i].getElementsByTagName("rank")[0].childNodes[0].nodeValue
                        outPosition = messages[i].getElementsByTagName("position")[0].childNodes[0].nodeValue
                        
                        
                        table += "<tr><td>" + outPosition + "</td>"
                        table += "<td>" + outRank + "</td>"
                        table += "<td>" + outName + "</td>"
                        table += "<td>" + outDocument + "</td>"
                        table += '<td class="actionButtons"><input type="button" value="учет поощрений\nи взысканий" class="buttonTableWide" onclick="List(\''+ outDocument +'\', \''+ outName +'\', \''+ outRank +'\', \''+ outPosition +'\'); defaultListCP(\''+ outDocument +'\', \''+ outName +'\', \''+ outRank +'\', \''+ outPosition +'\');">'
                        table += '</td></tr>'  
                    }
                    table +="</table>"
                    table +='<div id="rowId"></div>'
                    document.getElementById("table").innerHTML = table

                    switchButton = '<input type="button" class="button" id="buttonUpdate" onclick="startAjax();" value="Обновить">'
                    switchButton += '<b class="textSumm"> военнослужащих на кафедре: '+ numberServicemans +' </b>'
                    document.getElementById("switchTable").innerHTML = switchButton
                }
                else if(request.status==404) {
                    alert("Ошибка: запрашиваемый скрипт не найден!");
                    }
                    else alert("Ошибка: сервер вернул статус: " + request.status);
                break
            }
        }		
    } 
    request.open ('GET', 'userTable.php', true); 
    request.send (null); 
}
function List(documentServiceman, nameServiceman, rankServiceman, positionServiceman){	
    var request;
    if(window.XMLHttpRequest){ 
        request = new XMLHttpRequest(); 
    } else if(window.ActiveXObject){ 
        request = new ActiveXObject("Microsoft.XMLHTTP");  
    } else { 
        return; 
    } 
    request.overrideMimeType("text/xml");  	
    request.onreadystatechange = function(){
        switch (request.readyState) {
            case 1: break
            case 2: break
            case 3: break
            case 4: {
                if(request.status==200) {								
                    var xmlDoc = request.responseXML;
                    var table="<table class='table' id='tableCommendation'><tr><th>Вид</th><th>Кому</th><th>От кого</th><th>Причина</th><th>Дата</th><th></th></tr>";				
                    var messages = xmlDoc.getElementsByTagName("commendationData");
                    var messagesP = xmlDoc.getElementsByTagName("punishmentData");
                    numberList = 0
                    for (i = 0; i < messages.length; i++) { 
                        if(documentServiceman == messages[i].getElementsByTagName("documentServiceman")[0].childNodes[0].nodeValue){
                            outNameCommendation = 'None'
                            outNameRank = 'None'
                            outNamePosition = 'None'
                            outNameChief = 'None'
                            outDateCommendation = 'None'
                            outReasonCommendation = 'None'
                            outIdCommendation = 'None'
                            
                            outNameCommendation = messages[i].getElementsByTagName("nameCommendation")[0].childNodes[0].nodeValue
                            outNameRank = messages[i].getElementsByTagName("nameRank")[0].childNodes[0].nodeValue
                            outNamePosition = messages[i].getElementsByTagName("namePosition")[0].childNodes[0].nodeValue
                            outNameChief = messages[i].getElementsByTagName("nameChief")[0].childNodes[0].nodeValue
                            outDateCommendation = messages[i].getElementsByTagName("date")[0].childNodes[0].nodeValue
                            outReasonCommendation = messages[i].getElementsByTagName("reason")[0].childNodes[0].nodeValue
                            outIdCommendation = messages[i].getElementsByTagName("idCommendation")[0].childNodes[0].nodeValue
                            
                            
                            table += "<tr><td>" + outNameCommendation + "</td>"
                            table += "<td>" + positionServiceman + " " + rankServiceman + " " + nameServiceman + "</td>"
                            table += "<td>" + outNamePosition + " " + outNameRank + " " + outNameChief + "</td>"
                            table += "<td>" + outReasonCommendation + "</td>"
                            table += "<td>" + outDateCommendation + "</td>"
                            table += '<td class="actionButtons">'
                            table += '<input type="hidden" name="idCommendation" value="'+ outIdCommendation +'">'
                            
                            table += '<div id="rowId"></div></td></tr>'
                        }  
                    }
                    for (i = 0; i < messagesP.length; i++) { 
                        if(documentServiceman == messagesP[i].getElementsByTagName("documentServiceman")[0].childNodes[0].nodeValue){
                            outNamePunishment = 'None'
                            outNameRank = 'None'
                            outNamePosition = 'None'
                            outNameChief = 'None'
                            outDatePunishment = 'None'
                            outReasonPunishment = 'None'
                            outActuality = 'None'
                            outIdPunishment = 'None'
                            
                            outNamePunishment = messagesP[i].getElementsByTagName("namePunishment")[0].childNodes[0].nodeValue
                            outNameRank = messagesP[i].getElementsByTagName("nameRank")[0].childNodes[0].nodeValue
                            outNamePosition = messagesP[i].getElementsByTagName("namePosition")[0].childNodes[0].nodeValue
                            outNameChief = messagesP[i].getElementsByTagName("nameChief")[0].childNodes[0].nodeValue
                            outDatePunishment = messagesP[i].getElementsByTagName("date")[0].childNodes[0].nodeValue
                            outReasonPunishment = messagesP[i].getElementsByTagName("reason")[0].childNodes[0].nodeValue
                            outActuality = messagesP[i].getElementsByTagName("actuality")[0].childNodes[0].nodeValue
                            outIdPunishment = messagesP[i].getElementsByTagName("idPunishment")[0].childNodes[0].nodeValue

                            if(outActuality == '1'){
                                numberList += 1
                            }
                            if(outActuality == '1')
                                outActuality = 'Действует'
                            else
                                outActuality = 'Снято'
                            table += "<tr><td>" + outNamePunishment + "</td>"
                            table += "<td>" + positionServiceman + " " + rankServiceman + " " + nameServiceman + "</td>"
                            table += "<td>" + outNamePosition + " " + outNameRank + " " + outNameChief + "</td>"
                            table += "<td>" + outReasonPunishment + "</td>"
                            table += "<td>" + outDatePunishment + "<br>" + outActuality + "</td>"
                            table += '<td class="actionButtons">'
                            table += '<input type="hidden" name="idPunishment" value="'+ outIdPunishment +'">'
                            table += '<div id="rowId"></div></td></tr>'
                        }  
                    }
                    table +="</table>"
                    document.getElementById("table").innerHTML = table

                    switchButton = '<input type="button" class="button" id="buttonUpdate" onclick="startAjax(); defaultListServiceman();" value="Назад">'
                    switchButton += '<input type="button" class="button" value="Обновить" id="buttonUpdate" onclick="List(\''+ documentServiceman +'\', \''+ nameServiceman +'\', \''+ rankServiceman +'\', \''+ positionServiceman +'\');">'
                    switchButton += '<b class="textSumm"> количество действующих взысканий: '+ numberList +' </b>'
                    document.getElementById("switchTable").innerHTML = switchButton
                    			
                }
                else if(request.status==404) {
                    alert("Ошибка: запрашиваемый скрипт не найден!");
                    }
                    else alert("Ошибка: сервер вернул статус: " + request.status);
                break
            }
        }		
    } 
    request.open ('POST', 'listTable.php', true); 
    request.send (null); 
}

function defaultListServiceman(){
    var input = ""
    document.getElementById("temporary").innerHTML = input;
}

function defaultListUser(){
    var input = ""
    document.getElementById("temporary").innerHTML = input;
}

function defaultListCP(serviceman, nameServiceman, rankServiceman, positionServiceman){
    var input = ""
    input += '<input type="button" class="button" onclick="Graph(\''+ serviceman +'\', \''+ nameServiceman +'\', \''+ rankServiceman +'\', \''+ positionServiceman +'\'); defaultSpace();" value="Построить график">'
    document.getElementById("temporary").innerHTML = input;
}

function defaultSpace(){
    var input = ""
    document.getElementById("temporary").innerHTML = input;
}
function Graph(serviceman, outName, outRank, outPosition)
{		
    var request;
	if(window.XMLHttpRequest){ 
		request = new XMLHttpRequest(); 
	} else if(window.ActiveXObject){ 
		request = new ActiveXObject("Microsoft.XMLHTTP");   
	}  else { 
		return; 
	}
    COMMENDATIONS = 0;
    PUNISHMENTS = 0; 
	request.overrideMimeType("text/xml");  	    	  
    
    request.onreadystatechange = function(){
        if (request.readyState==4){		
            if (request.status==200){		 
                var xmlDoc = request.responseXML;							
                var comm = xmlDoc.getElementsByTagName("commendationData");
                var pun = xmlDoc.getElementsByTagName("punishmentData");
                for(i = 0; i < comm.length; i++){
                    if(comm[i].getElementsByTagName("documentServiceman")[0].childNodes[0].nodeValue == serviceman){
                        COMMENDATIONS++;    
                    }
                }
                for(i = 0; i < pun.length; i++){
                    if(pun[i].getElementsByTagName("documentServiceman")[0].childNodes[0].nodeValue == serviceman){
                        PUNISHMENTS++;    
                    }
                }
            }	
        }
    } 	
    request.open("GET","listTable.php",false);
    request.send();

    const chartData = [
    {
        "label": "Поощрения",
        "value": COMMENDATIONS
    },
    {
        "label": "Наказания",
        "value": PUNISHMENTS
    },
    ];

 
    const chartConfig = {
    type: 'pie2d',
    renderAt: 'chart-container',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
        "chart": {
            "caption": "Соотношение поощрений/взысканий военнослужащего",
            "theme": "fusion",
            },
        "data": chartData
        }
    };
    FusionCharts.ready(function(){
    var fusioncharts = new FusionCharts(chartConfig);
    fusioncharts.render();
    });

    table = '<div id="chart-container" class="graph"></div>'
    document.getElementById("table").innerHTML = table
                    
    switchButton = '<input type="button" class="button" id="buttonUpdate" onclick="List(\''+ serviceman +'\', \''+ outName +'\', \''+ outRank +'\', \''+ outPosition +'\'); defaultListCP(\''+ serviceman +'\', \''+ outName +'\', \''+ outRank +'\', \''+ outPosition +'\');" value="Назад">'
    document.getElementById("switchTable").innerHTML = switchButton
}
