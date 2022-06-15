function startAjax() {
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	request.overrideMimeType("text/xml");
	request.onreadystatechange = function () {
		switch (request.readyState) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4: {
				if (request.status == 200) {
					var xmlDoc = request.responseXML;
					var table =
						"<table class='table' id='bookTable'><tr class=tr1><th>Наименование плана</th><th>Подразделение</th><th>Временной промежуток</th><th></th></tr>";
					var messages = xmlDoc.getElementsByTagName("planMainTableData");
					numberPlans = messages.length;
					for (i = 0; i < messages.length; i++) {
						outIdPlan = "None";
						outTitlePlan = "None";
						outTitleTimeInterval = "None";
						outTitleDivision = "None";

						outIdPlan = messages[i].getElementsByTagName("idPlan")[0]
							.childNodes[0].nodeValue;
						nameFilePattern = messages[i].getElementsByTagName("nameFilePattern")[0]
							.childNodes[0].nodeValue;
						outIdTypePlan = messages[i].getElementsByTagName("idTypePlan")[0]
							.childNodes[0].nodeValue;
						outTitlePlan = messages[i].getElementsByTagName("titlePlan")[0]
							.childNodes[0].nodeValue;
						outTitleTimeInterval = messages[i].getElementsByTagName(
							"titleTimeInterval"
						)[0].childNodes[0].nodeValue;
						outTitleDivision = messages[i].getElementsByTagName(
							"titleDivision"
						)[0].childNodes[0].nodeValue;

						table += "<tr class=tr1><td>" + outTitlePlan + "</td>";
						table += "<td>" + outTitleDivision + "</td>";
						table += "<td>" + outTitleTimeInterval + "</td>";
						table +=
							'<input type="hidden" name="idPlan" value="' + outIdPlan + '">';

						table += '<td class="actionButtons"><a href="http://' + document.domain + '/!deepLom/newDocx/' + outIdPlan + nameFilePattern + '" download="downloadFile.docx"><button type="button" class="buttonTable">Скачать</button></a>';
						//table += '<input type="button" value="удалить" class="buttonTable" onclick="deleteServiceman(\'' + outDocument + '\'); startAjax();">'
						//table += '<input type="button" value="изменить" class="buttonTable" onclick="changeServiceman(\'' + outDocument + '\', \'' + outName + '\', \'' + outRank + '\', \'' + outPosition + '\');">'
						table += "</td></tr>";
					}
					table += "</table>";
					table += '<div id="rowId"></div>';
					document.getElementById("table").innerHTML = table;
					document.getElementById('switchTable').innerHTML = '';
					/*
							  switchButton = '<input type="button" class="button" id="buttonRetable" onclick="startUserTable(); defaultListUser();" value="Показать таблицу пользователей">'
							  switchButton += '<input type="button" class="button" id="buttonUpdate" onclick="startAjax();" value="Обновить">'
							  switchButton += '<b class="textSumm"> военнослужащих на кафедре: ' + numberServicemans + ' </b>'
							  document.getElementById("switchTable").innerHTML = switchButton
							  */
				} else if (request.status == 404) {
					alert("Ошибка: запрашиваемый скрипт не найден!");
				} else alert("Ошибка: сервер вернул статус: " + request.status);
				break;
			}
		}
	};
	request.open("POST", "planMainTable.php", true);
	request.send(null);
}

function newServicemanForPlan() {
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	request.overrideMimeType("text/xml");
	request.onreadystatechange = function () {
		switch (request.readyState) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4: {
				if (request.status == 200) {
					var xmlDoc = request.responseXML;
					var messages = xmlDoc.getElementsByTagName("rankData");
					var messPosition = xmlDoc.getElementsByTagName("positionData");
					var messDivision = xmlDoc.getElementsByTagName("divisionData");

					var input = "<form id='formTemp'>";
					input +=
						'<div id="divInputDocument"> <input type="text" id="inputDocument" name="document" class="input" placeholder="Серия и номер д-та"></div><br>';
					input +=
						'<div id="divInputFirstName"><input type="text" id="inputFirstName" name="firstName" class="input" placeholder="Фамилия"></div><br>';
					input +=
						'<div id="divInputSecondName"><input type="text" id="inputSecondName" name="secondName" class="input" placeholder="Имя"></div><br>';
					input +=
						'<div id="divInputMiddleName"><input type="text" id="inputMiddleName" name="middleName" class="input" placeholder="Отчество"></div><br>';

					input += '<b class="lable"> Звание </b> <br>';
					input += '<select name="rankServiceman" class="select">';
					input += "<option disabled>Выберите звание</option>";
					for (i = 0; i < messages.length; i++) {
						input +=
							"<option value=" +
							messages[i].getElementsByTagName("idRank")[0].childNodes[0]
								.nodeValue +
							">" +
							messages[i].getElementsByTagName("titleMilitaryRank")[0].childNodes[0]
								.nodeValue +
							"</option>";
					}
					input += "</select><br>";

					input += '<b class="lable"> Должность </b> <br>';
					input += '<select name="positionServiceman" class="select">';
					input += "<option disabled>Выберите должность</option>";
					for (i = 0; i < messPosition.length; i++) {
						input +=
							"<option value=" +
							messPosition[i].getElementsByTagName("idPosition")[0]
								.childNodes[0].nodeValue +
							">" +
							messPosition[i].getElementsByTagName("titlePosition")[0]
								.childNodes[0].nodeValue +
							"</option>";
					}
					input += "</select><br>";

					input += '<b class="lable"> Подразделение </b> <br>';
					input += '<select name="divisionServiceman" class="select">';
					input += "<option disabled>Выберите подразделение</option>";
					for (i = 0; i < messDivision.length; i++) {
						input +=
							"<option value=" +
							messDivision[i].getElementsByTagName("idDivision")[0]
								.childNodes[0].nodeValue +
							">" +
							messDivision[i].getElementsByTagName("titleDivision")[0]
								.childNodes[0].nodeValue +
							"</option>";
					}
					input += "</select><br>";

					input +=
						'<input type="button" class="button" value="Добавить" onclick="checkServiceman();"><br>';
					input += '<input type=button value=Назад class="button" onclick="defaultButtonsForPlan();">';
					input += '</form>';
					document.getElementById("temporary").innerHTML = input;
				} else if (request.status == 404) {
					alert("Ошибка: запрашиваемый скрипт не найден!");
				} else alert("Ошибка: сервер вернул статус: " + request.status);
				break;
			}
		}
	};
	request.open("GET", "rankPositionXML.php", true);
	request.send(null);
}

