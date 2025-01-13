document.getElementById('startButton').addEventListener('click', startTimer);

function startTimer() {
  let time = parseInt(document.getElementById('timeInput').value);
  if (isNaN(time) || time <= 0) {
    alert('Please enter a valid number greater than 0');
    return;
  }

  const timeDisplay = document.getElementById('timeDisplay');
  timeDisplay.textContent = time; // Set initial time on the display

  const interval = setInterval(function () {
    time--;
    timeDisplay.textContent = time;

    if (time <= 0) {
      clearInterval(interval);
      alert('Time is up!');
    }
  }, 1000); // 1000 ms = 1 second
}