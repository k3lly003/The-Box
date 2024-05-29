/*MATRIX RAIN CODES*/
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.height = 1500;
canvas.width = 1270;

var texts = "01010110101010".split("");

var fontSize = 13;
var columns = canvas.width / fontSize;
var drops = [];
for (var x = 0; x < columns; x++) {
  drops[x] = 1;
}
setInterval(draw, 33);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px arial";
  for (var i = 0; i < drops.length; i++) {
    var text = texts[Math.floor(Math.random() * texts.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

/*TO REDICT TO HOSTED PAGES*/
/*for my port*/
let myport = document.getElementById("project-row")[0];
mamacare.addEventListener("click", function () {
  window.location.href = "https://main--myportfolio-kelly.netlify.app/";
});

/*for mamacare*/
let mamacare = document.getElementById("project-row")[2];
mamacare.addEventListener("click", function () {
  window.location.href = "https://infant-healthy-assurance-63vs.vercel.app/";
});
/*JS WRITTING WORDS ANIME*/
const textContainer = document.getElementsByClassName("auto-input");
const texts = [
  "Hey there!",
  "Welcome to the text typing example.",
  "I hope you find it helpful!",
];

let index = 0;
let currentText = "";
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
  if (index >= texts.length) {
    index = 0;
  }

  if (index < texts.length) {
    currentText = isDeleting
      ? texts[index].substring(0, currentText.length - 1)
      : texts[index].substring(0, currentText.length + 1);

    textContainer.textContent = currentText;

    typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentText === texts[index]) {
      isDeleting = true;
      typingSpeed = 1500;
    } else if (isDeleting && currentText === "") {
      isDeleting = false;
      index++;
      typingSpeed = 20;
    }

    setTimeout(typeText, typingSpeed);
  }
}
typeText();

//integration of the form
const form = document.getElementById("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nameField = document.getElementById("userName");
  const emailField = document.getElementById("userEmail");
  const messageField = document.getElementById("in-msg");
  const nameValue = nameField.value;
  const emailValue = emailField.value;
  const messageValue = messageField.value;
  const response = await fetch(
    "https://vast-plum-indri-tutu.cyclic.cloud/api/v1/contact",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameValue,
        email: emailValue,
        message: messageValue,
      }),
    }
  );
  //log the data in console
  const Data = await response.json();
  console.log(Data);
  nameField.value = "";
  emailField.value = "";
  messageField.value = "";
  // Display alert based on response
  if (response.ok) {
    window.alert("Email sent successfully.");
  } else {
    window.alert("Email was not sent. Please try again later.");
  }
});