function newServiceman() {
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	request.overrideMimeType("text/xml");
	request.onreadystatechange = function () {
		switch (request.readyState) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4: {
				if (request.status == 200) {
					var xmlDoc = request.responseXML;
					var messages = xmlDoc.getElementsByTagName("rankData");
					var messPosition = xmlDoc.getElementsByTagName("positionData");
					var messDivision = xmlDoc.getElementsByTagName("divisionData");

					var input = "<form id='formTemp'>";
					input +=
						'<div id="divInputDocument"> <input type="text" id="inputDocument" name="document" class="input" placeholder="Серия и номер д-та"></div><br>';
					input +=
						'<div id="divInputFirstName"><input type="text" id="inputSecondName" name="secondName" class="input" placeholder="Фамилия"></div><br>';
					input +=
						'<div id="divInputSecondName"><input type="text" id="inputFirstName" name="firstName" class="input" placeholder="Имя"></div><br>';
					input +=
						'<div id="divInputMiddleName"><input type="text" id="inputMiddleName" name="middleName" class="input" placeholder="Отчество"></div><br>';

					input += '<b class="lable"> Звание </b> <br>';
					input += '<select name="rankServiceman" class="select">';
					input += "<option disabled>Выберите звание</option>";
					for (i = 0; i < messages.length; i++) {
						input +=
							"<option value=" +
							messages[i].getElementsByTagName("idRank")[0].childNodes[0]
								.nodeValue +
							">" +
							messages[i].getElementsByTagName("titleMilitaryRank")[0].childNodes[0]
								.nodeValue +
							"</option>";
					}
					input += "</select><br>";

					input += '<b class="lable"> Должность </b> <br>';
					input += '<select name="positionServiceman" class="select">';
					input += "<option disabled>Выберите должность</option>";
					for (i = 0; i < messPosition.length; i++) {
						input +=
							"<option value=" +
							messPosition[i].getElementsByTagName("idPosition")[0]
								.childNodes[0].nodeValue +
							">" +
							messPosition[i].getElementsByTagName("titlePosition")[0]
								.childNodes[0].nodeValue +
							"</option>";
					}
					input += "</select><br>";

					input += '<b class="lable"> Подразделение </b> <br>';
					input += '<select name="divisionServiceman" class="select">';
					input += "<option disabled>Выберите подразделение</option>";
					for (i = 0; i < messDivision.length; i++) {
						input +=
							"<option value=" +
							messDivision[i].getElementsByTagName("idDivision")[0]
								.childNodes[0].nodeValue +
							">" +
							messDivision[i].getElementsByTagName("titleDivision")[0]
								.childNodes[0].nodeValue +
							"</option>";
					}
					input += "</select><br>";

					input +=
						'<input type="button" class="button" value="Добавить" onclick="checkServiceman();"><br>';
					input += '<input type=button value=Назад class="button" onclick="defaultButtons();">';
					input += '</form>';
					document.getElementById("temporary").innerHTML = input;
				} else if (request.status == 404) {
					alert("Ошибка: запрашиваемый скрипт не найден!");
				} else alert("Ошибка: сервер вернул статус: " + request.status);
				break;
			}
		}
	};
	request.open("GET", "rankPositionXML.php", true);
	request.send(null);
}

