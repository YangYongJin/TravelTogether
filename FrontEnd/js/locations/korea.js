import http from "../utilities/http.js";

// const posts = [
//   {
//     _id: 123,
//     user: "용진",
//     title: "체코 여행동행 2명 모집합니다.",
//     startDate: new Date(2020, 11, 24),
//     endDate: new Date(2020, 12, 1),
//     countries: ["한국"],
//     cities: ["서울", "전주"],
//     content: "",
//     prefrence: "",
//     contact: "",
//   },
//   {
//     _id: 123,
//     user: "용진",
//     title: "체코 여행동행 2명 모집합니다.",
//     startDate: new Date(2020, 11, 24),
//     endDate: new Date(2020, 12, 1),
//     countries: ["korea"],
//     cities: ["seoul", "jeonju"],
//     goWith: 2,
//     onlyMale: true,
//     onlyCouple: false,
//     onlyFemale: false,
//     maxAge: 23,
//   },
//   {
//     _id: 123,
//     user: "용진",
//     title: "체코 여행동행 2명 모집합니다.",
//     startDate: new Date(2020, 11, 24),
//     endDate: new Date(2020, 12, 1),
//     countries: ["korea"],
//     cities: ["seoul", "jeonju"],
//     goWith: 2,
//     onlyMale: true,
//     onlyCouple: false,
//     onlyFemale: false,
//     maxAge: 23,
//   },
//   {
//     _id: 123,
//     user: "용진",
//     title: "체코 여행동행 2명 모집합니다.",
//     startDate: new Date(2020, 11, 24),
//     endDate: new Date(2020, 12, 1),
//     countries: ["korea"],
//     cities: ["seoul", "jeonju"],
//     goWith: 2,
//     onlyMale: true,
//     onlyCouple: false,
//     onlyFemale: false,
//     maxAge: 23,
//   },
// ];
let currentPosts = [];

async function getPosts() {
  const { posts, message } = await http.get(
    "http://localhost:3000/posts?region=korea"
  );
  console.log(posts);
  currentPosts = posts;
}

window.addEventListener("DOMContentLoaded", loadEvents);

async function loadEvents() {
  await getPosts();
  createPost(currentPosts);
  addLink(currentPosts);
}

function createPost(posts) {
  const postCards = document.querySelector(".post-cards");
  for (let post of posts) {
    // ----outer card----
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("post-card");
    const hr = document.createElement("hr");
    postCards.appendChild(hr);
    postCards.appendChild(cardDiv);
    const frontDiv = document.createElement("div");
    // ----------card front-----
    frontDiv.classList.add("post-front");
    const backDiv = document.createElement("div");
    // ------card back------
    backDiv.classList.add("post-back");
    cardDiv.appendChild(frontDiv);
    cardDiv.appendChild(backDiv);
    // -------title part-----
    const title = document.createElement("h4");
    title.classList.add("title");
    title.textContent = post.title;
    // ------user part
    const user = document.createElement("p");
    user.classList.add("user");
    user.innerHTML = `<i class="fas fa-user"></i> ${post.user.name}`;
    // ----- add to card front------
    frontDiv.appendChild(title);
    frontDiv.appendChild(user);
    // -----add date part-----
    const date = document.createElement("p");
    let startDate = new Date(post.startDate);
    let endDate = new Date(post.endDate);
  
    date.innerHTML = `<i class="far fa-calendar-alt"></i> ${
      startDate.getFullYear() - 2000
    }/${startDate.getMonth() + 1}/${startDate.getDate()}~${
      endDate.getFullYear() - 2000
    }/${endDate.getMonth() + 1}/${endDate.getDate()}`;
    backDiv.appendChild(date);
  }
}

function addLink(posts) {
  let titles = document.querySelectorAll(".title");
  titles = Array.from(titles);
  titles.forEach((title, idx) => {
    title.addEventListener("click", function (e) {
      location.href = `../view.html?_id=${posts[idx]._id}`;
    });
  });
}

const apply = document.getElementById("apply");
apply.addEventListener("click", function () {
  if (localStorage.getItem("user")) {
    location.href = `../apply.html?region=korea`;
  } else {
    location.href = `../login.html`;
  }
});
