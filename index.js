const decreasebtn = document.getElementById("decreasebtn");
const resetbtn = document.getElementById("resetbtn");
const increasebtn = document.getElementById("increasebtn");
const countlabel = document.getElementById("countlabel");
let const = 0;

increasebtn.onclick = function(){
  count++;
  countlabel.textContent = count;

}
decreasebtnbtn.onclick = function(){
  count--;
  countlabel.textContent = count;

}
resetbtnbtn.onclick = function(){
  count = 0;
  countlabel.textContent = count;

}