import http from "../utilities/http.js";

const authNav = document.querySelector("#nav-login");

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  authNav.innerHTML = `<a href="login.html"><i class="fas fa-user-circle"></i>로그인</a>`;
} else {
  authNav.innerHTML = `<div class="logout"><i class="fas fa-sign-out-alt"></i></i>로그아웃</div>`;
  authNav.addEventListener("click", logout);
}

async function logout() {
  const data = {};
  const token = localStorage.getItem("token");
  console.log(token);
  const message = await http.authPost(
    "http://localhost:3000/auth/logout",
    data,
    token
  );
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  authNav.innerHTML = `<a href="login.html"><i class="fas fa-user-circle"></i>로그인</a>`;
}