function newPlan() {
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	request.overrideMimeType("text/xml");
	request.onreadystatechange = function () {
		switch (request.readyState) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4: {
				if (request.status == 200) {
					var xmlDoc = request.responseXML;
					var messagesPattern = xmlDoc.getElementsByTagName("typePlan");
					var messages = xmlDoc.getElementsByTagName("serviceman");
					var table =
						"<table class='table' id='bookTable'><tr class=tr1><th>Элемент документа</th><th>Выбрать/Вставить</th><th></th></tr>";
					table += '<tbody>'
					table += '<tr class=tr1><td> Шаблон документа </td>';
					table += '<td>';
					table += '<select name="pattern" id=patternId class="selectForPlan">';
					table += "<option disabled>Выберите шаблон</option>";
					for (i = 0; i < messagesPattern.length; i++) {
						table +=
							"<option value=" +
							messagesPattern[i].getElementsByTagName("idTypePlan")[0].childNodes[0]
								.nodeValue +
							">" +
							messagesPattern[i].getElementsByTagName("titleTypePlan")[0].childNodes[0]
								.nodeValue + ' ' +
							messagesPattern[i].getElementsByTagName("nameFilePattern")[0].childNodes[0]
								.nodeValue;
						"</option>";
					}
					table += "</select></td></tr>";


					table += '<tr class=tr1><td> Утверждающее лицо </td>';
					table += '<td>';
					table += '<select name="approver" class="selectForPlan">';
					table += "<option disabled>Выберите утв. лицо</option>";
					for (i = 0; i < messages.length; i++) {
						FN = messages[i].getElementsByTagName("firstNameServiceman")[0].childNodes[0]
							.nodeValue;
						MN = messages[i].getElementsByTagName("middleNameServiceman")[0].childNodes[0]
							.nodeValue
						table +=
							"<option value=" +
							messages[i].getElementsByTagName("idServiceman")[0].childNodes[0]
								.nodeValue +
							">" +
							messages[i].getElementsByTagName("titlePosition")[0].childNodes[0]
								.nodeValue + ' ' +
							messages[i].getElementsByTagName("titleMilitaryRank")[0].childNodes[0]
								.nodeValue + ' ' +
							messages[i].getElementsByTagName("secondNameServiceman")[0].childNodes[0]
								.nodeValue + ' ' + FN[0] + '. ' + MN[0] + '.'
						"</option>";
					}
					table += "</select></td></tr>";

					table += '<tr class=tr1><td> Составитель плана </td>';
					table += '<td>';
					table += '<select name="agreeder" class="selectForPlan">';
					table += "<option disabled>Выберите утв. лицо</option>";
					for (i = 0; i < messages.length; i++) {
						FN = messages[i].getElementsByTagName("firstNameServiceman")[0].childNodes[0]
							.nodeValue;
						MN = messages[i].getElementsByTagName("middleNameServiceman")[0].childNodes[0]
							.nodeValue
						table +=
							"<option value=" +
							messages[i].getElementsByTagName("idServiceman")[0].childNodes[0]
								.nodeValue +
							">" +
							messages[i].getElementsByTagName("titlePosition")[0].childNodes[0]
								.nodeValue + ' ' +
							messages[i].getElementsByTagName("titleMilitaryRank")[0].childNodes[0]
								.nodeValue + ' ' +
							messages[i].getElementsByTagName("secondNameServiceman")[0].childNodes[0]
								.nodeValue + ' ' + FN[0] + '. ' + MN[0] + '.'
						"</option>";
					}
					table += "</select></td></tr>";

					/*
					messagesPlan = xmlDoc.getElementsByTagName("plan");
					table += '<tr><td> Наименование плана </td>';
					table += '<td>';
					table += '<select name="plan" class="selectForPlan">';
					table += "<option disabled>Выберите наим. плана</option>";
					for (i = 0; i < messagesPlan.length; i++) {
						table +=
							"<option value=" +
							messagesPlan[i].getElementsByTagName("idPlan")[0].childNodes[0]
								.nodeValue +
							">" +
							messagesPlan[i].getElementsByTagName("titlePlan")[0].childNodes[0]
								.nodeValue + ' ' +
							messagesPlan[i].getElementsByTagName("numberPlan")[0].childNodes[0]
								.nodeValue +
							"</option>";
					}
					table += "</select></td></tr>";*/

					messagesDivision = xmlDoc.getElementsByTagName("division");
					messagesTimeInterval = xmlDoc.getElementsByTagName("timeInterval");
					messagesEvent = xmlDoc.getElementsByTagName("event");
					messagesGroupEvent = xmlDoc.getElementsByTagName("groupEvent");
					table += '<tr class=tr1><td> Наименование подразделения </td>';
					table += '<td>';
					table += '<select name="division" class="selectForPlan">';
					table += "<option disabled>Выберите подразделение</option>";
					for (i = 0; i < messagesDivision.length; i++) {
						table +=
							"<option value=" +
							messagesDivision[i].getElementsByTagName("idDivision")[0].childNodes[0]
								.nodeValue +
							">" +
							messagesDivision[i].getElementsByTagName("titleDivision")[0].childNodes[0]
								.nodeValue +
							"</option>";
					}
					table += "</select></td></tr>";

					table += '<tr class=tr1><td> Временной интервал </td>';
					table += '<td>';
					table += '<select name="timeInterval" class="selectForPlan">';
					table += "<option disabled>Выберите временной интервал</option>";
					for (i = 0; i < messagesTimeInterval.length; i++) {
						table +=
							"<option value=" +
							messagesTimeInterval[i].getElementsByTagName("idTimeInterval")[0].childNodes[0]
								.nodeValue +
							">" +
							messagesTimeInterval[i].getElementsByTagName("titleTimeInterval")[0].childNodes[0]
								.nodeValue +
							"</option>";
					}
					table += "</select></td></tr>";

					table += '<tr class=tr2><td colspan="2">';
					table += '<table id="tableGroupEvent"><tbody><tr><td class=td1> Группа мероприятий <br>'
					table += '<select name="groupEvent[1]" class="selectForPlan">';
					table += "<option disabled>Выберите группу мероприятий</option>";
					for (i = 0; i < messagesGroupEvent.length; i++) {
						table +=
							"<option value=" +
							messagesGroupEvent[i].getElementsByTagName("idGroupEvent")[0].childNodes[0]
								.nodeValue +
							">" +
							messagesGroupEvent[i].getElementsByTagName("titleGroupEvent")[0].childNodes[0]
								.nodeValue +
							"</option>";
					}
					table += '</select>'
					table += '</td>'
					table += '<td>'
					table += '<table id="tableEvent"><tbody><tr class=tr1><td>'
					eventTable = '';
					eventTable += ' Мероприятие <br> ';
					eventTable += '<select name="event[1][1]" class="selectForPlan">';
					eventTable += "<option disabled>Выберите мероприятие</option>";
					for (i = 0; i < messagesEvent.length; i++) {
						eventTable +=
							"<option value=" +
							messagesEvent[i].getElementsByTagName("idEvent")[0].childNodes[0]
								.nodeValue +
							">" +
							messagesEvent[i].getElementsByTagName("titleEvent")[0].childNodes[0]
								.nodeValue +
							"</option>";
					}
					eventTable += '</select><br>';

					var messagesServiceman = xmlDoc.getElementsByTagName("serviceman");
					eventTable += 'Исполнитель <br> ';
					eventTable += '<select name="executor[1][1]" class="selectForPlan">';
					eventTable += "<option disabled>Выберите исполнителя</option>";
					for (i = 0; i < messagesServiceman.length; i++) {
						FN = messagesServiceman[i].getElementsByTagName("firstNameServiceman")[0].childNodes[0]
							.nodeValue
						MN = messagesServiceman[i].getElementsByTagName("middleNameServiceman")[0].childNodes[0]
							.nodeValue
						eventTable +=
							"<option value=" +
							messagesServiceman[i].getElementsByTagName("idServiceman")[0].childNodes[0]
								.nodeValue +
							">" +
							messagesServiceman[i].getElementsByTagName("secondNameServiceman")[0].childNodes[0]
								.nodeValue + ' ' + FN[0] + '. ' + MN[0] + '.';
						"</option>";
					}
					eventTable += '</select><br>';

					var messagesServiceman = xmlDoc.getElementsByTagName("serviceman");
					eventTable += ' Соисполнитель <br> ';
					eventTable += '<select name="coExecutor[1][1]" class="selectForPlan">';
					eventTable += "<option disabled>Выберите соисполнителя</option>";
					for (i = 0; i < messagesServiceman.length; i++) {
						FN = messagesServiceman[i].getElementsByTagName("firstNameServiceman")[0].childNodes[0]
							.nodeValue;
						MN = messagesServiceman[i].getElementsByTagName("middleNameServiceman")[0].childNodes[0]
							.nodeValue;

						eventTable +=
							"<option value=" +
							messagesServiceman[i].getElementsByTagName("idServiceman")[0].childNodes[0]
								.nodeValue +
							">" +
							messagesServiceman[i].getElementsByTagName("secondNameServiceman")[0].childNodes[0]
								.nodeValue + ' ' + FN[0] + '. ' + MN[0] + '.';
						"</option>";
					}
					eventTable += '</select><br>';

					eventTable += ' Срок выполнения <br> ';
					eventTable += '<input type="date" name="deadLineEvent[1][1]" class="selectForPlan">';
					eventTable += '<br>';

					table += eventTable;
					table += '</td><input type=hidden value=1 id=countEvent name=countEvent></td></tr></tbody></table>';
					forButton = 'tableEvent';
					table += '<input type="button" value="Добавить" class="buttonTable" onclick="addEventTable(\'' + forButton + '\'); newEventTable();">';
					table += '</td></tr></tbody></table>';
					table += '<br><input type="button" onclick="addGroupEvent(); newGroupEventTable();" id="longButton" value="Добавить группу мероприятий">';
					table += '<input type=hidden value=1 id=countGroupEvent name=countGroupEvent>';
					table += "</td></tr>";

					table += '</tbody>';
					table += "</table>";
					table += '<div id="rowId"></div>';
					table += '<div id="rowId"></div>';
					document.getElementById("table").innerHTML = table;
					button = '<input type=button value="Создать" class="button" onclick="sendDataPlan(); createDownloadButton();">';
					button += '<input type=button value="Выбрать вышестоящий план" class="button" onclick="createSelectUpperPlan();">';
					document.getElementById("switchTable").innerHTML = button;

				} else if (request.status == 404) {
					alert("Ошибка: запрашиваемый скрипт не найден!");
				} else alert("Ошибка: сервер вернул статус: " + request.status);
				break;
			}
		}
	};
	request.open("POST", "createPlanXML.php", true);
	request.send(null);
}

function addGroupEvent() {
	var tbody = document.getElementById("tableGroupEvent").getElementsByTagName("tbody")[0];
	var row = document.createElement("tr")
	row.setAttribute('class', 'tr2')
	var td1 = document.createElement("td")
	td1.setAttribute('class', 'td1');
	temp1 = document.createElement('div');
	temp1.setAttribute('id', 'groupEventPlace1');
	temp2 = document.createElement('div');
	temp2.setAttribute('id', 'groupEventPlace2');
	td1.appendChild(temp1)
	var td2 = document.createElement("td")
	td2.appendChild(temp2)
	row.appendChild(td1);
	row.appendChild(td2);
	tbody.appendChild(row);
}

function addEventTable(id) {
	var tbody = document.getElementById(id).getElementsByTagName("tbody")[0];
	var row = document.createElement("tr")
	row.setAttribute('class', 'tr1');
	var td1 = document.createElement("td")
	temp = document.createElement('div');
	temp.setAttribute('id', 'newEventPlace');
	td1.appendChild(temp);
	row.appendChild(td1);
	tbody.appendChild(row);
}

