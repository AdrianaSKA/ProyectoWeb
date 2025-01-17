document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formRegistro");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (validateForm()) {
            alert("Registro exitoso.");
            form.reset();
        }
    });

    const validateForm = () => {
        let valid = true;

        
        const nombre = document.getElementById("nombre");
        if (nombre.value.trim() === "") {
            showError(nombre, "El nombre no puede estar vacío.");
            valid = false;
        } else {
            clearError(nombre);
        }

        const email = document.getElementById("email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            showError(email, "Correo electrónico inválido.");
            valid = false;
        } else {
            clearError(email);
        }

        const password = document.getElementById("password");
        if (password.value.length < 8) {
            showError(password, "La contraseña debe tener al menos 8 caracteres.");
            valid = false;
        } else {
            clearError(password);
        }

        const confirmPassword = document.getElementById("confirmPassword");
        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, "Las contraseñas no coinciden.");
            valid = false;
        } else {
            clearError(confirmPassword);
        }

        return valid;
    };

    const showError = (input, message) => {
        const error = input.nextElementSibling;
        input.style.borderColor = "#ff7373";
        error.textContent = message;
        error.style.display = "block";
    };

    const clearError = (input) => {
        const error = input.nextElementSibling;
        input.style.borderColor = "#da4ba3";
        error.style.display = "none";
    };
});
