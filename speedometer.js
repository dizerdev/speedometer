const speedElement = document.querySelector('#speed');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');

let watchID = null;
let currentRide = null;

startButton.addEventListener('click', () => {
  if (watchID) return;

  function handleSuccess(position) {
    addPosition(currentRide, position);
    console.log(position);
    speedElement.innerText = position.coords.speed
      ? (position.coords.speed * 3.6).toFixed(1)
      : 0;
  }

  function handleError(error) {
    console.log(error.msg);
  }

  const options = { enableHighAccuracy: true };

  currentRide = createNewRide();

  watchID = navigator.geolocation.watchPosition(
    handleSuccess,
    handleError,
    options
  );

  startButton.classList.add('d-none');
  stopButton.classList.remove('d-none');
});

stopButton.addEventListener('click', () => {
  if (!watchID) return;

  navigator.geolocation.clearWatch(watchID);
  watchID = null;
  updateStopTime(currentRide);
  currentRide = null;
  startButton.classList.remove('d-none');
  stopButton.classList.add('d-none');

  window.location.href = './';
});
