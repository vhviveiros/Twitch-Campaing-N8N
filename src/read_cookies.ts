import cookies from "../cookies.json"

for (let c in cookies) {
  console.log(cookies[c].name + "-> " + cookies[c].value);
}
