document.addEventListener("DOMContentLoaded", function () {
    var telefonoEditButton = document.getElementById("telefonoeditButton");
    var telefonoLabel = document.getElementById("telefono");
    var emailEditButton = document.getElementById("emaileditButton");
    var emailLabel = document.getElementById("email");

    telefonoEditButton.addEventListener("click", function () {
        if(telefonoLabel.contentEditable ==="false"){
            makeEditable(telefonoLabel, telefonoEditButton)
        }else{
            makeNonEditable(telefonoLabel, telefonoEditButton)
            var id = telefonoLabel.getAttribute('data-id')
            var url = telefonoLabel.getAttribute('data-url')
            updateTelefono(telefonoLabel.innerText, id, url)
        }
    });

    emailEditButton.addEventListener("click", function () {
        if (emailLabel.contentEditable ==="false"){
            makeEditable(emailLabel,emailEditButton);
        }else {
            makeNonEditable(emailLabel,emailEditButton);
            var id = emailLabel.getAttribute('data-id')
            var url = emailLabel.getAttribute('data-url')
            updateEmail(emailLabel.innerText,id,url )

        }
    });
});