function newEventTable() {
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	request.overrideMimeType("text/xml");
	request.onreadystatechange = function () {
		switch (request.readyState) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4: {
				if (request.status == 200) {
					var xmlDoc = request.responseXML;
					var messagesEvent = xmlDoc.getElementsByTagName("event");
					var countEvent = parseInt(document.getElementById("countEvent").value, 10);
					var countGroupEvent = parseInt(document.getElementById("countGroupEvent").value, 10);
					countEvent += 1;
					document.getElementById("countEvent").value = countEvent;
					eventTable = '';
					eventTable += ' Мероприятие <br> ';
					eventTable += '<select name="event[' + countGroupEvent + '][' + countEvent + ']" class="selectForPlan">';
					eventTable += "<option disabled>Выберите мероприятие</option>";
					for (i = 0; i < messagesEvent.length; i++) {
						eventTable +=
							"<option value=" +
							messagesEvent[i].getElementsByTagName("idEvent")[0].childNodes[0]
								.nodeValue +
							">" +
							messagesEvent[i].getElementsByTagName("titleEvent")[0].childNodes[0]
								.nodeValue +
							"</option>";
					}
					eventTable += '</select><br>';

					var messagesServiceman = xmlDoc.getElementsByTagName("serviceman");
					eventTable += 'Исполнитель <br> ';
					eventTable += '<select name="executor[' + countGroupEvent + '][' + countEvent + ']" class="selectForPlan">';
					eventTable += "<option disabled>Выберите исполнителя</option>";
					for (i = 0; i < messagesServiceman.length; i++) {
						FN = messagesServiceman[i].getElementsByTagName("firstNameServiceman")[0].childNodes[0]
							.nodeValue
						MN = messagesServiceman[i].getElementsByTagName("middleNameServiceman")[0].childNodes[0]
							.nodeValue
						eventTable +=
							"<option value=" +
							messagesServiceman[i].getElementsByTagName("idServiceman")[0].childNodes[0]
								.nodeValue +
							">" +
							messagesServiceman[i].getElementsByTagName("secondNameServiceman")[0].childNodes[0]
								.nodeValue + ' ' + FN[0] + '. ' + MN[0] + '.';
						"</option>";
					}
					eventTable += '</select><br>';

					var messagesServiceman = xmlDoc.getElementsByTagName("serviceman");
					eventTable += ' Соисполнитель <br> ';
					eventTable += '<select name="coExecutor[' + countGroupEvent + '][' + countEvent + ']" class="selectForPlan">';
					eventTable += "<option disabled>Выберите соисполнителя</option>";
					for (i = 0; i < messagesServiceman.length; i++) {
						FN = messagesServiceman[i].getElementsByTagName("firstNameServiceman")[0].childNodes[0]
							.nodeValue;
						MN = messagesServiceman[i].getElementsByTagName("middleNameServiceman")[0].childNodes[0]
							.nodeValue;

						eventTable +=
							"<option value=" +
							messagesServiceman[i].getElementsByTagName("idServiceman")[0].childNodes[0]
								.nodeValue +
							">" +
							messagesServiceman[i].getElementsByTagName("secondNameServiceman")[0].childNodes[0]
								.nodeValue + ' ' + FN[0] + '. ' + MN[0] + '.';
						"</option>";
					}
					eventTable += '</select><br>';

					eventTable += ' Срок выполнения <br> ';
					eventTable += '<input type="date" name="deadLineEvent[' + countGroupEvent + '][' + countEvent + ']" class="selectForPlan">';
					eventTable += '<br>';

					rand = Math.random();
					document.getElementById("newEventPlace").id = rand;
					document.getElementById(rand).innerHTML = eventTable;
				} else if (request.status == 404) {
					alert("Ошибка: запрашиваемый скрипт не найден!");
				} else alert("Ошибка: сервер вернул статус: " + request.status);
				break;
			}
		}
	};
	request.open("POST", "createPlanXML.php", true);
	request.send(null);

}

function newGroupEventTable() {
	/////////////////////////////
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	request.overrideMimeType("text/xml");
	request.onreadystatechange = function () {
		switch (request.readyState) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4: {
				if (request.status == 200) {
					var xmlDoc = request.responseXML;
					var messagesGroupEvent = xmlDoc.getElementsByTagName("groupEvent");
					var countGroupEvent = parseInt(document.getElementById("countGroupEvent").value, 10);
					document.getElementById("countEvent").value = 1;
					countGroupEvent += 1;
					document.getElementById("countGroupEvent").value = countGroupEvent;
					eventGroupTable = '';
					eventGroupTable += ' Группа мероприятий <br> ';
					eventGroupTable += '<select name="groupEvent[' + countGroupEvent + ']" class="selectForPlan">';
					eventGroupTable += "<option disabled>Выберите группу мероприятий</option>";
					for (i = 0; i < messagesGroupEvent.length; i++) {
						eventGroupTable +=
							"<option value=" +
							messagesGroupEvent[i].getElementsByTagName("idGroupEvent")[0].childNodes[0]
								.nodeValue +
							">" +
							messagesGroupEvent[i].getElementsByTagName("titleGroupEvent")[0].childNodes[0]
								.nodeValue +
							"</option>";
					}
					eventGroupTable += '</select><br>';
					rand = Math.random();
					document.getElementById("groupEventPlace1").id = rand;
					document.getElementById(rand).innerHTML = eventGroupTable;

					var messagesEvent = xmlDoc.getElementsByTagName("event");
					eventTable = '';
					eventTable += '<table id="tableEvent' + rand + '"><tbody><tr class=tr1><td>'
					eventTable += ' Мероприятие <br> ';
					eventTable += '<select name="event[' + countGroupEvent + '][1]" class="selectForPlan">';
					eventTable += "<option disabled>Выберите мероприятие</option>";
					for (i = 0; i < messagesEvent.length; i++) {
						eventTable +=
							"<option value=" +
							messagesEvent[i].getElementsByTagName("idEvent")[0].childNodes[0]
								.nodeValue +
							">" +
							messagesEvent[i].getElementsByTagName("titleEvent")[0].childNodes[0]
								.nodeValue +
							"</option>";
					}
					eventTable += '</select><br>';

					var messagesServiceman = xmlDoc.getElementsByTagName("serviceman");
					eventTable += ' Исполнитель <br> ';
					eventTable += '<select name="executor[' + countGroupEvent + '][1]" class="selectForPlan">';
					eventTable += "<option disabled>Выберите исполнителя</option>";
					for (i = 0; i < messagesServiceman.length; i++) {
						FN = messagesServiceman[i].getElementsByTagName("firstNameServiceman")[0].childNodes[0]
							.nodeValue;
						MN = messagesServiceman[i].getElementsByTagName("middleNameServiceman")[0].childNodes[0]
							.nodeValue;

						eventTable +=
							"<option value=" +
							messagesServiceman[i].getElementsByTagName("idServiceman")[0].childNodes[0]
								.nodeValue +
							">" +
							messagesServiceman[i].getElementsByTagName("secondNameServiceman")[0].childNodes[0]
								.nodeValue + ' ' + FN[0] + '. ' + MN[0] + '.';
						"</option>";
					}
					eventTable += '</select><br>';

					var messagesServiceman = xmlDoc.getElementsByTagName("serviceman");
					eventTable += ' Соисполнитель <br> ';
					eventTable += '<select name="coExecutor[' + countGroupEvent + '][1]" class="selectForPlan">';
					eventTable += "<option disabled>Выберите соисполнителя</option>";
					for (i = 0; i < messagesServiceman.length; i++) {
						FN = messagesServiceman[i].getElementsByTagName("firstNameServiceman")[0].childNodes[0]
							.nodeValue;
						MN = messagesServiceman[i].getElementsByTagName("middleNameServiceman")[0].childNodes[0]
							.nodeValue;

						eventTable +=
							"<option value=" +
							messagesServiceman[i].getElementsByTagName("idServiceman")[0].childNodes[0]
								.nodeValue +
							">" +
							messagesServiceman[i].getElementsByTagName("secondNameServiceman")[0].childNodes[0]
								.nodeValue + ' ' + FN[0] + '. ' + MN[0] + '.';
						"</option>";
					}
					eventTable += '</select><br>';

					eventTable += ' Срок выполнения <br> ';
					eventTable += '<input type="date" name="deadLineEvent[' + countGroupEvent + '][1]" class="selectForPlan">';
					eventTable += '<br>';

					eventTable += '</td></tr></tbody></table>';
					forButton = 'tableEvent' + rand;
					eventTable += '<input type="button" value="Добавить" class="buttonTable" onclick="addEventTable(\'' + forButton + '\'); newEventTable();">';

					rand = Math.random();
					document.getElementById("groupEventPlace2").id = rand;
					document.getElementById(rand).innerHTML = eventTable;



				} else if (request.status == 404) {
					alert("Ошибка: запрашиваемый скрипт не найден!");
				} else alert("Ошибка: сервер вернул статус: " + request.status);
				break;
			}
		}
	};
	request.open("POST", "createPlanXML.php", true);
	request.send(null);

}

