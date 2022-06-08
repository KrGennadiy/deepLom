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
            "<table class='table' id='bookTable'><tr><th>Должность</th><th>Звание</th><th>ФИО</th><th>Номер военного билета</th><th></th></tr>";
          var messages = xmlDoc.getElementsByTagName("tableData");
          numberServicemans = messages.length;
          for (i = 0; i < messages.length; i++) {
            outDocument = "None";
            outName = "None";
            outRank = "None";
            outPosition = "None";

            outDocument = messages[i].getElementsByTagName("document")[0]
              .childNodes[0].nodeValue;
            outName = messages[i].getElementsByTagName("name")[0].childNodes[0]
              .nodeValue;
            outRank = messages[i].getElementsByTagName("rank")[0].childNodes[0]
              .nodeValue;
            outPosition = messages[i].getElementsByTagName("position")[0]
              .childNodes[0].nodeValue;

            table += "<tr><td>" + outPosition + "</td>";
            table += "<td>" + outRank + "</td>";
            table += "<td>" + outName + "</td>";
            table += "<td>" + outDocument + "</td>";
            table +=
              '<td class="actionButtons"><input type="button" value="учет поощрений\nи взысканий" class="buttonTableWide" onclick="List(\'' +
              outDocument +
              "', '" +
              outName +
              "', '" +
              outRank +
              "', '" +
              outPosition +
              "'); defaultListCP('" +
              outDocument +
              "', '" +
              outName +
              "', '" +
              outRank +
              "', '" +
              outPosition +
              "');\">";
            table +=
              '<input type="button" value="удалить" class="buttonTable" onclick="deleteServiceman(\'' +
              outDocument +
              "'); startAjax();\">";
            table +=
              '<input type="button" value="изменить" class="buttonTable" onclick="changeServiceman(\'' +
              outDocument +
              "', '" +
              outName +
              "', '" +
              outRank +
              "', '" +
              outPosition +
              "');\">";
            table += "</td></tr>";
          }
          table += "</table>";
          table += '<div id="rowId"></div>';
          document.getElementById("table").innerHTML = table;

          switchButton =
            '<input type="button" class="button" id="buttonRetable" onclick="startUserTable(); defaultListUser();" value="Показать таблицу пользователей">';
          switchButton +=
            '<input type="button" class="button" id="buttonUpdate" onclick="startAjax();" value="Обновить">';
          switchButton +=
            '<b class="textSumm"> военнослужащих на кафедре: ' +
            numberServicemans +
            " </b>";
          document.getElementById("switchTable").innerHTML = switchButton;
        } else if (request.status == 404) {
          alert("Ошибка: запрашиваемый скрипт не найден!");
        } else alert("Ошибка: сервер вернул статус: " + request.status);
        break;
      }
    }
  };
  request.open("GET", "userTable.php", false);
  request.send(null);
}
function List(
  documentServiceman,
  nameServiceman,
  rankServiceman,
  positionServiceman
) {
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
            "<table class='table' id='tableCommendation'><tr><th>Вид</th><th>Кому</th><th>От кого</th><th>Причина</th><th>Дата</th><th></th></tr>";
          var messages = xmlDoc.getElementsByTagName("commendationData");
          var messagesP = xmlDoc.getElementsByTagName("punishmentData");
          numberList = 0;
          for (i = 0; i < messages.length; i++) {
            if (
              documentServiceman ==
              messages[i].getElementsByTagName("documentServiceman")[0]
                .childNodes[0].nodeValue
            ) {
              outNameCommendation = "None";
              outNameRank = "None";
              outNamePosition = "None";
              outNameChief = "None";
              outDateCommendation = "None";
              outReasonCommendation = "None";
              outIdCommendation = "None";

              outNameCommendation = messages[i].getElementsByTagName(
                "nameCommendation"
              )[0].childNodes[0].nodeValue;
              outNameRank = messages[i].getElementsByTagName("nameRank")[0]
                .childNodes[0].nodeValue;
              outNamePosition = messages[i].getElementsByTagName(
                "namePosition"
              )[0].childNodes[0].nodeValue;
              outNameChief = messages[i].getElementsByTagName("nameChief")[0]
                .childNodes[0].nodeValue;
              outDateCommendation = messages[i].getElementsByTagName("date")[0]
                .childNodes[0].nodeValue;
              outReasonCommendation = messages[i].getElementsByTagName(
                "reason"
              )[0].childNodes[0].nodeValue;
              outIdCommendation = messages[i].getElementsByTagName(
                "idCommendation"
              )[0].childNodes[0].nodeValue;

              table += "<tr><td>" + outNameCommendation + "</td>";
              table +=
                "<td>" +
                positionServiceman +
                " " +
                rankServiceman +
                " " +
                nameServiceman +
                "</td>";
              table +=
                "<td>" +
                outNamePosition +
                " " +
                outNameRank +
                " " +
                outNameChief +
                "</td>";
              table += "<td>" + outReasonCommendation + "</td>";
              table += "<td>" + outDateCommendation + "</td>";
              table += '<td class="actionButtons">';
              table +=
                '<input type="hidden" name="idCommendation" value="' +
                outIdCommendation +
                '">';
              table +=
                '<input type="button" value="удалить" class="buttonTable" onclick="deleteCommendation(\'' +
                outIdCommendation +
                "'); List('" +
                documentServiceman +
                "', '" +
                nameServiceman +
                "', '" +
                rankServiceman +
                "', '" +
                positionServiceman +
                "');\">";
              table += '<div id="rowId"></div></td></tr>';
            }
          }
          for (i = 0; i < messagesP.length; i++) {
            if (
              documentServiceman ==
              messagesP[i].getElementsByTagName("documentServiceman")[0]
                .childNodes[0].nodeValue
            ) {
              outNamePunishment = "None";
              outNameRank = "None";
              outNamePosition = "None";
              outNameChief = "None";
              outDatePunishment = "None";
              outReasonPunishment = "None";
              outActuality = "None";
              outIdPunishment = "None";

              outNamePunishment = messagesP[i].getElementsByTagName(
                "namePunishment"
              )[0].childNodes[0].nodeValue;
              outNameRank = messagesP[i].getElementsByTagName("nameRank")[0]
                .childNodes[0].nodeValue;
              outNamePosition = messagesP[i].getElementsByTagName(
                "namePosition"
              )[0].childNodes[0].nodeValue;
              outNameChief = messagesP[i].getElementsByTagName("nameChief")[0]
                .childNodes[0].nodeValue;
              outDatePunishment = messagesP[i].getElementsByTagName("date")[0]
                .childNodes[0].nodeValue;
              outReasonPunishment = messagesP[i].getElementsByTagName(
                "reason"
              )[0].childNodes[0].nodeValue;
              outActuality = messagesP[i].getElementsByTagName("actuality")[0]
                .childNodes[0].nodeValue;
              outIdPunishment = messagesP[i].getElementsByTagName(
                "idPunishment"
              )[0].childNodes[0].nodeValue;

              if (outActuality == "1") {
                numberList += 1;
              }
              if (outActuality == "1") outActuality = "Действует";
              else outActuality = "Снято";
              table += "<tr><td>" + outNamePunishment + "</td>";
              table +=
                "<td>" +
                positionServiceman +
                " " +
                rankServiceman +
                " " +
                nameServiceman +
                "</td>";
              table +=
                "<td>" +
                outNamePosition +
                " " +
                outNameRank +
                " " +
                outNameChief +
                "</td>";
              table += "<td>" + outReasonPunishment + "</td>";
              table +=
                "<td>" + outDatePunishment + "<br>" + outActuality + "</td>";
              table += '<td class="actionButtons">';
              table +=
                '<input type="hidden" name="idPunishment" value="' +
                outIdPunishment +
                '">';
              table +=
                '<input type="button" value="удалить" class="buttonTable" onclick="deletePunishment(\'' +
                outIdPunishment +
                "'); List('" +
                documentServiceman +
                "', '" +
                nameServiceman +
                "', '" +
                rankServiceman +
                "', '" +
                positionServiceman +
                "');\">";
              table +=
                '<input type="button" value="снять" class="buttonTable" onclick="zero(\'' +
                outIdPunishment +
                "'); List('" +
                documentServiceman +
                "', '" +
                nameServiceman +
                "', '" +
                rankServiceman +
                "', '" +
                positionServiceman +
                "');\">";
              table += '<div id="rowId"></div></td></tr>';
            }
          }
          table += "</table>";
          document.getElementById("table").innerHTML = table;

          switchButton =
            '<input type="button" class="button" id="buttonRetable" onclick="startAjax(); defaultListServiceman();" value="Назад">';
          switchButton +=
            '<input type="button" class="button" value="Обновить" id="buttonUpdate" onclick="List(\'' +
            documentServiceman +
            "', '" +
            nameServiceman +
            "', '" +
            rankServiceman +
            "', '" +
            positionServiceman +
            "');\">";
          switchButton +=
            '<b class="textSumm"> количество действующих взысканий: ' +
            numberList +
            " </b>";
          document.getElementById("switchTable").innerHTML = switchButton;
        } else if (request.status == 404) {
          alert("Ошибка: запрашиваемый скрипт не найден!");
        } else alert("Ошибка: сервер вернул статус: " + request.status);
        break;
      }
    }
  };
  request.open("POST", "listTable.php", false);
  request.send(null);
}
function startUserTable() {
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
            "<table class='table' id='tableUsers'><tr><th>Логин</th><th>Права</th><th></th></tr>";
          var messages = xmlDoc.getElementsByTagName("usersData");
          numberUsers = messages.length;

          for (i = 0; i < messages.length; i++) {
            outLogin = "None";
            outTypeUser = "None";
            outLogin = messages[i].getElementsByTagName("login")[0]
              .childNodes[0].nodeValue;
            outTypeUser = messages[i].getElementsByTagName("typeuser")[0]
              .childNodes[0].nodeValue;
            if (outTypeUser == "0") {
              outTypeUser = "Администратор";
            } else if (outTypeUser == "1") {
              outTypeUser = "Пользователь";
            }

            table += "<tr><td>" + outLogin + "</td>";
            table += "<td>" + outTypeUser + "</td>";
            table += '<td class="actionButtons">';
            table +=
              '<input type="button" value="удалить" class="buttonTable" onclick="deleteUser(\'' +
              outLogin +
              "'); startUserTable();\">";
            table +=
              '<input type="button" value="изменить" class="buttonTable" onclick="changeUser(\'' +
              outLogin +
              "', '" +
              outTypeUser +
              "');\">";
            table += '<div id="rowId"></div></td></tr>';
          }
          table += "</table>";
          document.getElementById("table").innerHTML = table;

          switchButton =
            '<input type="button" class="button" id="buttonRetable" onclick="startAjax(); defaultListServiceman();" value="Показать таблицу военнослужащих">';
          switchButton +=
            '<input type="button" class="button" id="buttonUpdate" onclick="startUserTable();" value="Обновить">';
          switchButton +=
            '<b class="textSumm"> количество пользователей: ' +
            numberUsers +
            " </b>";
          document.getElementById("switchTable").innerHTML = switchButton;
        } else if (request.status == 404) {
          alert("Ошибка: запрашиваемый скрипт не найден!");
        } else alert("Ошибка: сервер вернул статус: " + request.status);
        break;
      }
    }
  };
  request.open("GET", "userTable.php", false);
  request.send(null);
}

