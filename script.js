// Initialize EmailJS (replace with your EmailJS user ID)
emailjs.init("C7bixzSH_D-Qx6P7v");

// Front Page Logic
document.getElementById("startQuiz").addEventListener("click", () => {
  document.getElementById("frontPage").style.display = "none";
  startQuiz();
});

// Quiz Logic
const questions = [
  { question: "What is my favorite color?", options: ["Blue", "Red", "Green"], answer: "Green" },
  { question: "What is my favorite food?", options: ["Adobo", "Pork Binagoongan", "warek warek"], answer: "Pork Binagoongan" },
  { question: "What is my favorite sweets?", options: ["Cake", "Ice Cream", "Gummies"], answer: "Gummies" },
  { question: "What is my favorite part nga anguten hehehe", options: ["Kili kili", "Tengnged", "Ulo"], answer: "Kili kili" },
  { question: "What is my favorite drink?", options: ["Coke", "Coffee", "Mountain Dew"], answer: "Coke" },
  { question: "When is my birthday?", options: ["December 10th", "October 22nd", "December 8th"], answer: "December 8th" },
  { question: "What is something I can't live without?", options: ["Food", "You", "My coding projects"], answer: "You" },
  { question: "If I had to choose, would I pick cats or dogs?", options: ["cats", "dogs", "both"], answer: "both" },
  { question: "What is the game I am good at?", options: ["ML", "PUBG", "both"], answer: "both" },
  { question: "My biggest fear?", options: ["Tao nga ado", "Heights", "Sika"], answer: "Tao nga ado" },
  // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  document.getElementById("quiz").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  const quizQuestionsDiv = document.getElementById("quizQuestions");
  quizQuestionsDiv.innerHTML = `<p>${question.question}</p>`;
  question.options.forEach(option => {
    quizQuestionsDiv.innerHTML += `<label><input type="radio" name="q${currentQuestionIndex}" value="${option}"> ${option}</label><br>`;
  });
  document.getElementById("submitQuiz").style.display = "block";
}

document.getElementById("submitQuiz").addEventListener("click", () => {
  const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
  if (selectedOption) {
    if (selectedOption.value === questions[currentQuestionIndex].answer) {
      score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      document.getElementById("quiz").style.display = "none";
      showQuizResult();
      document.getElementById("drawing").style.display = "block";
    }
  } else {
    alert("Please select an answer!");
  }
});

// Show SweetAlert for Quiz Result
function showQuizResult() {
  Swal.fire({
    title: 'Quiz Completed!',
    text: `Your score is ${score} out of ${questions.length}.`,
    imageUrl: 'uploads/notif.gif', // Replace with your custom image URL
    imageWidth: 100,
    imageHeight: 100,
    confirmButtonText: 'OK'
  });
}

// Drawing Canvas Logic
const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;
let currentColor = "#e74c3c"; // Default color

// Color Picker
const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("input", (e) => {
  currentColor = e.target.value;
});

// Mouse Events
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
});

canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

// Touch Events
canvas.addEventListener("touchstart", (e) => {
  isDrawing = true;
  const touch = e.touches[0];
  ctx.beginPath();
  ctx.moveTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
  e.preventDefault(); // Prevent scrolling
});

canvas.addEventListener("touchmove", (e) => {
  if (isDrawing) {
    const touch = e.touches[0];
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
    ctx.stroke();
  }
  e.preventDefault(); // Prevent scrolling
});

canvas.addEventListener("touchend", () => (isDrawing = false));
canvas.addEventListener("touchcancel", () => (isDrawing = false));

// Clear Canvas
document.getElementById("clearCanvas").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Send Drawing Logic
document.getElementById("sendDrawing").addEventListener("click", () => {
  const image = canvas.toDataURL("image/png"); // Get the Base64 image data

  Swal.fire({
    title: 'Drawing Submitted!',
    text: 'Your drawing will be sent via email.',
    imageUrl: 'uploads/notif.gif', // Replace with your custom image URL
    imageWidth: 100,
    imageHeight: 100,
    confirmButtonText: 'OK'
  }).then(() => {
    emailjs.send("service_yw4i9mw", "template_kvv69n4", {
      to_email: "castillojvkhen@gmail.com",
      message: "Here's a drawing from your love!", // Include a message
      drawing: image // Include the Base64 image data
    })
    .then(() => {
      document.getElementById("drawing").style.display = "none";
      document.getElementById("letter").style.display = "block";
    })
    .catch((error) => {
      Swal.fire({
        title: 'Error!',
        text: 'There was an error sending your drawing. Please try again.',
        imageUrl: 'uploads/error.gif', // Replace with your custom error image URL
        imageWidth: 100,
        imageHeight: 100,
        confirmButtonText: 'OK'
      });
    });
  });
});

// Letter Logic
document.getElementById("sendLetter").addEventListener("click", () => {
  const letter = document.getElementById("letterContent").value;
  if (!letter) {
    alert("Please write a letter first!");
    return;
  }

  emailjs.send("service_yw4i9mw", "template_kvv69n4", {
    to_email: "castillojvkhen@gmail.com",
    message: letter,
  })
  .then(() => {
    Swal.fire({
      title: 'Letter Sent!',
      text: 'Your letter has been successfully sent!',
      imageUrl: 'uploads/notif.gif', // Replace with your custom image URL
      imageWidth: 100,
      imageHeight: 100,
      confirmButtonText: 'OK'
    }).then(() => {
      document.getElementById("letter").style.display = "none"; // Hide letter section after sending
      document.getElementById("finalMessage").style.display = "block"; // Show final message section

    });
  })
  .catch((error) => {
    Swal.fire({
      title: 'Error!',
      text: 'There was an error sending your letter. Please try again.',
      imageUrl: 'uploads/error.gif', // Replace with your custom error image URL
      imageWidth: 100,
      imageHeight: 100,
      confirmButtonText: 'OK'
    });
  });
});



// Define the startDrawing function
function startDrawing() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas for a fresh start
  isDrawing = false; // Reset drawing state
}