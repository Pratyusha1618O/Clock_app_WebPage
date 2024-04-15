// Analog Clock
let hour = document.getElementById("hour");
let minute = document.getElementById("minute");
let second = document.getElementById("second");

function analogClock() {
    let date = new Date();

    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    let hRotation = 30 * hh + mm / 2 + ss / 120;
    let mRotation = 6 * mm + ss / 10;
    let sRotation = 6 * ss;

    hour.style.transform = `rotate(${hRotation}deg)`;
    minute.style.transform = `rotate(${mRotation}deg)`;
    second.style.transform = `rotate(${sRotation}deg)`;
}
setInterval(analogClock, 1000);

//navbar texts
let wc = document.getElementById("wc");
let stpWatch = document.getElementById("st-watch");
let tmr = document.getElementById("tmr");
let alr = document.getElementById("alr");
let count = document.getElementById("count");

let wc1 = document.querySelector(".wc");
let stpWatch1 = document.querySelector(".st-watch");
let tmr1 = document.querySelector(".tmr");
let alr1 = document.querySelector(".alr");
let count1 = document.querySelector(".count");

// Local Time Zone : Kolkata

var KolkataTime = function () {
    document.querySelector(".kolkata").innerHTML = new Date().toLocaleString("en-US", { timeZone: 'Asia/Kolkata', timeStyle: 'medium', hourCycle: 'h12' });
}
KolkataTime();
setInterval(KolkataTime, 1000);

//World Clock Section

//New Delhi
var delhiTime = function () {
    document.querySelector("#delhi").innerHTML = new Date().toLocaleString("en-US", { timeZone: 'Asia/Kolkata', timeStyle: 'medium', hourCycle: 'h24' });
}
delhiTime();
setInterval(delhiTime, 1000);
//London
var londonTime = function () {
    document.querySelector("#london").innerHTML = new Date().toLocaleString("en-US", { timeZone: 'Europe/London', timeStyle: 'medium', hourCycle: 'h24' });
}
londonTime();
setInterval(londonTime, 1000);
//New York
var newyorkTime = function () {
    document.querySelector("#new-york").innerHTML = new Date().toLocaleString("en-US", { timeZone: 'America/New_York', timeStyle: 'medium', hourCycle: 'h24' });
}
newyorkTime();
setInterval(newyorkTime, 1000);
//Tokyo
var tokyoTime = function () {
    document.querySelector("#tokyo").innerHTML = new Date().toLocaleString("en-US", { timeZone: 'Asia/Tokyo', timeStyle: 'medium', hourCycle: 'h24' });
}
tokyoTime();
setInterval(tokyoTime, 1000);

//_______________Stopwatch______________

let stopwatchDisplay = document.querySelector(".stopwatch-display");
let startBtn = document.getElementById("start-stopwatch");
let stopBtn = document.getElementById("stop-stopwatch");
let resetBtn = document.getElementById("reset-stopwatch");

let msec = 0;
let sec = 0;
let min = 0;

let timerId = null;

startBtn.addEventListener('click', function () {
    if (timerId != null) {
        clearInterval(timerId);
    }
    timerId = setInterval(start, 10);
})

stopBtn.addEventListener('click', function () {
    clearInterval(timerId);
})

resetBtn.addEventListener('click', function () {
    clearInterval(timerId);
    stopwatchDisplay.innerHTML = "00 : 00 : 00"
    msec = sec = min = 0
})


function start() {
    msec++;
    if (msec == 100) {
        msec = 0;
        sec++;
        if (sec == 60) {
            sec = 0;
            min++;
        }
    }

    let msecString = msec < 10 ? `0${msec}` : msec;
    let secString = sec < 10 ? `0${sec}` : sec;
    let minString = min < 10 ? `0${min}` : min;

    stopwatchDisplay.innerHTML = `${minString} : ${secString} : ${msecString}`;

}


//_____________ Timer________________

const hourTimer = document.getElementById("hourTimer");
const minuteTimer = document.getElementById("minuteTimer");
const secondTimer = document.getElementById("secondTimer");

const startTimer = document.getElementById("start-timer");
const resetTimer = document.getElementById("reset-timer");

const displayTimer = document.getElementById("display")

var interval = null;
var total = 0;

