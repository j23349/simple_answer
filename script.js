// script.js
let timeout = null;
let timerInterval = null;
let elapsedTime = 0;

document.getElementById("inputField").addEventListener("input", function () {
  clearTimeout(timeout);
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateTimer();
  if (document.getElementById("icon")) {
    // document.getElementById("icon").classList.remove("ok");
      // alert(data['choices'][0]['message']['content'])
  const output = document.getElementById("icon").textContent = '◌'
  }
  timeout = setTimeout(() => {
    const inputValue = document.getElementById("inputField").value;
    if (inputValue) {
      const inputValue = document.getElementById("inputField").value;
      if (document.getElementById("icon")) {
        const output = document.getElementById("icon").textContent = '✔'
       // document.getElementById("icon").classList.add("ok");
      }
      callApi(inputValue);
      clearInterval(timerInterval);
    }
  }, 2000);

  timerInterval = setInterval(() => {
    elapsedTime += 100;
    updateTimer();
  }, 100);
});

function updateTimer() {
  document.getElementById("timer").textContent = `計時器: ${elapsedTime} 毫秒`;
}

async function callApi(query) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    }
  };
  try {
    const response = await fetch(
      "https://faas-sgp1-18bc02ac.doserverless.co/api/v1/web/fn-a806b418-be12-4d67-aef7-885393424404/Test/Test?item=" + query ,
      options
    );
    // .then(response =>  displayResult(response.json()))

    const data = await response.json();
    displayResult(data);
    // .then(response => console.log(response))
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayResult(data) {
  // alert(data['choices'][0]['message']['content'])
  const output = document.getElementById("output");
  // output.textContent = JSON.stringify(data, null, 2);
  output.textContent = data["choices"][0]["message"]["content"];
}