function zero(id) {
  var request;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    request = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
    return;
  }
  document.getElementById("rowId").innerHTML =
    '<input type="hidden" name="idRow" value="' + id + '">';

  var myForm = document.getElementById("formTable");
  var elems = myForm.elements;
  var params = "";

  for (var i = 0; i < elems.length; i++) {
    if (params != "") params += "&";
    params += elems[i].name + "=" + encodeURIComponent(elems[i].value);
  }

  request.open("POST", "zeroPunishment.php", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(params);
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
          var messRank = xmlDoc.getElementsByTagName("rankData");
          var messPosition = xmlDoc.getElementsByTagName("positionData");

          var input = "";
          input +=
            '<div id="labelDocumentServiceman"> <b class="lable">  Номер военного билета </b> </div>';
          input +=
            '<input type="text" id="inputDocumentServiceman" name="document" class="input"><br>';

          input += '<b class="lable"> ФИО </b> <br>';
          input +=
            '<input type="text" id="inputNameServiceman" name="fullName" class="input"><br>';

          input += '<b class="lable"> Звание </b> <br>';
          input += '<select name="rankServiceman" class="select">';
          input += "<option disabled>Выберите звание</option>";
          for (i = 0; i < messRank.length; i++) {
            input +=
              "<option value=" +
              messRank[i].getElementsByTagName("idRank")[0].childNodes[0]
                .nodeValue +
              ">" +
              messRank[i].getElementsByTagName("nameRank")[0].childNodes[0]
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
              messPosition[i].getElementsByTagName("namePosition")[0]
                .childNodes[0].nodeValue +
              "</option>";
          }
          input += "</select><br>";

          input +=
            '<input type="button" class="button" value="Добавить" onclick="checkServiceman();"><br>';
          input +=
            '<input type="button" class="button" value="Отмена" onclick="defaultListServiceman();">';
          document.getElementById("temporary").innerHTML = input;
        } else if (request.status == 404) {
          alert("Ошибка: запрашиваемый скрипт не найден!");
        } else alert("Ошибка: сервер вернул статус: " + request.status);
        break;
      }
    }
  };
  request.open("GET", "rankPositionXML.php", false);
  request.send(null);
}

