window.addEventListener('load', function () {
  refreshWebPage()
})

const start_end_button = document.querySelector('.timer')
const time_counting = document.querySelector('.time_counting')
let temp_record
let count = 0
const TIME_SLICE_LIST_KEY = 'time_slice_item';
const SELECTED_TIME_SLICE_ID_KEY = 'time_slice_id';

// time slice display board variables
let storage_list = JSON.parse(localStorage.getItem(TIME_SLICE_LIST_KEY)) || [];
const time_slice_container = document.querySelector('.time_slice_container')
const delete_message_box = document.querySelector('.delete_messageg_box')
const _alert = document.querySelector('.alert')
const total_time = document.querySelector('.total_time')


// side board variables
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
      const sec =  secondFormat(count)
      time_counting.textContent = sec
    }, 1000)
  }
  else {
    start_end_button.textContent = "Start"
    start_end_button.style.backgroundColor = "#3B7C94"
    clearInterval(temp_record)
    time_counting.textContent = "00:00:00"
    // console.log(count)
    const newTimeSlice = populateTimeSlice(count)
    storage_list.push(newTimeSlice)
    console.log(JSON.stringify(storage_list))
    count = 0
    saveDataToLocalStorage()
    refreshWebPage()
    alertBox('New Time Slice Added Successfully!', 'success')
  }
})

// populate an time slice object,which will be add to the local storage container later
function populateTimeSlice(time_slice) {
  return {
    id: Date.now().toString(),
    timeSlice: time_slice
  }
}

// formart the second
function secondFormat(count) {
  let date = new Date(null)
  date.setSeconds(count)
  const result = date.toISOString().substr(11,8)
  return result
}

// format hour and minite
function hourMiniteFormat(count){
  let date = new Date(null)
  date.setSeconds(count)
  const result = date.toISOString()
  return result
}

// format date
function dateFormat(count){

}

// update local storage time slice container, refresh web page
function refreshWebPage() {
  clearWebPageContainer(time_slice_container)
  setUpTimeList()
  let Total_t = 0
  storage_list.forEach(item => {
    Total_t += item.timeSlice
  })
  const total_time_formated = secondFormat(Total_t)
   //  console.log(Total_t)
   total_time.textContent = `Total: ${total_time_formated}`
}

// save time slice to local storage: key value
function saveDataToLocalStorage() {
  localStorage.setItem(TIME_SLICE_LIST_KEY, JSON.stringify(storage_list))
}

// empty the  web page
function clearWebPageContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
}

// set up items
function setUpTimeList() {
  // console.log(storage_list.length)
  if (storage_list.length > 0) {
    storage_list.forEach(item => {
      disPlayTimeItems(item.id, item.timeSlice)
    })
  }
}

// display the storage data in the web page
function disPlayTimeItems(id, value) {
  // console.log(id + " " + value)

  const item = document.createElement('li')
  const deleteATage = document.createElement('a')
  const seconds = secondFormat(value)
  const _time = hourMiniteFormat(id)
  const textNode = document.createTextNode(`${seconds}`)
  const deleteNode = document.createTextNode("delete")
  item.classList.add('time_slice_item')
  deleteATage.classList.add('delete_button')
  item.appendChild(deleteATage)
  item.appendChild(textNode)
  deleteATage.appendChild(deleteNode)
  //use dataset to add new attribute to the item in the time sice list
  item.dataset.id = id;
  time_slice_container.appendChild(item)

  const delete_btn = item.querySelector('.delete_button')

  // console.log(delete_btn)
  delete_btn.addEventListener('click', function (e) {
    // console.log(e.target.parentElement)
    const deleteItem = e.target.parentElement
    const id = deleteItem.dataset.id
    // console.log(id)
    storage_list = storage_list.filter(item => item.id !== id);
    alertBox('Successfully delete the Time Slice.', 'success')
    // console.log(storage_list)
    saveDataToLocalStorage()
    //  console.log(storage_list)
    refreshWebPage()
  })
}

// display alart box
function alertBox(message, action) {
  _alert.textContent = message
  _alert.classList.remove('delete_box_hidden')
  _alert.classList.add(action)

  setTimeout((() => {
    _alert.textContent = ''
    _alert.classList.add('delete_box_hidden')
  }), 2000)
}




























