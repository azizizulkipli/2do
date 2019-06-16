//fetch DOM elements
const time=document.getElementById('time'),
    day = document.getElementById('day'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    goal = document.getElementById('goal');
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//TO DO: make a switch for this
var AmPmPreference=true;

//set the time
function setTime(){
    let today=new Date(),
        hours=today.getHours(),
        minutes=today.getMinutes(),
        seconds=today.getSeconds();
    
    const amPm = hours >= 12? 'PM' : 'AM';
    hours = hours > 12 ? hours % 12 : hours;
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

//get goal of the user
function getGoal() {
    let storagegoal = localStorage.getItem('goal');
    if (storagegoal===null) {
        goal.textContent = '[Enter Goal]';
    } else {
        goal.textContent = storagegoal;
    }
}
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

//set goal of user on change
function setGoal(e) {
    if (e.type === 'keypress') {
        //enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('goal', e.target.innerText);
        }
    } else {
        localStorage.setItem('goal', e.target.innerText);
    }
}

// document,addEventListener()
//add event listener for changes in editable content
name.addEventListener('keypress',setName);
name.addEventListener('blur', setName);
goal.addEventListener('keypress', setGoal);
goal.addEventListener('blur', setGoal);
//calls
setTime();
setDate();
setBgGreet();
getName();
getGoal();