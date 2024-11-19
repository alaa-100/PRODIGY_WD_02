const stopwatch = document.getElementById('stopwatch');
const startBtn = document.getElementById('btn_start');
const pauseBtn = document.getElementById('btn_pause');
const lapBtn = document.getElementById('btn_lap');
const laps = document.getElementById('laps');
const buttons = document.getElementsByClassName('hidden');
var ms = 0, sec = 0, min = 0, hr = 0;
var lapId=1;
var timeOut = null;
var isPaused = false;

function start(flag) {
    if (flag) {
        startBtn.style.display = 'none';
        for (let button of buttons) {
            button.style.display = 'inline';
        }
    }

    timeOut = setTimeout(() => {
        ms = parseInt(ms);
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);

        ms++;

        if (ms === 100) {
            sec++;
            ms = 0;
        }
        if (sec === 60) {
            min++;
            sec = 0;
        }
        if (min === 60) {
            hr++;
            min = 0;
        }

        ms = ms < 10 ? '0' + ms : ms;
        sec = sec < 10 ? '0' + sec : sec;
        min = min < 10 ? '0' + min : min;
        hr = hr < 10 ? '0' + hr : hr;

        stopwatch.innerText = hr + ':' + min + ':' + sec + ':' + ms;

        if (!isPaused) {
            start(false);
        }
    }, 10);
}

function pause() {
    if (!isPaused) {
        clearTimeout(timeOut);
        pauseBtn.innerText = 'Resume';
    } else {
        pauseBtn.innerText = 'Pause';
        start(false);
    }
    isPaused = !isPaused;
}

function lap(){
    lapTime=stopwatch.innerText;
    var lapp=document.createElement('h5');
    lapp.innerText=`Lap${lapId}\t ${lapTime}`;
    laps.prepend(lapp);
    lapId++;
}

function reset() {
    ms = sec = min = hr = 0;
    clearTimeout(timeOut);
    stopwatch.innerText = '00:00:00:00';

    startBtn.style.display = 'inline';
    for (let button of buttons) 
        button.style.display = 'none';

    pauseBtn.innerText = 'Pause';
    isPaused = false;

    laps.innerHTML=''
    lapId=1
}

