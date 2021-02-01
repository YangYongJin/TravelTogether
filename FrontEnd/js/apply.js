import http from "./utilities/http.js";

const applyButton = document.getElementById("apply");

applyButton.addEventListener("click", addPost);

async function addPost() {
  const title = document.getElementById("title").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const content = document.getElementById("content").value;
  const preference = document.getElementById("preference").value;
  const contact = document.getElementById("contact").value;

  const qs = getQueryStringObject();
  const region = qs.region;
  const token = localStorage.getItem("token");

  const data = {
    title,
    startDate,
    endDate,
    content,
    preference,
    contact,
    region,
  };

  const { post, message } = await http.authPost(
    "http://localhost:3000/post",
    data,
    token
  );
  location.href = './locations/korea.html';
}

function getQueryStringObject() {
  var a = window.location.search.substr(1).split("&");
  if (a == "") return {};
  var b = {};
  for (let i = 0; i < a.length; ++i) {
    var p = a[i].split("=", 2);
    if (p.length == 1) b[p[0]] = "";
    else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
  }
  return b;
}