function newCommendation(
  serviceman,
  nameServiceman,
  rankServiceman,
  positionServiceman
) {
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
          var message = xmlDoc.getElementsByTagName("tableData");

          var input = "";
          input += '<b class="lable"> Вид поощрения </b> <br>';
          input +=
            '<input type="text" id="inputNameCommendation" name="nameCommendation" class="input"><br>';
          input +=
            '<input type="hidden" name="serviceman" value="' +
            serviceman +
            '">';
          input += '<b class="lable"> От кого </b> <br>';
          input += '<select name="chief" class="select">';
          input += "<option disabled>Выберите военнослужащего</option>";
          for (i = 0; i < message.length; i++) {
            if (
              message[i].getElementsByTagName("document")[0].childNodes[0]
                .nodeValue != serviceman
            ) {
              input +=
                "<option value=" +
                message[i].getElementsByTagName("document")[0].childNodes[0]
                  .nodeValue +
                ">" +
                message[i].getElementsByTagName("position")[0].childNodes[0]
                  .nodeValue +
                " " +
                message[i].getElementsByTagName("rank")[0].childNodes[0]
                  .nodeValue +
                " " +
                message[i].getElementsByTagName("name")[0].childNodes[0]
                  .nodeValue +
                "</option>";
            }
          }
          input += "</select><br>";

          input += '<b class="lable"> Причина </b> <br>';
          input +=
            '<input type="text" id="inputReasonCommendation" name="reason" class="input"><br>';

          input += '<b class="label"> Дата</b><br>';
          input += '<input type="date" class="input" name="date"><br>';
          input +=
            '<input type="button" class="button" value="Добавить" onclick="checkCommendation(\'' +
            serviceman +
            "', '" +
            nameServiceman +
            "', '" +
            rankServiceman +
            "', '" +
            positionServiceman +
            "');\"><br>";
          input +=
            '<input type="button" class="button" value="Отмена" onclick="defaultListCP(\'' +
            serviceman +
            "', '" +
            nameServiceman +
            "', '" +
            rankServiceman +
            "', '" +
            positionServiceman +
            "');\">";
          document.getElementById("temporary").innerHTML = input;
        } else if (request.status == 404) {
          alert("Ошибка: запрашиваемый скрипт не найден!");
        } else alert("Ошибка: сервер вернул статус: " + request.status);
        break;
      }
    }
  };
  request.open("GET", "userTable.php", false);
  request.send(null);
}

