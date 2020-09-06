window.addEventListener('load', function () {
})

const start_end_button = document.querySelector('.timer')
const time_counting = document.querySelector('.time_counting')
let temp_record
let count = 0
const TIM_SLICE_LIST_KEY = 'time_slice_item';
const SELECTED_TIM_SLICE_LIST_ID_KEY = 'time_slice_id';

// time slice container
let time_slice_container = JSON.parse(localStorage.getItem(TIM_SLICE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(SELECTED_TIM_SLICE_LIST_ID_KEY);




const user_name = document.querySelector('.user_name')
const name_letter = document.querySelector('.name_letter')
const trim_name = user_name.textContent.trim()
name_letter.textContent = trim_name.substring(0, 2)

const open_close_btn = document.querySelector('.open_close_btn')
const side_board_for_totally_hidden = document.querySelector('.side_board_for_totally_hidden')

open_close_btn.addEventListener('mouseover', () => {
  open_close_btn.style.width = "20px"

})
open_close_btn.addEventListener('mouseout', () => {
  open_close_btn.style.width = "13px"
})

open_close_btn.addEventListener('click', function () {

  if (!side_board_for_totally_hidden.classList.contains("toggle_side_bar")) {
    side_board_for_totally_hidden.classList.add('toggle_side_bar')
    open_close_btn.style.left = "0px"
    open_close_btn.innerHTML = "&#8250;"
  } else {
    side_board_for_totally_hidden.classList.remove('toggle_side_bar')
    open_close_btn.style.left = "260px"
    open_close_btn.innerHTML = "&#8249;"
  }
})

// ========= timer section =======

// click event, when click the start-stop button, the time slice will be created
start_end_button.addEventListener('click', function () {

  if (start_end_button.textContent.toLowerCase() === "start") {
    start_end_button.textContent = "Stop"
    start_end_button.style.backgroundColor = "red";

    temp_record = setInterval(function () {
      count += 1
      time_counting.textContent = count
    }, 1000)

  } else {
    start_end_button.textContent = "Start"
    start_end_button.style.backgroundColor = "#3B7C94"
    clearInterval(temp_record)
  }
})

// this function is used to populate an time slice object,which will be add to the local storage container later
function populateTimeSlice(time_slice) {
  return {
    id: Date.now().toString(),
    timeSlice: time_slice
  }
}






