function newEvent() {

	var input = "<form id=eventForm>";
	input += '<b class="lable">Добавить мероприятие</b><br>';
	input +=
		'<input type="text" id="inputTitleEvent" name="titleEvent" class="input" placeholder="Наименование"><br>';
	input +=
		'<input type="text" id="inputCommentEvent" name="commentEvent" class="input" placeholder="Комментарий"><br>';
	input +=
		'<input type="button" class="button" value="Добавить" onclick="checkEvent();"><br>';
	input += '<input type=button value=Назад class="button" onclick="defaultButtons();">';
	input += '</form>';
	document.getElementById("temporary").innerHTML = input;

}

function newEventForTable() {

	var input = "<form id=eventForm>";
	input += '<b class="lable">Добавить мероприятие</b><br>';
	input +=
		'<input type="text" id="inputTitleEvent" name="titleEvent" class="input" placeholder="Наименование"><br>';
	input +=
		'<input type="text" id="inputCommentEvent" name="commentEvent" class="input" placeholder="Комментарий"><br>';
	input +=
		'<input type="button" class="button" value="Добавить" onclick="checkEvent();"><br>';
	input += '<input type=button value=Назад class="button" onclick="defaultButtonsForTable();">';
	input += '</form>';
	document.getElementById("temporary").innerHTML = input;

}

function newDivision() {

	var input = "<form id=eventForm>";
	input += '<b class="lable">Добавить подразделение</b><br>';
	input +=
		'<input type="text" id="inputTitleDivision" name="titleDivision" class="input" placeholder="Наим. подразделения"><br>';
	input +=
		'<input type="button" class="button" value="Добавить" onclick="checkDivision();"><br>';
	input += '<input type=button value=Назад class="button" onclick="defaultButtons();">';
	input += '</form>';
	document.getElementById("temporary").innerHTML = input;

}

function newDivisionForPlan() {

	var input = "<form id=eventForm>";
	input += '<b class="lable">Добавить подразделение</b><br>';
	input +=
		'<input type="text" id="inputTitleDivision" name="titleDivision" class="input" placeholder="Наим. подразделения"><br>';
	input +=
		'<input type="button" class="button" value="Добавить" onclick="checkDivision();"><br>';
	input += '<input type=button value=Назад class="button" onclick="defaultButtonsForPlan();">';
	input += '</form>';
	document.getElementById("temporary").innerHTML = input;

}

function watchPlan($file) {

	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}

	document.getElementById('rowId').name = 'file';
	document.getElementById('rowId').innerHTML = $file;
	var myForm = document.getElementById("formTable");
	var elems = myForm.elements;
	var params = "";

	for (var i = 0; i < elems.length; i++) {
		if (params != "") params += "&";
		params += elems[i].name + "=" + encodeURIComponent(elems[i].value);
	}
	request.overrideMimeType("text/xml");
	request.onreadystatechange = function () {
		switch (request.readyState) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4: {
				if (request.status == 200) {
					$useless = 1;
				} else if (request.status == 404) {
					alert("Ошибка: запрашиваемый скрипт не найден!");
				} else alert("Ошибка: сервер вернул статус: " + request.status);
				break;
			}
		}
	};
	request.open("POST", ".php", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(params);

}

function newEventForPlan() {

	var input = "<form id=eventForm>";
	input += '<b class="lable">Добавить мероприятие</b><br>';
	input +=
		'<input type="text" id="inputTitleEvent" name="titleEvent" class="input" placeholder="Наименование"><br>';
	input +=
		'<input type="text" id="inputCommentEvent" name="commentEvent" class="input" placeholder="Комментарий"><br>';
	input +=
		'<input type="button" class="button" value="Добавить" onclick="checkEvent();"><br>';
	input += '<input type=button value=Назад class="button" onclick="defaultButtonsForPlan();">';
	input += '</form>';
	document.getElementById("temporary").innerHTML = input;

}

function newGroupEvent() {

	var input = "<form id=eventForm>";
	input += '<b class="lable">Добавить группу мероприятий</b><br>';
	input +=
		'<input type="text" id="inputTitleGroupEvent" name="titleGroupEvent" class="input" placeholder="Наименование"><br>';
	input +=
		'<input type="button" class="button" value="Добавить" onclick="checkGroupEvent();"><br>';
	input += '<input type=button value=Назад class="button" onclick="defaultButtons();">';
	input += '</form>';
	document.getElementById("temporary").innerHTML = input;

}

function newGroupEventForPlan() {

	var input = "<form id=eventForm>";
	input += '<b class="lable">Добавить группу мероприятий</b><br>';
	input +=
		'<input type="text" id="inputTitleGroupEvent" name="titleGroupEvent" class="input" placeholder="Наименование"><br>';
	input +=
		'<input type="button" class="button" value="Добавить" onclick="checkGroupEvent();"><br>';
	input += '<input type=button value=Назад class="button" onclick="defaultButtonsForPlan();">';
	input += '</form>';
	document.getElementById("temporary").innerHTML = input;

}

function newTimeInterval() {

	var input = "<form id=eventForm>";
	input += '<b class="lable">Добавить временной интервал</b><br>';
	input +=
		'<input type="text" id="inputTimeInterval" name="titleTimeInterval" class="input" placeholder="Наименование"><br>';
	input += '<b class="lable">Начало</b><br>';
	input +=
		'<input type="date" id="InputBeginTimeInterval" name="beginTimeInterval" class="input"><br>';
	input += '<b class="lable">Конец</b><br>';
	input +=
		'<input type="date" id="InputEndTimeInterval" name="endTimeInterval" class="input"><br>';
	input +=
		'<input type="button" class="button" value="Добавить" onclick="checkTimeInterval();"><br>';
	input += '<input type=button value=Назад class="button" onclick="defaultButtons();">';
	input += '</form>';
	document.getElementById("temporary").innerHTML = input;

}

function newTimeIntervalForPlan() {

	var input = "<form id=eventForm>";
	input += '<b class="lable">Добавить временной интервал</b><br>';
	input +=
		'<input type="text" id="inputTimeInterval" name="titleTimeInterval" class="input" placeholder="Наименование"><br>';
	input += '<b class="lable">Начало</b><br>';
	input +=
		'<input type="date" id="InputBeginTimeInterval" name="beginTimeInterval" class="input"><br>';
	input += '<b class="lable">Конец</b><br>';
	input +=
		'<input type="date" id="InputEndTimeInterval" name="endTimeInterval" class="input"><br>';
	input +=
		'<input type="button" class="button" value="Добавить" onclick="checkTimeInterval();"><br>';
	input += '<input type=button value=Назад class="button" onclick="defaultButtonsForPlan();">';
	input += '</form>';
	document.getElementById("temporary").innerHTML = input;

}

function uploadPlan() {

	var input = "";
	input += '<form name="test" id="blockedUpload" method="post" action="parser.php" enctype=multipart/form-data>';
	input += '<input type=file name=uploadfile accept=".docx" class="button" onchange="enabledUpload();"><br>';
	input += '<div id="uploadButton"><input type=submit disabled name="blockButton" value=Просмотреть class="button"></div></form>';
	input += '<input type=button value=Назад class="button" onclick="defaultButtons();">';
	//input += '<input type="button" class="button" value="Отмена" onclick="defaultList();">';
	document.getElementById("temporary").innerHTML = input;
}

