//fetch DOM elements
const time=document.getElementById('time'),
    day = document.getElementById('day'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    task= document.getElementById('task'),
    addBtn = document.getElementById('addtask'),
    removeBtn = document.getElementsByClassName('remove')[0],
    doneBtn = document.getElementsByClassName('done')[0];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    removeSVG ='<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><g><g><path class="fillremove" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fillremove" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fillremove" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fillremove" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>',
    doneSVG ='<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><g><path class="filldone" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
  incomplete: [],
  complete: []
};

//TO DO: make a switch for this
var AmPmPreference=true;

//set the time
function setTime(){
    let today=new Date(),
        hours=today.getHours(),
        minutes=today.getMinutes(),
        seconds=today.getSeconds();
    
    const amPm = hours >= 12? 'PM' : 'AM';
    hours = hours > 12 ? hours % 12 : hours==0?hours=12:hours;
    time.innerHTML = `${hours}<span>:</span>${correctTime(minutes)}<span>:</span>${correctTime(seconds)} <span>${setAmPm(amPm)}</span>`;
    setTimeout(setTime,1000);
}
//correct 0-9seconds and minutes
function correctTime(n){
    return (n<10 ? '0' : '') +n;
}
//user preference of AM/PM
function setAmPm(n){
    return AmPmPreference? n : '';
}
//set the date
function setDate(){
    let today=new Date(),
        date=today.getDate(),
        year=today.getFullYear(),
        dayname=days[today.getDay()],
        monthname=month[today.getMonth()];
    
    day.textContent=`${dayname}, ${date} ${monthname} ${year}`;
}

//greet the user
function setBgGreet(){
    let today=new Date(),
        hour=today.getHours();
    if(hour<5){
        //early morning
        greeting.textContent = 'Good Morning,';
        document.body.style.backgroundImage='url("./img/earlymorning.jpg")';
        //fix font colour and background clash issue
        let timecontainer = document.getElementsByClassName('timecontainer')[0];
        timecontainer.style.backgroundColor = 'rgba(255,255,255,.50)';
        timecontainer.style.color = 'black';
        timecontainer.style.padding = '5px';
        timecontainer.style.borderRadius = '10px';
    } else if(hour<12){
        //morning
        greeting.textContent = 'Good Morning,';
        document.body.style.backgroundImage = 'url("./img/morning.jpg")';
    } else if(hour<17){
        //afternoon
        greeting.textContent = 'Good Afternoon,';
        document.body.style.backgroundImage = 'url("./img/noon.jpg")';
    } else if(hour<19){
        //evening
        greeting.textContent = 'Good Evening,';
        document.body.style.backgroundImage = 'url("./img/evening.jpg")';
    } else{
        //night
        greeting.textContent = 'Good Evening,';
        document.body.style.backgroundImage = 'url("./img/night.jpg")';
    }
    setInterval(setBgGreet, 60000);
}

//get name of the user
function getName() {
    let storagename = localStorage.getItem('name');
    if (storagename=== null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = storagename;
    }
}

// //get goal of the user
// function getGoal() {
//     let storagegoal = localStorage.getItem('goal');
//     if (storagegoal===null) {
//         goal.textContent = '[Enter Goal]';
//     } else {
//         goal.textContent = storagegoal;
//     }
// }
//set name of user on change
function setName(e){
    if(e.type==='keypress'){
        //enter is pressed
        if(e.which == 13 || e.keyCode==13){
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem('name',e.target.innerText);
    }
}

// //set goal of user on change
// function setGoal(e) {
//     if (e.type === 'keypress') {
//         //enter is pressed
//         if (e.which == 13 || e.keyCode == 13) {
//             localStorage.setItem('goal', e.target.innerText);
//         }
//     } else {
//         localStorage.setItem('goal', e.target.innerText);
//     }
// }

// document,addEventListener()
//add event listener for changes in editable content
name.addEventListener('keypress',setName);
name.addEventListener('blur', setName);
// goal.addEventListener('keypress', setGoal);
// goal.addEventListener('blur', setGoal);


//Implemented TO-DO List


function renderTodoList() {
    if (!data.incomplete.length && !data.complete.length) return;

    for (var i = 0; i < data.incomplete.length; i++) {
        var value = data.incomplete[i];
        addItemToDOM(value);
    }

    for (var j = 0; j < data.complete.length; j++) {
        var value = data.complete[j];
        addItemToDOM(value, true);
    }
}
function addItemToDOM(text, complete) {
    var list = (complete) ? document.getElementById('completelist'): document.getElementById('incompletelist');
    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;

    // Add click event for removing the item
    remove.addEventListener('click', removeItem);

    var complete = document.createElement('button');
    complete.classList.add('done');
    complete.innerHTML = doneSVG;

    // Add click event for completing the item
    complete.addEventListener('click', completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}
addBtn.addEventListener('click', function () {
    var value = task.value;
    if (value) {
        addItem(value);
    }
});
task.addEventListener('keydown', function (e) {
    var value = this.value;
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
        addItem(value);
    }
});
function addItem(value) {
    addItemToDOM(value);
    task.value = '';

    data.incomplete.push(value);
    dataObjectUpdated();
}
function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));
}
function removeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.childNodes[0].innerText;

    if (id === 'incompletelist') {
        data.incomplete.splice(data.incomplete.indexOf(value), 1);
    } else {
        data.complete.splice(data.complete.indexOf(value), 1);
    }
    dataObjectUpdated();

    parent.removeChild(item);
}

function completeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'incompletelist') {
        data.incomplete.splice(data.incomplete.indexOf(value), 1);
        data.complete.push(value);
    } else {
        data.complete.splice(data.complete.indexOf(value), 1);
        data.incomplete.push(value);
    }
    dataObjectUpdated();

    // Check if the item should be added to the complete list or to re-added to the incomplete list
    var target = (id === 'incompletelist') ? document.getElementById('completelist') : document.getElementById('incompletelist');

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
}

//calls
setTime();
setDate();
setBgGreet();
getName();
// getGoal();
renderTodoList();