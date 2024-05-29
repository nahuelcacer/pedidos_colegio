document.addEventListener("DOMContentLoaded", function () {

    var telefonoEditButton = document.getElementById("telefonoeditButton");
    var telefonoLabel = document.getElementById("telefono");
    var emailEditButton = document.getElementById("emaileditButton");
    var emailLabel = document.getElementById("email");


    telefonoEditButton.addEventListener("click", function () {
        if (telefonoLabel.contentEditable === "false") {
            makeEditable(telefonoLabel, telefonoEditButton)
        } else {
            makeNonEditable(telefonoLabel, telefonoEditButton)
            var id = telefonoLabel.getAttribute('data-id')
            var url = telefonoLabel.getAttribute('data-url')
            updateTelefono(telefonoLabel.innerText, id, url)
        }
    });

    emailEditButton.addEventListener("click", function () {
        if (emailLabel.contentEditable === "false") {
            makeEditable(emailLabel, emailEditButton);
        } else {
            makeNonEditable(emailLabel, emailEditButton);
            var id = emailLabel.getAttribute('data-id')
            var url = emailLabel.getAttribute('data-url')
            updateEmail(emailLabel.innerText, id, url)

        }
    });

});



document.addEventListener("DOMContentLoaded", function () {

    var telefonolabelAdd = document.getElementById("telefonolabelAdd")
    var telefonoButtonAdd = document.getElementById("telefonobuttonAdd");



    var emaillabelAdd = document.getElementById("emaillabelAdd")

    if (telefonolabelAdd) {


        telefonoButtonAdd.addEventListener("click", function () {
            var id_cliente = telefonolabelAdd.getAttribute('data-cliente-id')
            var url_telefono = telefonolabelAdd.getAttribute('data-cliente-url-telefono')


            if (telefonolabelAdd.contentEditable === "false") {
                makeEditable(telefonolabelAdd, telefonoButtonAdd)
            } else {
                makeNonEditable(telefonolabelAdd, telefonoButtonAdd)
                crearTelefono(telefonolabelAdd.innerText, id_cliente, url_telefono)
            }
        })
    }
    if (emaillabelAdd) {
        var emailButtonAdd = document.getElementById("emailbuttonAdd")

        emailButtonAdd.addEventListener("click", function () {
            var id_cliente = emaillabelAdd.getAttribute('data-cliente-id')
            var url_email = emaillabelAdd.getAttribute('data-cliente-url-email')

            if (emaillabelAdd.contentEditable === "false") {
                makeEditable(emaillabelAdd, emailButtonAdd)
            } else {
                makeEditable(emaillabelAdd, emailButtonAdd)
                crearEmail(emaillabelAdd.innerText, id_cliente, url_email)
            }
        })
    }



});