function newPunishment(
  serviceman,
  nameServiceman,
  rankServiceman,
  positionServiceman
) {
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
          var message = xmlDoc.getElementsByTagName("tableData");

          var input = "";
          input += '<b class="lable"> Вид взыскания </b> <br>';
          input +=
            '<input type="text" id="inputNamePunishment" name="namePunishment" class="input"><br>';
          input +=
            '<input type="hidden" name="serviceman" value="' +
            serviceman +
            '">';
          input += '<b class="lable"> От кого </b> <br>';
          input += '<select name="chief" class="select">';
          input += "<option disabled>Выберите военнослужащего</option>";
          for (i = 0; i < message.length; i++) {
            if (
              message[i].getElementsByTagName("document")[0].childNodes[0]
                .nodeValue != serviceman
            ) {
              input +=
                "<option value=" +
                message[i].getElementsByTagName("document")[0].childNodes[0]
                  .nodeValue +
                ">" +
                message[i].getElementsByTagName("position")[0].childNodes[0]
                  .nodeValue +
                " " +
                message[i].getElementsByTagName("rank")[0].childNodes[0]
                  .nodeValue +
                " " +
                message[i].getElementsByTagName("name")[0].childNodes[0]
                  .nodeValue +
                "</option>";
            }
          }
          input += "</select><br>";

          input += '<b class="lable"> Причина </b> <br>';
          input +=
            '<input type="text" id="inputReasonPunishment" name="reason" class="input"><br>';

          input += '<b class="label"> Дата</b><br>';
          input += '<input type="date" class="input" name="date"><br>';
          input +=
            '<input type="button" class="button" value="Добавить" onclick="checkPunishment(\'' +
            serviceman +
            "', '" +
            nameServiceman +
            "', '" +
            rankServiceman +
            "', '" +
            positionServiceman +
            "');\"><br>";
          input +=
            '<input type="button" class="button" value="Отмена" onclick="defaultListCP(\'' +
            serviceman +
            "', '" +
            nameServiceman +
            "', '" +
            rankServiceman +
            "', '" +
            positionServiceman +
            "');\">";
          document.getElementById("temporary").innerHTML = input;
        } else if (request.status == 404) {
          alert("Ошибка: запрашиваемый скрипт не найден!");
        } else alert("Ошибка: сервер вернул статус: " + request.status);
        break;
      }
    }
  };
  request.open("GET", "userTable.php", false);
  request.send(null);
}

