const display = document.getElementById("stopwatchScreen");
const controls = document.getElementById("buttonContainer");

let centiseconds = 0;
let sec = 0;
let min = 0;
let hr = 0;
let intervalId = null;

function renderTime() {
    centiseconds++;
    if (centiseconds >= 100) {
        centiseconds = 0;
        sec++;
    }
    if (sec >= 60) {
        sec = 0;
        min++;
    }
    if (min >= 60) {
        min = 0;
        hr++;
    }
    if (hr >= 100) {
        centiseconds = 0;
        sec = 0;
        min = 0;
        hr = 0;
    }
    const cs = centiseconds < 10 ? "0" + centiseconds : centiseconds;
    const s = sec < 10 ? "0" + sec : sec;
    const m = min < 10 ? "0" + min : min;
    const h = hr < 10 ? "0" + hr : hr;
    display.textContent = `${h} : ${m} : ${s} : ${cs}`;
}

function handleStart() {
    if (intervalId !== null) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(renderTime, 10);
    showStopResetButtons();
}

function handleStop() {
    if (intervalId !== null) clearInterval(intervalId);
    intervalId = null;
    showResumeResetButtons();
}

function handleReset() {
    handleStop();
    centiseconds = 0;
    sec = 0;
    min = 0;
    hr = 0;
    renderTime();
    showStartButton();
}

function showStopResetButtons() {
    controls.innerHTML = `
        <button class="stop fade-in" onclick="handleStop()">Stop</button>
        <button class="reset fade-in" onclick="handleReset()">Reset</button>
    `;
}

function showResumeResetButtons() {
    controls.innerHTML = `
        <button class="start fade-in" onclick="handleStart()">Resume</button>
        <button class="reset fade-in" onclick="handleReset()">Reset</button>
    `;
}

function showStartButton() {
    controls.innerHTML = `
        <button id="startBtn" class="start fade-in" onclick="handleStart()">Start</button>
    `;
}

// Initialize display and button
renderTime();
showStartButton();
