// -----------get time functions-----------

const currentYear = new Date().getFullYear();

document.getElementsByClassName("copyright")[0].innerText =
  `Copyright © ${currentYear}`;

function setGreeting(el) {
  const hour = new Date().getHours();
  let greeting = "";

  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  el.textContent = greeting;
}

// Watch for DOM changes
const observer = new MutationObserver(() => {
  const els = document.querySelectorAll(".goodDay");
  els.forEach((el) => {
    if (!el.dataset.greeted) {
      setGreeting(el);
      el.dataset.greeted = "true";
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
function getAlert() {
  alert("This section is under construction.");
}
// -----------api requests------------api requests---------
function chuckUp() {
  fetch("https://api.chucknorris.io/jokes/random")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Proceed to parse JSON
    })
    .then((data) => {
      // console.log(data.value)
      const imageElement = document.getElementById("norrisJoke");
      imageElement.textContent = data.value;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function jokeUp() {
  fetch("https://v2.jokeapi.dev/joke/Any?type=twopart")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parse the response body as JSON
      return response.json();
    })
    .then((data) => {
      console.log("Joke data:", data.delivery);

      const jokeElement = document.getElementById("justJokes");
      jokeElement.innerHTML = data.setup;
      const delivery = document.getElementById("bottomJoke");
      delivery.innerHTML = data.delivery;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function techUp() {
  fetch("https://techy-api.vercel.app/api/text")
    .then((response) => {
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parse the response as text
      return response.text();
    })
    .then((textData) => {
      // Use the text data
      // console.log(textData);
      const page = document.getElementById("techJoke");
      page.innerText = textData;
      // You can then manipulate this textData,
      // for example, by displaying it in an HTML element:
      // document.getElementById('output').innerText = textData;
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch operation
      console.error("Error fetching the text file:", error);
    });
}