function newUser() {
  var input = "";
  input += '<div id="labelLoginUser"><b class="lable"> Логин </b></div>';
  input +=
    '<input type="text" id="inputLoginUser" name="login" class="input"><br>';
  input += '<b class="lable"> Пароль </b> <br>';
  input +=
    '<input type="text" id="inputPasswordUser" name="password" class="input"><br>';
  input += '<b class="lable"> Права доступа </b> <br>';
  input += '<select name="typeuser" class="select">';
  input += "<option disabled>Права доступа</option>";
  input += "<option value=0> Администратор </option>";
  input += "<option selected value=1> Пользователь </option>";
  input += "</select><br>";
  input +=
    '<input type="button" class="button" value="Добавить" onclick="checkUser(); sendDataUser();"><br>';
  input +=
    '<input type="button" class="button" value="Отмена" onclick="defaultListUser();">';
  document.getElementById("temporary").innerHTML = input;
}

function changeUser(login, type) {
  var input = "";
  if (type == "Администратор") {
    input += '<b class="lable">Изменение ' + login + "</b> <br><br>";
    input += '<b class="lable"> Права доступа </b> <br>';
    input += '<input type="hidden" name="login" value="' + login + '">';
    input += '<select name="typeuser" class="select">';
    input += "<option disabled>Права доступа</option>";
    input += "<option selected value=0> Администратор </option>";
    input += "<option value=1> Пользователь </option>";
    input += "</select><br>";
  } else {
    input += '<b class="lable">Изменение ' + login + "</b> <br><br>";
    input += '<b class="lable"> Права доступа </b> <br>';
    input += '<input type="hidden" name="login" value="' + login + '">';
    input += '<select name="typeuser" class="select">';
    input += "<option disabled>Права доступа</option>";
    input += "<option value=0> Администратор </option>";
    input += "<option selected value=1> Пользователь </option>";
    input += "</select><br>";
  }
  input +=
    '<input type="button" class="button" value="Изменить" onclick="changeDataUser(); startUserTable(); defaultListUser();"><br>';
  input +=
    '<input type="button" class="button" value="Отмена" onclick="defaultListUser();">';
  document.getElementById("temporary").innerHTML = input;
}

function changeServiceman(doc, name, rank, position) {
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
          var messRank = xmlDoc.getElementsByTagName("rankData");
          var messPosition = xmlDoc.getElementsByTagName("positionData");

          var input = "";
          input += '<b class="lable"> ФИО </b> <br>';
          input += '<input type="hidden" value="' + doc + '" name="document">';
          input +=
            '<input type="text" value="' +
            name +
            '" name="fullname" class="input"><br>';

          input += '<b class="lable"> Звание </b> <br>';
          input += '<select name="rankServiceman" class="select">';
          input += "<option disabled>Выберите звание</option>";
          var hidden = "";
          for (i = 0; i < messRank.length; i++) {
            hidden = "";
            if (
              rank ==
              messRank[i].getElementsByTagName("nameRank")[0].childNodes[0]
                .nodeValue
            ) {
              hidden = "selected";
            }
            input +=
              "<option " +
              hidden +
              " value=" +
              messRank[i].getElementsByTagName("idRank")[0].childNodes[0]
                .nodeValue +
              ">" +
              messRank[i].getElementsByTagName("nameRank")[0].childNodes[0]
                .nodeValue +
              "</option>";
          }
          input += "</select><br>";

          input += '<b class="lable"> Должность </b> <br>';
          input += '<select name="positionServiceman" class="select">';
          input += "<option disabled>Выберите должность</option>";
          for (i = 0; i < messPosition.length; i++) {
            hidden = "";
            if (
              position ==
              messPosition[i].getElementsByTagName("namePosition")[0]
                .childNodes[0].nodeValue
            ) {
              hidden = "selected";
            }
            input +=
              "<option " +
              hidden +
              " value=" +
              messPosition[i].getElementsByTagName("idPosition")[0]
                .childNodes[0].nodeValue +
              ">" +
              messPosition[i].getElementsByTagName("namePosition")[0]
                .childNodes[0].nodeValue +
              "</option>";
          }
          input += "</select><br>";

          input +=
            '<input type="button" class="button" value="Изменить" onclick="sendChangeDataServiceman(); startAjax(); defaultListServiceman();"><br>';
          input +=
            '<input type="button" class="button" value="Отмена" onclick="defaultListServiceman();">';
          document.getElementById("temporary").innerHTML = input;
        } else if (request.status == 404) {
          alert("Ошибка: запрашиваемый скрипт не найден!");
        } else alert("Ошибка: сервер вернул статус: " + request.status);
        break;
      }
    }
  };
  request.open("GET", "rankPositionXML.php", false);
  request.send(null);
}