function newTypePlan() {

	var input = "";
	input += '<form name="test" id="dataPattern" method="post" action="patternParser.php" enctype=multipart/form-data>';
	input += '<input type=text name=titleTypePlan placeholder="Вид плана" class="input" id="titleTypePlan"><br>';
	input += '<br><b class=lable>Шаблон документа</b><br>'
	input += '<input type=file name=uploadfile accept=".docx" class="button" onchange="enabledUploadPattern();"><br>';
	input += '<div id="uploadButton"><input type=submit disabled name="blockButton" value=Загрузить class="button"></div></form>';
	input += '<input type=button value=Назад class="button" onclick="defaultButtons();">';
	document.getElementById("temporary").innerHTML = input;
}

function newTypePlanForPlan() {

	var input = "";
	input += '<form name="test" id="dataPattern" method="post" action="patternParser.php" enctype=multipart/form-data>';
	input += '<input type=text name=titleTypePlan placeholder="Вид плана" class="input" id="titleTypePlan"><br>';
	input += '<br><b class=lable>Шаблон документа</b><br>'
	input += '<input type=file name=uploadfile accept=".docx" class="button" onchange="enabledUploadPattern();"><br>';
	input += '<div id="uploadButton"><input type=submit disabled name="blockButton" value=Загрузить class="button"></div></form>';
	input += '<input type=button value=Назад class="button" onclick="defaultButtonsForPlan();">';
	document.getElementById("temporary").innerHTML = input;
}

function enabledUpload() {

	var input = '';
	input += '<input type=submit name="blockButton" value=Просмотреть class="button">';
	document.getElementById("uploadButton").innerHTML = input;
}

function enabledUploadPattern() {

	var input = '';
	input += '<input type=submit name="blockButton" value=Загрузить class="button">';
	document.getElementById("uploadButton").innerHTML = input;
}

function defaultButtons() {
	var input = "<form id='formTemp'>";

	input +=
		'<input type="button" class="button" onclick="newServiceman();" value="Добавить сотрудника"><br>';
	input +=
		'<input type="button" class="button" onclick="newDivision();" value="Добавить подразделение"><br>';
	input +=
		'<input type="button" class="button" onclick="newEvent();" value="Добавить мероприятие"><br>';
	input +=
		'<input type="button" class="button" onclick="newGroupEvent();" value="Добавить гр. мероприятий"><br>';
	input +=
		'<input type="button" class="button" onclick="newPlan(); defaultButtonsForPlan();" value="Создать планир. документ"><br>';
	input +=
		'<input type="button" class="button" onclick="uploadPlan();" value="Просмотреть docx"><br>';
	input +=
		'<input type="button" class="button" onclick="newTypePlan();" value="Добавить вид плана"><br>';
	input +=
		'<input type="button" class="button" onclick="newTimeInterval();" value="Добавить врем. интервал"><br></br>';
	input += '</form>';
	document.getElementById("temporary").innerHTML = input;
}

function defaultButtonsForPlan() {
	var input = "<form id='formTemp'>";

	input +=
		'<input type="button" class="button" onclick="newServicemanForPlan();" value="Добавить сотрудника"><br>';
	input +=
		'<input type="button" class="button" onclick="newDivisionForPlan();" value="Добавить подразделение"><br>';
	input +=
		'<input type="button" class="button" onclick="newEventForPlan();" value="Добавить мероприятие"><br>';
	input +=
		'<input type="button" class="button" onclick="newGroupEventForPlan();" value="Добавить гр. мероприятий"><br>';
	input +=
		'<input type="button" class="button" onclick="newTypePlanForPlan();" value="Добавить вид плана"><br>';
	input +=
		'<input type="button" class="button" onclick="newTimeIntervalForPlan();" value="Добавить врем. интервал"><br></br>';
	input +=
		'<input type="button" class="button" onclick="defaultButtons(); startAjax();" value="Назад"><br></br>';
	input += '</form>';
	document.getElementById("temporary").innerHTML = input;
}

function buttonsNewPlan() {
	var input = "<form id='formTemp'>";

	input +=
		'<input type="button" class="button" onclick="newTypePlan();" value="Добавить вид плана"><br>';
	input +=
		'<input type="button" class="button" onclick="newServiceman();" value="Добавить сотрудника"><br>';
	input +=
		'<input type="button" class="button" onclick="newEvent();" value="Добавить мероприятие"><br>';
	input +=
		'<input type="button" class="button" onclick="newGroupEvent();" value="Добавить группу мероприятий"><br>';
	input += '</form>';
	document.getElementById("temporary").innerHTML = input;
}

function checkServiceman() {
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	var myForm = document.getElementById("formTemp");
	var elems = myForm.elements;
	var params = "";

	for (var i = 0; i < elems.length; i++) {
		if (params != "") params += "&";
		params += elems[i].name + "=" + encodeURIComponent(elems[i].value);
	}
	request.overrideMimeType("text/xml");
	request.onreadystatechange = function () {
		switch (request.readyState) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4: {
				if (request.status == 200) {
					var xmlDoc = request.responseXML;
					mess = xmlDoc.getElementsByTagName("meta");
					document1 = mess[0].getElementsByTagName("document1")[0].childNodes[0]
						.nodeValue;
					firstName = mess[0].getElementsByTagName("firstName")[0].childNodes[0]
						.nodeValue;
					secondName = mess[0].getElementsByTagName("secondName")[0].childNodes[0]
						.nodeValue;
					middleName = mess[0].getElementsByTagName("middleName")[0].childNodes[0]
						.nodeValue;
					free = mess[0].getElementsByTagName("free")[0].childNodes[0]
						.nodeValue;
					color1 = 0;
					color2 = 138;
					time = 3;
					if (firstName == "good" && secondName == "good" && middleName == "good" && free == "good" && document1 == 'good') {
						sendDataServiceman();
						startAjax();
						defaultButtons();
						return;
					}
					if (free == "bad") {
						input =
							'<input type="text" id="inputDocument" name="document" class="input" placeholder="Документ занят"><br>';
						document.getElementById(
							"divInputDocument"
						).innerHTML = input;
						errorInputServicemanDocument();
					}
					if (document1 == "bad") {
						errorInputServicemanDocument();
					}
					if (firstName == "bad") {
						errorInputServicemanFirstName();
					}
					if (secondName == "bad") {
						errorInputServicemanSecondName();
					}
					if (middleName == "bad") {
						errorInputServicemanMiddleName();
					}

				} else if (request.status == 404) {
					alert("Ошибка: запрашиваемый скрипт не найден!");
				} else alert("Ошибка: сервер вернул статус: " + request.status);
				break;
			}
		}
	};
	request.open("POST", "checkServiceman.php", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(params);
}

