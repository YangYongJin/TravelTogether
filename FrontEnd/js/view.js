import http from "./utilities/http.js";

// const post = {
//   _id: 123,
//   user: "용진",
//   title: "부산 여행 두명 모집합니다.",
//   startDate: new Date(2020, 11, 24),
//   endDate: new Date(2020, 12, 1),
//   countries: ["한국"],
//   cities: ["서울", "전주"],
//   content: `대통령은 국가의 독립·영토의 보전·국가의 계속성과 헌법을 수호할 책무를 진다. 대통령은 국가의 안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여 긴급한 조치가 필요하고 국회의 집회가 불가능한 때에 한하여 법률의 효력을 가지는 명령을 발할 수 있다.

//   근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다. 정당의 설립은 자유이며, 복수정당제는 보장된다. 저작자·발명가·과학기술자와 예술가의 권리는 법률로써 보호한다.

//   헌법재판소 재판관의 임기는 6년으로 하며, 법률이 정하는 바에 의하여 연임할 수 있다. 헌법재판소의 조직과 운영 기타 필요한 사항은 법률로 정한다. 국무총리 또는 행정각부의 장은 소관사무에 관하여 법률이나 대통령령의 위임 또는 직권으로 총리령 또는 부령을 발할 수 있다.

//   공무원인 근로자는 법률이 정하는 자에 한하여 단결권·단체교섭권 및 단체행동권을 가진다. 재의의 요구가 있을 때에는 국회는 재의에 붙이고, 재적의원과반수의 출석과 출석의원 3분의 2 이상의 찬성으로 전과 같은 의결을 하면 그 법률안은 법률로서 확정된다.`,
//   preference: `동행은 2명에서 3명, 성별은 남성, 나이는 20대였으면 좋겠습니다.`,
//   contact: `관심이 있으신 분의 경우 제 이메일 dyyjkd@gmail.com으로 연락
//   주시면 좋겠습니다.`,
// };

window.addEventListener("DOMContentLoaded", initPage);

async function initPage() {
  const post = await getPost();
  showPost(post);
  await showAdmin(post);
}

async function getPost() {
  const qs = getQueryStringObject();
  const postId = qs._id;
  const { post } = await http.get(`http://localhost:3000/post/${postId}`);
  return post;
}

async function showAdmin(post){
  const currentUser = JSON.parse(localStorage.getItem('user'))._id;
  const writeUser = post.user._id;
  if(currentUser && (currentUser === writeUser)) {
    const viewAdmin = document.querySelector('.view-admin');
    const viewEdit = document.createElement('div');
    viewEdit.classList.add('view-edit');
    viewEdit.innerHTML = `<i class="fas fa-edit"></i> 수정`;
    const viewDelete = document.createElement('div');
    viewDelete.classList.add('view-delete');
    viewDelete.innerHTML = `<i class="far fa-minus-square"></i> 삭제`;
    viewEdit.addEventListener('click', function(){
      location.href = `./apply.html?mode=edit&_id=${post._id}`;
    });
    viewDelete.addEventListener('click', async function(){
      const token = localStorage.getItem('token');
      await http.delete(`http://localhost:3000/post/${post._id}`, token);
      location.href = './locations/korea.html';
    });
    viewAdmin.appendChild(viewEdit);
    viewAdmin.appendChild(viewDelete);
  }
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

function showPost(post) {
  const user = document.querySelector(".view-user");
  const title = document.querySelector(".view-title");
  const content = document.querySelector(".view-content");
  const date = document.querySelector(".view-date p");
  const preference = document.querySelector(".view-preference p");
  const contact = document.querySelector(".view-contact p");

  user.innerHTML = `<i class="fas fa-user"></i> ${post.user.name}`;
  title.innerHTML = `${post.title}`;

  const postContent = post.content.split("\n");
  let contentHtml = "";
  for (let content of postContent) {
    contentHtml += `<p>${content}</p>`;
  }
  content.innerHTML = `${contentHtml}`;

  let startDate = new Date(post.startDate);
  let endDate = new Date(post.endDate);
  date.innerHTML = `<i class="far fa-calendar-alt"></i> ${
    startDate.getFullYear() - 2000
  }/${startDate.getMonth() + 1}/${startDate.getDate()}~${
    endDate.getFullYear() - 2000
  }/${endDate.getMonth() + 1}/${endDate.getDate()}`;
  preference.innerHTML = `${post.preference}`;
  contact.innerHTML = `${post.contact}`;
}
