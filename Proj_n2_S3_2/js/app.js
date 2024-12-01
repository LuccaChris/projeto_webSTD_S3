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