function checkEvent() {
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	var myForm = document.getElementById("eventForm");
	var elems = myForm.elements;
	var params = "";

	for (var i = 0; i < elems.length; i++) {
		if (params != "") params += "&";
		params += elems[i].name + "=" + encodeURIComponent(elems[i].value);
	}
	request.overrideMimeType("text/xml");
	request.onreadystatechange = function () {
		switch (request.readyState) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4: {
				if (request.status == 200) {
					var xmlDoc = request.responseXML;
					mess = xmlDoc.getElementsByTagName("meta");
					titleEvent = mess[0].getElementsByTagName("titleEvent")[0].childNodes[0]
						.nodeValue;
					commentEvent = mess[0].getElementsByTagName("commentEvent")[0].childNodes[0]
						.nodeValue;
					color1 = 0;
					color2 = 138;
					time = 3;
					if (titleEvent == "good") {
						sendDataEvent();
						startAjax();
						defaultButtons();
						return;
					}
					if (titleEvent == "bad") {
						errorInputTitleEvent();
					}

					if (commentEvent == "bad") {
						//errorInputCommentEvent();
					}

				} else if (request.status == 404) {
					alert("Ошибка: запрашиваемый скрипт не найден!");
				} else alert("Ошибка: сервер вернул статус: " + request.status);
				break;
			}
		}
	};
	request.open("POST", "checkEvent.php", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(params);
}

function checkDivision() {
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	var myForm = document.getElementById("eventForm");
	var elems = myForm.elements;
	var params = "";

	for (var i = 0; i < elems.length; i++) {
		if (params != "") params += "&";
		params += elems[i].name + "=" + encodeURIComponent(elems[i].value);
	}
	request.overrideMimeType("text/xml");
	request.onreadystatechange = function () {
		switch (request.readyState) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4: {
				if (request.status == 200) {
					var xmlDoc = request.responseXML;
					mess = xmlDoc.getElementsByTagName("meta");
					titleDivision = mess[0].getElementsByTagName("titleDivision")[0].childNodes[0]
						.nodeValue;
					color1 = 0;
					color2 = 138;
					time = 3;
					if (titleDivision == "good") {
						sendDataDivision();
						startAjax();
						defaultButtons();
						return;
					}
					if (titleDivision == "bad") {
						errorInputTitleDivision();
					}

				} else if (request.status == 404) {
					alert("Ошибка: запрашиваемый скрипт не найден!");
				} else alert("Ошибка: сервер вернул статус: " + request.status);
				break;
			}
		}
	};
	request.open("POST", "checkDivision.php", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(params);
}

function checkTimeInterval() {
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	var myForm = document.getElementById("eventForm");
	var elems = myForm.elements;
	var params = "";

	for (var i = 0; i < elems.length; i++) {
		if (params != "") params += "&";
		params += elems[i].name + "=" + encodeURIComponent(elems[i].value);
	}
	request.overrideMimeType("text/xml");
	request.onreadystatechange = function () {
		switch (request.readyState) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4: {
				if (request.status == 200) {
					var xmlDoc = request.responseXML;
					mess = xmlDoc.getElementsByTagName("meta");
					titleTimeInterval = mess[0].getElementsByTagName("titleTimeInterval")[0].childNodes[0]
						.nodeValue;
					color1 = 0;
					color2 = 138;
					time = 3;
					if (titleTimeInterval == "good") {
						sendDataTimeInterval();
						startAjax();
						defaultButtons();
						return;
					}
					if (titleTimeInterval == "bad") {
						errorInputTitleTimeInterval();
					}

				} else if (request.status == 404) {
					alert("Ошибка: запрашиваемый скрипт не найден!");
				} else alert("Ошибка: сервер вернул статус: " + request.status);
				break;
			}
		}
	};
	request.open("POST", "checkTimeInterval.php", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(params);
}

function checkGroupEvent() {
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	var myForm = document.getElementById("eventForm");
	var elems = myForm.elements;
	var params = "";

	for (var i = 0; i < elems.length; i++) {
		if (params != "") params += "&";
		params += elems[i].name + "=" + encodeURIComponent(elems[i].value);
	}
	request.overrideMimeType("text/xml");
	request.onreadystatechange = function () {
		switch (request.readyState) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4: {
				if (request.status == 200) {
					var xmlDoc = request.responseXML;
					mess = xmlDoc.getElementsByTagName("meta");
					titleGroupEvent = mess[0].getElementsByTagName("titleGroupEvent")[0].childNodes[0]
						.nodeValue;
					color1 = 0;
					color2 = 138;
					time = 3;
					if (titleGroupEvent == "good") {
						sendDataGroupEvent();
						startAjax();
						defaultButtons();
						return;
					}
					if (titleEvent == "bad") {
						errorInputTitleGroupEvent();
					}

				} else if (request.status == 404) {
					alert("Ошибка: запрашиваемый скрипт не найден!");
				} else alert("Ошибка: сервер вернул статус: " + request.status);
				break;
			}
		}
	};
	request.open("POST", "checkGroupEvent.php", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(params);
}

function errorInputServicemanDocument() {
	inputDocument.style.background =
		"rgba(" + color2 + ", " + color1 + ", 37, 0.349)";
	color1 += 1;
	color2 -= 1;
	time -= 1;
	if (color1 > 41) {
		return;
	}
	if (time > 0) {
		setTimeout("errorInputServicemanDocument()", 100);
	} else {
		setTimeout("errorInputServicemanDocument()", 45);
	}
}

function errorInputTitleTimeInterval() {
	inputTimeInterval.style.background =
		"rgba(" + color2 + ", " + color1 + ", 37, 0.349)";
	color1 += 1;
	color2 -= 1;
	time -= 1;
	if (color1 > 41) {
		return;
	}
	if (time > 0) {
		setTimeout("errorInputTitleTimeInterval()", 100);
	} else {
		setTimeout("errorInputTitleTimeInterval()", 45);
	}
}
//человеческая функция, которая отчего-то не работает
/*
function error(tempId, color1Er, color2Er, timeEr) {
	var useless = document.getElementById(tempId);
	useless.style.background =
		"rgba(" + color2Er + ", " + color1Er + ", 37, 0.349)";
	color1Er += 1;
	color2Er -= 1;
	timeEr -= 1;
	if (color1 > 41) {
		return;
	}
	if (time > 0) {
		setTimeout("error("+ tempId + ", " + color1Er + ", " + color2Er + ", " + timeEr + ")", 100);
	} else {
		setTimeout("error(" + tempId + ", " + color1Er + ", " + color2Er + ", " + timeEr + ")", 45);
	}
}
*/
function errorInputTitleEvent() {
	inputTitleEvent.style.background =
		"rgba(" + color2 + ", " + color1 + ", 37, 0.349)";
	color1 += 1;
	color2 -= 1;
	time -= 1;
	if (color1 > 41) {
		return;
	}
	if (time > 0) {
		setTimeout("errorInputTitleEvent()", 100);
	} else {
		setTimeout("errorInputTitleEvent()", 45);
	}
}

function errorInputTitleDivision() {
	inputTitleDivision.style.background =
		"rgba(" + color2 + ", " + color1 + ", 37, 0.349)";
	color1 += 1;
	color2 -= 1;
	time -= 1;
	if (color1 > 41) {
		return;
	}
	if (time > 0) {
		setTimeout("errorInputTitleDivision()", 100);
	} else {
		setTimeout("errorInputTitleDivision()", 45);
	}
}

function errorInputTitleGroupEvent() {
	inputTitleGroupEvent.style.background =
		"rgba(" + color2 + ", " + color1 + ", 37, 0.349)";
	color1 += 1;
	color2 -= 1;
	time -= 1;
	if (color1 > 41) {
		return;
	}
	if (time > 0) {
		setTimeout("errorInputTitleGroupEvent()", 100);
	} else {
		setTimeout("errorInputTitleGroupEvent()", 45);
	}
}