function defaultListServiceman() {
  var input = "";
  input +=
    '<input type="button" class="button" onclick="newServiceman();" value="Добавить военнослужащего"><br>';
  document.getElementById("temporary").innerHTML = input;
}

function defaultListUser() {
  var input = "";
  input +=
    '<input type="button" class="button" onclick="newUser();" value="Добавить пользователя"><br>';
  document.getElementById("temporary").innerHTML = input;
}

function defaultListCP(
  serviceman,
  nameServiceman,
  rankServiceman,
  positionServiceman
) {
  var input = "";
  input +=
    '<input type="button" class="button" onclick="newCommendation(\'' +
    serviceman +
    "', '" +
    nameServiceman +
    "', '" +
    rankServiceman +
    "', '" +
    positionServiceman +
    '\');" value="Добавить благодарность"><br>';
  input +=
    '<input type="button" class="button" onclick="newPunishment(\'' +
    serviceman +
    "', '" +
    nameServiceman +
    "', '" +
    rankServiceman +
    "', '" +
    positionServiceman +
    '\');" value="Добавить взыскание"><br>';
  input +=
    '<input type="button" class="button" onclick="Graph(\'' +
    serviceman +
    "', '" +
    nameServiceman +
    "', '" +
    rankServiceman +
    "', '" +
    positionServiceman +
    '\'); defaultSpace();" value="Построить график">';
  document.getElementById("temporary").innerHTML = input;
}

function defaultSpace() {
  var input = "";
  document.getElementById("temporary").innerHTML = input;
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

function sendDataUser() {
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

  request.open("POST", "newUser.php", false);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(params);
}

function sendDataCommendation() {
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

  request.open("POST", "newCommendation.php", false);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(params);
}

function sendDataPunishment() {
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

  request.open("POST", "newPunishment.php", false);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(params);
}

function sendDataPunishment() {
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

  request.open("POST", "newPunishment.php", false);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(params);
}

function sendChangeDataServiceman() {
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

  request.open("POST", "changeServiceman.php", false);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(params);
}

function changeDataUser() {
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

  request.open("POST", "changeUser.php", false);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(params);
}

function deleteServiceman(doc) {
  var request;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    request = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
    return;
  }
  document.getElementById("rowId").innerHTML =
    '<input type="hidden" name="idRow" value="' + doc + '">';

  var myForm = document.getElementById("formTable");
  var elems = myForm.elements;
  var params = "";

  for (var i = 0; i < elems.length; i++) {
    if (params != "") params += "&";
    params += elems[i].name + "=" + encodeURIComponent(elems[i].value);
  }

  request.open("POST", "deleteServiceman.php", false);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(params);
}

function deleteCommendation(id) {
  var request;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    request = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
    return;
  }
  document.getElementById("rowId").innerHTML =
    '<input type="hidden" name="idRow" value="' + id + '">';

  var myForm = document.getElementById("formTable");
  var elems = myForm.elements;
  var params = "";

  for (var i = 0; i < elems.length; i++) {
    if (params != "") params += "&";
    params += elems[i].name + "=" + encodeURIComponent(elems[i].value);
  }

  request.open("POST", "deleteCommendation.php", false);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(params);
}

function deletePunishment(id) {
  var request;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    request = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
    return;
  }
  document.getElementById("rowId").innerHTML =
    '<input type="hidden" name="idRow" value="' + id + '">';

  var myForm = document.getElementById("formTable");
  var elems = myForm.elements;
  var params = "";

  for (var i = 0; i < elems.length; i++) {
    if (params != "") params += "&";
    params += elems[i].name + "=" + encodeURIComponent(elems[i].value);
  }

  request.open("POST", "deletePunishment.php", false);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(params);
}

