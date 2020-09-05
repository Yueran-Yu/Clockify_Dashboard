window.addEventListener('load', function () {

})

const open_close_btn = document.querySelector('.open_close_btn')
const side_board_for_totally_hidden = document.querySelector('.side_board_for_totally_hidden');
open_close_btn.addEventListener('mouseover', () => {
  open_close_btn.style.width = "20px";
  // open_close_btn.innerHTML = "&#8250;";

})
open_close_btn.addEventListener('mouseout', () => {
  open_close_btn.style.width = "13px";
  // open_close_btn.innerHTML = "&#8249;";
})

open_close_btn.addEventListener('click', function () {

  if (!side_board_for_totally_hidden.classList.contains("toggle_side_bar")) {
    console.log("contains");
    side_board_for_totally_hidden.classList.add('toggle_side_bar');
    open_close_btn.style.left = "0px";
    open_close_btn.innerHTML = "&#8250;";
  } else {
    side_board_for_totally_hidden.classList.remove('toggle_side_bar');
    open_close_btn.style.left = "260px";
    open_close_btn.innerHTML = "&#8249;";
  }
})