function errorInputCommentEvent() {
	inputCommentEvent.style.background =
		"rgba(" + color2 + ", " + color1 + ", 37, 0.349)";
	color1 += 1;
	color2 -= 1;
	time -= 1;
	if (color1 > 41) {
		return;
	}
	if (time > 0) {
		setTimeout("errorInputCommentEvent()", 100);
	} else {
		setTimeout("errorInputCommentEvent()", 45);
	}
}
function errorInputServicemanSecondName() {
	inputSecondName.style.background =
		"rgba(" + color2 + ", " + color1 + ", 37, 0.349)";
	color1 += 1;
	color2 -= 1;
	time -= 1;
	if (color1 > 41) {
		return;
	}
	if (time > 0) {
		setTimeout("errorInputServicemanSecondName()", 100);
	} else {
		setTimeout("errorInputServicemanSecondName()", 45);
	}
}

function errorInputServicemanFirstName() {
	inputFirstName.style.background =
		"rgba(" + color2 + ", " + color1 + ", 37, 0.349)";
	color1 += 1;
	color2 -= 1;
	time -= 1;
	if (color1 > 41) {
		return;
	}
	if (time > 0) {
		setTimeout("errorInputServicemanFirstName()", 100);
	} else {
		setTimeout("errorInputServicemanFirstName()", 45);
	}
}

function errorInputServicemanMiddleName() {
	inputMiddleName.style.background =
		"rgba(" + color2 + ", " + color1 + ", 37, 0.349)";
	color1 += 1;
	color2 -= 1;
	time -= 1;
	if (color1 > 41) {
		return;
	}
	if (time > 0) {
		setTimeout("errorInputServicemanMiddleName()", 100);
	} else {
		setTimeout("errorInputServicemanMiddleName()", 45);
	}
}
function sendDataServiceman() {
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	var myForm = document.getElementById("formTemp");
	var elems = myForm.elements;
	var params = "";
	for (var i = 0; i < elems.length; i++) {
		if (params != "") params += "&";
		params += elems[i].name + "=" + encodeURIComponent(elems[i].value);
	}
	request.open("POST", "newServiceman.php", false);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(params);
}

function sendDataTimeInterval() {
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	var myForm = document.getElementById("eventForm");
	var elems = myForm.elements;
	var params = "";
	for (var i = 0; i < elems.length; i++) {
		if (params != "") params += "&";
		params += elems[i].name + "=" + encodeURIComponent(elems[i].value);
	}
	request.open("POST", "newTimeInterval.php", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(params);
}

function sendDataEvent() {
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	var myForm = document.getElementById("eventForm");
	var elems = myForm.elements;
	var params = "";
	for (var i = 0; i < elems.length; i++) {
		if (params != "") params += "&";
		params += elems[i].name + "=" + encodeURIComponent(elems[i].value);
	}
	request.open("POST", "newEvent.php", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(params);
}

function sendDataDivision() {
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	var myForm = document.getElementById("eventForm");
	var elems = myForm.elements;
	var params = "";
	for (var i = 0; i < elems.length; i++) {
		if (params != "") params += "&";
		params += elems[i].name + "=" + encodeURIComponent(elems[i].value);
	}
	request.open("POST", "newDivision.php", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(params);
}

function sendDataGroupEvent() {
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	var myForm = document.getElementById("eventForm");
	var elems = myForm.elements;
	var params = "";
	for (var i = 0; i < elems.length; i++) {
		if (params != "") params += "&";
		params += elems[i].name + "=" + encodeURIComponent(elems[i].value);
	}
	request.open("POST", "newGroupEvent.php", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(params);
}

function sendDataPlan() {
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	var myForm = document.getElementById("formTable");
	var elems = myForm.elements;
	var params = "";
	for (var i = 0; i < elems.length; i++) {
		if (params != "") params += "&";
		params += elems[i].name + "=" + encodeURIComponent(elems[i].value);
	}
	request.open("POST", "newPlan.php", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(params);
}

function downloadURI(uri, name) {
	var link = document.createElement("a");
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	delete link;
}

function createDownloadButton() {
	document.getElementById('switchTable').innerHTML += '<a href="http://' + document.domain + '/!deepLom/newDocx/plan.docx" download="downloadFile.docx"><button type="button" onclick="deleteDownloadButton();" class="button">Скачать</button></a>'

}

function deleteDownloadButton() {
	document.getElementById('switchTable').innerHTML = '<input type=button value="Создать" class="button" onclick="sendDataPlan();createDownloadButton();">';
}

//не используется
function checkPatternId() {
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	params = '&patternId=' + document.getElementById('patternId').value;

	request.overrideMimeType("text/xml");
	request.onreadystatechange = function () {
		switch (request.readyState) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4: {
				if (request.status == 200) {
					var xmlDoc = request.responseXML;
					mess = xmlDoc.getElementsByTagName("meta");
					nameFilePattern = mess[0].getElementsByTagName("nameFilePattern")[0].childNodes[0]
						.nodeValue;
					return nameFilePattern;

				} else if (request.status == 404) {
					alert("Ошибка: запрашиваемый скрипт не найден!");
				} else alert("Ошибка: сервер вернул статус: " + request.status);
				break;
			}
		}
	};
	request.open("POST", "checkPatternId.php", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(params);
}

function createSelectUpperPlan() {
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	
	
	request.overrideMimeType("text/xml");
	request.onreadystatechange = function () {
		switch (request.readyState) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4: {
				if (request.status == 200) {
					var xmlDoc = request.responseXML;
					var messages = xmlDoc.getElementsByTagName("forPlan");

					select = '<form id=switchForm>';
					select += '<select class=selectForPlan name=planForParser id=inputPlanForParser> '
					select += "<option disabled>Выберите вышестоящий план</option>";
					for (i = 0; i < messages.length; i++) {
						select +=
							"<option value=" +
							messages[i].getElementsByTagName("idPlan")[0].childNodes[0]
								.nodeValue +
							">" +
							messages[i].getElementsByTagName("titleTypePlan")[0].childNodes[0]
								.nodeValue + ' ' +
							messages[i].getElementsByTagName("idPlan")[0].childNodes[0]
								.nodeValue + ' ' +
							messages[i].getElementsByTagName("nameFilePattern")[0].childNodes[0]
								.nodeValue;
						"</option>";
					}
					select += "</select>";
					select += '<input type=button value=выбрать class=button onclick="startParserPlan();">'
					select += '</form>';
					document.getElementById('switchTable').innerHTML = select;

				} else if (request.status == 404) {
					alert("Ошибка: запрашиваемый скрипт не найден!");
				} else alert("Ошибка: сервер вернул статус: " + request.status);
				break;
			}
		}
	};
	request.open("POST", "listPlan.php", true);
	request.send(null);
}
//закончить
function startParserPlan(){
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return;
	}
	var myForm = document.getElementById("switchForm");
	var elems = myForm.elements;
	var params = "";
	for (var i = 0; i < elems.length; i++) {
		if (params != "") params += "&";
		params += elems[i].name + "=" + encodeURIComponent(elems[i].value);
	}
	
	
	request.overrideMimeType("text/xml");
	request.onreadystatechange = function () {
		switch (request.readyState) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4: {
				if (request.status == 200) {
					params = document.getElementById('inputPlanForParser');
					var xmlDoc = request.responseXML;
					var messages = xmlDoc.getElementsByTagName("forPlan");
					


					//поменять кнопку
					//select += '<input type=button class=button onclick="startParserPlan();">'
					//document.getElementById('switchTable').innerHTML = select;

				} else if (request.status == 404) {
					alert("Ошибка: запрашиваемый скрипт не найден!");
				} else alert("Ошибка: сервер вернул статус: " + request.status);
				break;
			}
		}
	};
	request.open("POST", "parserPlan.php", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(params);
}

