import http from "./utilities/http.js";

window.addEventListener("DOMContentLoaded", initPage);

async function initPage() {
  const applyButton = document.getElementById("apply");
  const qs = getQueryStringObject();
  const mode = qs.mode;
  if (!mode) {
    applyButton.addEventListener("click", addPost);
  } else if (mode === "edit") {
    await changeValue();
    applyButton.addEventListener("click", editPost);
  }
}

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
  location.href = "./locations/korea.html";
}

async function changeValue() {
  const qs = getQueryStringObject();
  const postId = qs._id;
  const { post } = await http.get(`http://localhost:3000/post/${postId}`);

  document.getElementById("title").value = post.title;
  document.getElementById("start-date").value = formatDate(post.startDate);
  document.getElementById("end-date").value = formatDate(post.endDate);
  document.getElementById("content").value = post.content;
  document.getElementById("preference").value = post.preference;
  document.getElementById("contact").value = post.contact;

  const applyButton = document.getElementById("apply");

  applyButton.textContent = "수정하기";
}

async function editPost() {
  const qs = getQueryStringObject();
  const postId = qs._id;

  const title = document.getElementById("title").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const content = document.getElementById("content").value;
  const preference = document.getElementById("preference").value;
  const contact = document.getElementById("contact").value;

  const token = localStorage.getItem("token");

  const data = {
    title,
    startDate,
    endDate,
    content,
    preference,
    contact,
  };

  const { post, message } = await http.put(
    `http://localhost:3000/post/${postId}`,
    data,
    token
  );
  location.href = `./view.html?_id=${postId}`;
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

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
