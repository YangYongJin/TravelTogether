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
const qs = getQueryStringObject();
const country = qs.country;