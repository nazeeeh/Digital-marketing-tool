// notification on admin page


displaysugestnotif = JSON.parse(localStorage.getItem("notificationnumba"));
if (displaysugestnotif == null) {
  displaysugestnotif = [];
}
len = displaysugestnotif.length;
document.getElementById("notifi").innerHTML = len;

if (len == 0) {
  document.getElementById("notifi").style.display = "none";
}
//    removing notif
function remove() {
  window.localStorage.removeItem("notificationnumba");
}