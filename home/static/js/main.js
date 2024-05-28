document.addEventListener("DOMContentLoaded", function () {
    var editButton = document.getElementById("editButton");
    var labelTelefono = document.getElementById("telefono");

    editButton.addEventListener("click", function () {
        if (labelTelefono.contentEditable === "false") {
            makeEditable(labelTelefono, editButton);
        } else {
            makeNonEditable(labelTelefono, editButton);
            var contactId = labelTelefono.getAttribute("data-contact-id");
            var updateUrl = labelTelefono.getAttribute("data-contact-url");

            updateTelefono(labelTelefono.innerText, contactId, updateUrl);
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("editButtonDelete");
    var label = document.getElementById("deleteButtonDelete");

    button.addEventListener("click", function () {
        if (label.contentEditable === "false") {
            makeEditable(label, button);
        } else {
            makeNonEditable(label, button);
            var contactId = label.getAttribute("data-contact-id");
            var updateUrl = label.getAttribute("data-contact-url");

            // updateTelefono(labelTelefono.innerText, contactId, updateUrl);
        }
    });
});
