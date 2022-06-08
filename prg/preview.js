function preview(){
        temp = "<body id='bodyPreview'>"
        temp += '<div class="auth" id="picture">'
        temp += '</div>'
        temp += '</body>'
        document.getElementById("switchEnter").innerHTML = temp

        
    setTimeout("enter();", 1500)
}

function enter(){
        temp = "<body id='bodyEnter'>"
        temp += '<form action="script.php" method="POST">'
        temp += '<div class="auth">'
        temp += '<H1 id="auth">Авторизация</H1>'  
        temp += '<p><b>Логин:</b><br>'
        temp += '<input type="text" autocomplete="off" size="30" required class="input" name="login" id="login">'
        temp += '</p>'
        temp += '<p><b>Пароль:</b><br>'
        temp += '<input type="password" size="30" class="pass" name="pass" id="pass">'
        temp += '</p>'
        temp += '<input type="submit" value="Войти" class="submit">'
        temp += '</div>'
        temp += '</form>'
        temp += '</body>'
        document.getElementById("switchEnter").innerHTML = temp
}