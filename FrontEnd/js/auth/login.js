import http from "../utilities/http.js";

const loginButton = document.getElementById("login");
console.log(loginButton);

loginButton.addEventListener("click", login);

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = {
    email,
    password,
  };

  const { user, message, token } = await http.post(
    "http://localhost:3000/auth/login",
    data
  );
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);

  location.href = "main.html";
}
