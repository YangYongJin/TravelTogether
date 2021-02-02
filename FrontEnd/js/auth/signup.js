import http from "../utilities/http.js";

const signupButton = document.getElementById("signup");

signupButton.addEventListener("click", signup);

async function signup() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const sex = document.getElementById("sex").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("password-confirm").value;

  const data = {
    name,
    age,
    sex,
    email,
    password,
  };
  let error = "";
  if (password != passwordConfirm) {
    error = "패스워드가 일치하지 않습니다.";
  } else {
    const { user, token } = await http.post(
      "http://localhost:3000/auth/signup",
      data
    );
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

      
    location.href = "main.html";
  }
}