function deleteUser(login) {
  var request;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    request = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
    return;
  }
  document.getElementById("rowId").innerHTML =
    '<input type="hidden" name="idRow" value="' + login + '">';

  var myForm = document.getElementById("formTable");
  var elems = myForm.elements;
  var params = "";

  for (var i = 0; i < elems.length; i++) {
    if (params != "") params += "&";
    params += elems[i].name + "=" + encodeURIComponent(elems[i].value);
  }

  request.open("POST", "deleteUser.php", false);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(params);
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
          answer = mess[0].getElementsByTagName("correct")[0].childNodes[0]
            .nodeValue;
          free = mess[0].getElementsByTagName("free")[0].childNodes[0]
            .nodeValue;
          color1 = 0;
          color2 = 138;
          time = 3;
          if (answer == "good" && free == "good") {
            sendDataServiceman();
            startAjax();
            defaultListServiceman();
            return;
          }
          if (free == "bad") {
            input =
              '<b class="lable" id="labelDocumentServiceman">  Номер билета занят </b>';
            document.getElementById(
              "labelDocumentServiceman"
            ).innerHTML = input;
          }
          if (free != "bad") {
            input =
              '<b class="lable" id="labelDocumentServiceman">  Номер военного билета </b>';
            document.getElementById(
              "labelDocumentServiceman"
            ).innerHTML = input;
          }
          if (answer == "all bad") {
            errorInputServicemanDocument();
            errorInputServicemanName();
          }
          if (answer == "name bad") {
            errorInputServicemanName();
          }
          if (answer == "document bad") {
            errorInputServicemanDocument();
          }
        } else if (request.status == 404) {
          alert("Ошибка: запрашиваемый скрипт не найден!");
        } else alert("Ошибка: сервер вернул статус: " + request.status);
        break;
      }
    }
  };
  request.open("POST", "checkServiceman.php", false);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(params);
}

function checkUser() {
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
          answer = mess[0].getElementsByTagName("correct")[0].childNodes[0]
            .nodeValue;
          free = mess[0].getElementsByTagName("free")[0].childNodes[0]
            .nodeValue;
          color1 = 0;
          color2 = 138;
          time = 3;
          if (
            (answer == "good" || answer == "password bad") &&
            free == "good"
          ) {
            startUserTable();
            defaultListUser();
          }
          if (free == "bad") {
            input = '<b class="lable">  Логин занят </b>';
            document.getElementById("labelLoginUser").innerHTML = input;
            errorInputUserLogin();
          }
          if (free != "bad") {
            input = '<b class="lable">  Логин </b>';
            document.getElementById("labelLoginUser").innerHTML = input;
            errorInputUserLogin();
          }
          if (answer == "login bad") {
            errorInputUserLogin();
          }
        } else if (request.status == 404) {
          alert("Ошибка: запрашиваемый скрипт не найден!");
        } else alert("Ошибка: сервер вернул статус: " + request.status);
        break;
      }
    }
  };
  request.open("POST", "checkUser.php", false);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(params);
}

function checkCommendation(
  serviceman,
  nameServiceman,
  rankServiceman,
  positionServiceman
) {
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
          answer = mess[0].getElementsByTagName("correct")[0].childNodes[0]
            .nodeValue;
          color1 = 0;
          color2 = 138;
          time = 3;
          if (answer == "good") {
            sendDataCommendation();
            defaultListCP(
              serviceman,
              nameServiceman,
              rankServiceman,
              positionServiceman
            );
            List(
              serviceman,
              nameServiceman,
              rankServiceman,
              positionServiceman
            );
            return;
          }
          if (answer == "all bad") {
            errorInputCommendationName();
            errorInputCommendationReason();
          }
          if (answer == "name bad") {
            errorInputCommendationName();
          }
          if (answer == "reason bad") {
            errorInputCommendationReason();
          }
        } else if (request.status == 404) {
          alert("Ошибка: запрашиваемый скрипт не найден!");
        } else alert("Ошибка: сервер вернул статус: " + request.status);
        break;
      }
    }
  };
  request.open("POST", "checkCommendation.php", false);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(params);
}

function checkPunishment(
  serviceman,
  nameServiceman,
  rankServiceman,
  positionServiceman
) {
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
          answer = mess[0].getElementsByTagName("correct")[0].childNodes[0]
            .nodeValue;
          color1 = 0;
          color2 = 138;
          time = 3;
          if (answer == "good") {
            sendDataPunishment();
            defaultListCP(
              serviceman,
              nameServiceman,
              rankServiceman,
              positionServiceman
            );
            List(
              serviceman,
              nameServiceman,
              rankServiceman,
              positionServiceman
            );
            return;
          }
          if (answer == "all bad") {
            errorInputPunishmentName();
            errorInputPunishmentReason();
          }
          if (answer == "name bad") {
            errorInputPunishmentName();
          }
          if (answer == "reason bad") {
            errorInputPunishmentReason();
          }
        } else if (request.status == 404) {
          alert("Ошибка: запрашиваемый скрипт не найден!");
        } else alert("Ошибка: сервер вернул статус: " + request.status);
        break;
      }
    }
  };
  request.open("POST", "checkPunishment.php", false);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(params);
}

