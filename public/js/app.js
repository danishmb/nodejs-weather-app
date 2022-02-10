// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const fetchWeatherAPI = (address) => {
  return new Promise((reject, resolve) => {
    fetch(`/weather?address=${address}`).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            reject(data.error);
          } else {
            resolve(data);
          }
        });
      }
    );
  });
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  messageOne.textContent = "loading...";
  messageTwo.textContent = "";

  fetchWeatherAPI(search.value).then(
    (error) => {
      messageOne.textContent = error;
    },
    (value) => {
      messageOne.textContent = value.location;
      messageTwo.textContent = value.forecast;
    }
  );
});
