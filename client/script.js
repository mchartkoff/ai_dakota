
const continueBtn = document.getElementById('continue')
const Btn = document.getElementById('') // from chat.html
const startBtn = document.getElementById('start')

function startChat() {
    window.location.href = `./chat.html`;
}

function showSchedule() {
    window.location.href = `./schedule.html`;
}

function startProject() {
    window.location.href = `./day.html`;
}

continueBtn.addEventListener('click', startChat)
Btn.addEventListener('click', showSchedule)
startBtn.addEventListener('click', startProject)