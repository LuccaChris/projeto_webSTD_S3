var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");
var body = document.querySelector("body");

btnSignin.addEventListener("click", function () {
    if (!body.classList.contains("sign-in-js")) {
        body.classList.remove("sign-up-js");
        body.classList.add("sign-in-js");
    }
});

btnSignup.addEventListener("click", function () {
    if (!body.classList.contains("sign-up-js")) {
        body.classList.remove("sign-in-js");
        body.classList.add("sign-up-js");
    }
});

document.querySelector("#signin-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o comportamento padrão de submissão

    // Captura os valores dos campos de entrada
    const email = document.querySelector("#login-email").value.trim();
    const password = document.querySelector("#login-password").value.trim();

    if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        // Envia os dados para a API
        const response = await fetch("http://localhost/api_crud_usuario/index.php?url=api/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha: password }), // Ajusta os dados conforme esperado na API
        });

        const data = await response.json(); // Processa a resposta

        if (response.ok && data.status === "success") {
            // Login bem-sucedido, redireciona para userregister.html
            window.location.href = "userregister.html";
        } else {
            // Exibe o erro retornado pela API
            alert(data.message || "Erro ao realizar o login.");
        }
    } catch (error) {
        console.error("Erro ao enviar os dados:", error);
        alert("Ocorreu um erro. Tente novamente mais tarde.");
    }
});