
let now = dayjs();
let nowTime = now.format(' HH:mm / MMMM D YYYY');

let dateTime = $('#currentDay');
dateTime.text(nowTime);

let past = true;
let present = false;
//To test colour change comment out now.format('hA') and add e.g ('11AM')
//let hour = now.format('hA')
let hour = ('1PM')
//Check for stored tasks
let storedTasks = JSON.parse(localStorage.getItem('taskList'))
//for first time use set up local storage structure
if (!storedTasks) {
    storedTasks = {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: ""
    }
}


// populate the planner block
for (let i = 0; i < 9; i++) {

    let loopHour = dayjs().hour(i + 9).format('hA')
    //identify current hour
    if (loopHour === hour) {
        past = false;
        present = true;
    }
    //add the entire row
    let thisRow = $(`<div class="row">`)
    $('.container').append(thisRow)
    //add the hour number
    let hourBlock = $(`<div class="col-1 hour" data-index="${i}">`)
    hourBlock.text(`${loopHour}`);
    thisRow.append(hourBlock)
    //add the text area with stored tasks if any
    let textSpace = $(`<textarea class="col-10 description" data-index="${i}">`)
    textSpace.text(storedTasks[i])
    //add past present future color based on hour
    if (past) {
        textSpace.addClass('past')
    } else if (present) {
        textSpace.addClass('present')
        present = false;
    } else {
        textSpace.addClass('future')
    }
    thisRow.append(textSpace)
    //add the save buttons depending on if the hour is already fille din
    let btn = $(`<button class="col-1 btn saveBtn" data-index="${i}">`)
    if (storedTasks[i].length) {
        btn.append(`<i class="fas fa-lock" data-index="${i}">`)
        textSpace.prop('disabled', true)
    } else {
        btn.append(`<i class="fas fa-unlock-alt" data-index="${i}">`)
    }
    thisRow.append(btn)
}

//listen to user mouse click
$('.saveBtn').click(function () {
    let index = $(this).attr('data-index');
    //choose button effect and storage option based on if a stored task is unlocked or new task is locked in
    if (storedTasks[index]) {
        $(`textarea[data-index="${index}"]`).prop('disabled', false);
        storedTasks[index] = "";
        $(`i[data-index="${index}"]`).removeClass('fa-lock').addClass('fa-unlock-alt');
        localStorage.setItem('taskList', JSON.stringify(storedTasks));
    } else {
        let txt = $(`textarea[data-index="${index}"]`)
        if (txt.val()) { //handles the case that save is clicked on empty text area
            storedTasks[index] = txt.val();
            txt.prop('disabled', true);
            $(`i[data-index="${index}"]`).removeClass('fa-unlock-alt').addClass('fa-lock');
            localStorage.setItem('taskList', JSON.stringify(storedTasks));
        }
    }
})