totalValue = () => {
    total = Number(hourTimer.value) * 3600 + Number(minuteTimer.value) * 60 + Number(secondTimer.value);
}

function timer() {
    totalValue();
    total--;

    if (total >= 0) {
        var hr = Math.floor(total / 3600);
        var min = Math.floor((total / 60) - (hr * 60));
        var sec = total - ((hr * 3600) + (min * 60));

        hourTimer.value = hr;
        minuteTimer.value = min;
        secondTimer.value = sec;
    }
    else {
        displayTimer.innerText = "Time Over!!"

        blinking();
        function blinking() {
            let blinkTimer = document.getElementById("display");
            blinkTimer.style.opacity = blinkTimer.style.opacity == 0 ? 1 : 0;
        }
        playMusic();
        function playMusic() {
            let audio = new Audio("./assets/beep.mp3");
            audio.play();
        }
    }
}



startTimer.addEventListener('click', () => {
    let timerTimeHour = `${hourTimer.value}`
    let timerTimeMinute = `${minuteTimer.value}`
    let timerTimeSecond = `${secondTimer.value}`;
    console.log(timerTimeHour);
    if (timerTimeHour=="" && timerTimeMinute=="" && timerTimeSecond=="") {
        return alert("Please enter valid time");
    }
    else {
        clearInterval(interval);
        interval = setInterval(timer, 1000);

        displayTimer.innerText = "Timer Started";
    }

})

resetTimer.addEventListener('click', () => {
    clearInterval(interval);
    displayTimer.innerText = null

    hourTimer.value = null;
    minuteTimer.value = null;
    secondTimer.value = null;
})


//_______________ALARM CLOCK__________________

const currentTime = document.getElementById("now");
const content = document.querySelector(".content");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.getElementById("btn-alarm");

let alarmTime, isAlarmSet;
let ringtone = new Audio("./assets/alarm.mp3");

for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value = "${i}"> ${i} </option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value = "${ampm}"> ${ampm} </option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    ampm = "AM";
    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if (alarmTime === `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
    }

});

function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    console.log(time);
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        alert("Please, select a valid time to set Alarm!");
    }
    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
}

setAlarmBtn.addEventListener("click", setAlarm);


//_______________COUNTDOWN SECTION_________________




window.onload = () => {
    document.getElementById("calculate-countdown").onclick = calculateCountdown;
    document.getElementById("reset-countdown").onclick = reset;
}

function calculateCountdown() {

    const date = document.getElementById("date-countdown").value;
    const time = document.getElementById("time-countdown").value;
    const stop = document.getElementById("stop-countdown");

    const countdown = new Date(date + " " + time);
    console.log(countdown);

    if (countdown == "Invalid Date") {
        alert("Please enter valid date & time");
    }
    else {
        const interval = setInterval(() => {
            calculateTime(countdown);
        }, 1000);

        stop.addEventListener('click', () => {
            clearInterval(interval);
        })
    }

}

let done = document.querySelector(".done");

function calculateTime(countdown) {

    const now = new Date();
    const distance = (countdown - now) / 1000;

    const day = document.querySelector("#days-countdown");
    const hour = document.querySelector("#hours-countdown");
    const minute = document.querySelector("#mins-countdown");
    const second = document.querySelector("#secs-countdown");

    if (countdown > now) {

        day.innerText = Math.floor((distance) / (24 * 60 * 60));
        hour.innerText = Math.floor((distance / (60 * 60)) % (24));
        minute.innerText = Math.floor((distance / 60) % (60));
        second.innerText = Math.floor((distance) % (60));

    }
    else {

        day.innerText = 0;
        hour.innerText = 0;
        minute.innerText = 0;
        second.innerText = 0;
        done.innerHTML = "Timer Done";

        blinking();
        function blinking() {
            let blinkTimer = document.querySelector(".done");
            blinkTimer.style.opacity = blinkTimer.style.opacity == 0 ? 1 : 0;
        }

    }
}

function reset(interval) {
    document.querySelector("#days-countdown").innerText = 0;
    document.querySelector("#hours-countdown").innerText = 0;
    document.querySelector("#mins-countdown").innerText = 0;
    document.querySelector("#secs-countdown").innerText = 0;


    done.innerHTML = " ";
    clearInterval(interval);
}



