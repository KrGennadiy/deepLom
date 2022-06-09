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
						"<table class='table' id='bookTable'><tr><th>Наименование плана</th><th>Подразделение</th><th>Временной промежуток</th><th></th></tr>";
					var messages = xmlDoc.getElementsByTagName("planMainTableData");
					numberPlans = messages.length;
					for (i = 0; i < messages.length; i++) {
						outIdPlan = "None";
						outTitlePlan = "None";
						outTitleTimeInterval = "None";
						outTitleDivision = "None";

						outIdPlan = messages[i].getElementsByTagName("idPlan")[0]
							.childNodes[0].nodeValue;
						outTitlePlan = messages[i].getElementsByTagName("titlePlan")[0]
							.childNodes[0].nodeValue;
						outTitleTimeInterval = messages[i].getElementsByTagName(
							"titleTimeInterval"
						)[0].childNodes[0].nodeValue;
						outTitleDivision = messages[i].getElementsByTagName(
							"titleDivision"
						)[0].childNodes[0].nodeValue;

						table += "<tr><td>" + outTitlePlan + "</td>";
						table += "<td>" + outTitleDivision + "</td>";
						table += "<td>" + outTitleTimeInterval + "</td>";
						table +=
							'<input type="hidden" name="idPlan" value="' + outIdPlan + '">';
						table += '<td class="actionButtons"><input type="button" value="Просмотр" class="buttonTableWide">'// onclick = "parser(\'' + outDocument + '\', \'' + outName + '\', \'' + outRank + '\', \'' + outPosition + '\'); defaultListCP(\'' + outDocument + '\', \'' + outName + '\', \'' + outRank + '\', \'' + outPosition + '\');"
						//table += '<input type="button" value="удалить" class="buttonTable" onclick="deleteServiceman(\'' + outDocument + '\'); startAjax();">'
						//table += '<input type="button" value="изменить" class="buttonTable" onclick="changeServiceman(\'' + outDocument + '\', \'' + outName + '\', \'' + outRank + '\', \'' + outPosition + '\');">'
						table += "</td></tr>";
					}
					table += "</table>";
					table += '<div id="rowId"></div>';
					document.getElementById("table").innerHTML = table;
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
					var messages = xmlDoc.getElementsByTagName("serviceman");
					var table =
						"<table class='table' id='bookTable'><tr><th>Придумаю потом</th><th>Выбрать/Вставить</th><th></th></tr>";
					table += '<tbody>'
					table += '<tr><td> Утверждающее лицо </td>';
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

					table += '<tr><td> Составитель плана </td>';
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

					messagesPlan = xmlDoc.getElementsByTagName("plan");
					messagesDivision = xmlDoc.getElementsByTagName("division");
					messagesTimeInterval = xmlDoc.getElementsByTagName("timeInterval");
					messagesEvent = xmlDoc.getElementsByTagName("event");
					messagesGroupEvent = xmlDoc.getElementsByTagName("groupEvent");
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
					table += "</select></td></tr>";

					table += '<tr><td> Наименование подразделения </td>';
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

					table += '<tr><td> Временной интервал </td>';
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

					table += '<tr><td colspan="2">';
					table += '<table id="tableGroupEvent"><tbody><tr><td> Группа мероприятий <br>'
					table += '<select name="groupEvent" class="selectForPlan">';
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
					table += '<table id="tableEvent"><tbody><tr><td>'
					eventTable = '';
					eventTable += ' Мероприятие <br> ';
					eventTable += '<select name="event" class="selectForPlan">';
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
					eventTable += '<select name="executor" class="selectForPlan">';
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
					table += eventTable;
					table += '</td></tr></tbody></table>';
					forButton = 'tableEvent';
					table += '<input type="button" value="Добавить" class="buttonTable" onclick="addEventTable(\'' + forButton + '\'); newEventTable();">';
					table += '</td></tr></tbody></table>';
					table += '<br><input type="button" onclick="addGroupEvent(); newGroupEventTable();" id="longButton" value="Добавить группу мероприятий"';
					table += "</td>";








					table += '</tbody>';
					table += "</table>";
					table += '<div id="rowId"></div>';
					document.getElementById("table").innerHTML = table;

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
	var td1 = document.createElement("td")
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
					eventTable = '';
					eventTable += ' Мероприятие <br> ';
					eventTable += '<select name="event" class="selectForPlan">';
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
					eventTable += '<select name="executor" class="selectForPlan">';
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
					eventGroupTable = '';
					eventGroupTable += ' Группа мероприятий <br> ';
					eventGroupTable += '<select name="event" class="selectForPlan">';
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
					eventTable += '<table id="tableEvent' + rand + '"><tbody><tr><td>'
					eventTable += ' Мероприятие <br> ';
					eventTable += '<select name="event" class="selectForPlan">';
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

	var input = "";
	input += '<b class="lable">Добавить мероприятие</b><br>';
	input +=
		'<input type="text" id="inputTitleEvent" name="titleEvent" class="input" placeholder="Наименование"><br>';
	input +=
		'<input type="text" id="inputCommentEvent" name="commentEvent" class="input" placeholder="Комментарий"><br>';
	input +=
		'<input type="date" id="inputDeadLineEvent" name="deadLineEvent" class="input" placeholder="Срок выполнения"><br>';

	input +=
		'<input type="button" class="button" value="Добавить" onclick="checkEvent();"><br>';
	input += '<input type=button value=Назад class="button" onclick="defaultButtons();">';
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

function uploadPattern() {

	var input = "";
	input += '<form name="test" id="dataPattern" method="post" action="patternParser.php" enctype=multipart/form-data>';
	input += '<input type=file name=uploadfile accept=".docx" class="button" onchange="enabledUploadPattern();"><br>';
	input += '<div id="uploadButton"><input type=submit disabled name="blockButton" value=Загрузить class="button"></div></form>';
	input += '<input type=button value=Назад class="button" onclick="defaultButtons();">';
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
		'<input type="button" class="button" onclick="newEvent();" value="Добавить мероприятие"><br>';
	input +=
		'<input type="button" class="button" onclick="newPlan(); newEvent();" value="Создать планир. документ"><br>';
	input +=
		'<input type="button" class="button" onclick="uploadPlan();" value="Просмотреть docx"><br>';
	input +=
		'<input type="button" class="button" onclick="uploadPattern();" value="Загрузить шаблон"><br>';
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
					document = mess[0].getElementsByTagName("document")[0].childNodes[0]
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
					if (firstName == "good" && secondName == "good" && middleName == "good" && free == "good" && document == 'good') {
						sendDataServiceman();
						startAjax();
						defaultButtons();
						return;
					}
					if (free == "bad") {
						input =
							'<input type="text" id="inputDocument" name="firstName" class="input" placeholder="Документ занят"><br>';
						document.getElementById(
							"divInputDocument"
						).innerHTML = input;
					}
					if (document == "bad") {
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
//сыро
function sendDataPattern() {
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

