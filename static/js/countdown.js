// Countdown Timer State
var TimerState = {
    remaining: 60,
    total: 60,
    intervalId: null,
    isRunning: false
};

// DOM references
var timerDisplay = null;
var btnStart = null;
var btnReset = null;

function init() {
    // Cache DOM elements
    timerDisplay = document.getElementById('timer-display');
    btnStart = document.getElementById('btn-start');
    btnReset = document.getElementById('btn-reset');

    // Bind events
    btnStart.addEventListener('click', handleStart);
    btnReset.addEventListener('click', handleReset);

    // Initial display
    updateDisplay();
}

function updateDisplay() {
    timerDisplay.textContent = TimerState.remaining;

    // Warning state: <= 10 seconds, red pulse
    if (TimerState.remaining <= 10 && TimerState.remaining > 0) {
        timerDisplay.classList.add('warning');
        timerDisplay.classList.remove('finished');
    } else if (TimerState.remaining === 0) {
        timerDisplay.classList.remove('warning');
        timerDisplay.classList.add('finished');
    } else {
        timerDisplay.classList.remove('warning');
        timerDisplay.classList.remove('finished');
    }
}

function handleStart() {
    // Prevent double-click when already running
    if (TimerState.isRunning) {
        return;
    }

    // Cannot start when already at 0 — must reset first
    if (TimerState.remaining <= 0) {
        return;
    }

    TimerState.isRunning = true;
    btnStart.disabled = true;

    TimerState.intervalId = setInterval(function () {
        TimerState.remaining -= 1;
        updateDisplay();

        if (TimerState.remaining <= 0) {
            handleComplete();
        }
    }, 1000);
}

function handleComplete() {
    clearInterval(TimerState.intervalId);
    TimerState.intervalId = null;
    TimerState.isRunning = false;
    btnStart.disabled = false;
}

function handleReset() {
    // Clear any running interval
    if (TimerState.intervalId !== null) {
        clearInterval(TimerState.intervalId);
        TimerState.intervalId = null;
    }

    TimerState.remaining = 60;
    TimerState.isRunning = false;
    btnStart.disabled = false;
    updateDisplay();
}

// Clean up interval on page unload
window.addEventListener('beforeunload', function () {
    if (TimerState.intervalId !== null) {
        clearInterval(TimerState.intervalId);
        TimerState.intervalId = null;
    }
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