function errorInputServicemanName() {
  inputNameServiceman.style.background =
    "rgba(" + color2 + ", " + color1 + ", 37, 0.349)";
  color1 += 1;
  color2 -= 1;
  time -= 1;
  if (color1 > 41) {
    return;
  }
  if (time > 0) {
    setTimeout("errorInputServicemanName()", 100);
  } else {
    setTimeout("errorInputServicemanName()", 45);
  }
}

function errorInputServicemanDocument() {
  inputDocumentServiceman.style.background =
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

function errorInputUserLogin() {
  inputLoginUser.style.background =
    "rgba(" + color2 + ", " + color1 + ", 37, 0.349)";
  color1 += 1;
  color2 -= 1;
  time -= 1;
  if (color1 > 41) {
    return;
  }
  if (time > 0) {
    setTimeout("errorInputUserLogin()", 100);
  } else {
    setTimeout("errorInputUserLogin()", 45);
  }
}

function errorInputCommendationName() {
  inputNameCommendation.style.background =
    "rgba(" + color2 + ", " + color1 + ", 37, 0.349)";
  color1 += 1;
  color2 -= 1;
  time -= 1;
  if (color1 > 41) {
    return;
  }
  if (time > 0) {
    setTimeout("errorInputCommendationName()", 100);
  } else {
    setTimeout("errorInputCommendationName()", 45);
  }
}

function errorInputCommendationReason() {
  inputReasonCommendation.style.background =
    "rgba(" + color2 + ", " + color1 + ", 37, 0.349)";
  color1 += 1;
  color2 -= 1;
  time -= 1;
  if (color1 > 41) {
    return;
  }
  if (time > 0) {
    setTimeout("errorInputCommendationReason()", 100);
  } else {
    setTimeout("errorInputCommendationReason()", 45);
  }
}

function errorInputPunishmentName() {
  inputNamePunishment.style.background =
    "rgba(" + color2 + ", " + color1 + ", 37, 0.349)";
  color1 += 1;
  color2 -= 1;
  time -= 1;
  if (color1 > 41) {
    return;
  }
  if (time > 0) {
    setTimeout("errorInputPunishmentName()", 100);
  } else {
    setTimeout("errorInputPunishmentName()", 45);
  }
}

function errorInputPunishmentReason() {
  inputReasonPunishment.style.background =
    "rgba(" + color2 + ", " + color1 + ", 37, 0.349)";
  color1 += 1;
  color2 -= 1;
  time -= 1;
  if (color1 > 41) {
    return;
  }
  if (time > 0) {
    setTimeout("errorInputPunishmentReason()", 100);
  } else {
    setTimeout("errorInputPunishmentReason()", 45);
  }
}

function Graph(serviceman, outName, outRank, outPosition) {
  var request;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    request = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
    return;
  }
  COMMENDATIONS = 0;
  PUNISHMENTS = 0;
  request.overrideMimeType("text/xml");

  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      if (request.status == 200) {
        var xmlDoc = request.responseXML;
        var comm = xmlDoc.getElementsByTagName("commendationData");
        var pun = xmlDoc.getElementsByTagName("punishmentData");
        for (i = 0; i < comm.length; i++) {
          if (
            comm[i].getElementsByTagName("documentServiceman")[0].childNodes[0]
              .nodeValue == serviceman
          ) {
            COMMENDATIONS++;
          }
        }
        for (i = 0; i < pun.length; i++) {
          if (
            pun[i].getElementsByTagName("documentServiceman")[0].childNodes[0]
              .nodeValue == serviceman
          ) {
            PUNISHMENTS++;
          }
        }
      }
    }
  };
  request.open("GET", "listTable.php", false);
  request.send();

  const chartData = [
    {
      label: "Поощрения",
      value: COMMENDATIONS,
    },
    {
      label: "Наказания",
      value: PUNISHMENTS,
    },
  ];

  const chartConfig = {
    type: "pie2d",
    renderAt: "chart-container",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Соотношение поощрений/взысканий военнослужащего",
        theme: "fusion",
      },
      data: chartData,
    },
  };
  FusionCharts.ready(function () {
    var fusioncharts = new FusionCharts(chartConfig);
    fusioncharts.render();
  });

  table = '<div id="chart-container" class="graph"></div>';
  document.getElementById("table").innerHTML = table;

  switchButton =
    '<input type="button" class="button" id="buttonRetable" onclick="List(\'' +
    serviceman +
    "', '" +
    outName +
    "', '" +
    outRank +
    "', '" +
    outPosition +
    "'); defaultListCP('" +
    serviceman +
    "', '" +
    outName +
    "', '" +
    outRank +
    "', '" +
    outPosition +
    '\');" value="Назад">';
  document.getElementById("switchTable").innerHTML = switchButton;
}
