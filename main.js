const toast = document.querySelector(".toast");
const closeIcon = document.querySelector(".close");
const progress = document.querySelector(".progress");
const moreLink = document.querySelector(".more");

const colorBtns = document.querySelectorAll(".color");
const darkModeBtn = document.querySelector(".dark");
const lightModeBtn = document.querySelector(".light");

let timer1, timer2;

function showToast(duration) {
  toast.classList.add("active");
  progress.classList.add("active");

  timer1 = setTimeout(() => {
    toast.classList.remove("active");
  }, duration); // Hide toast after the specified duration

  document.documentElement.style.setProperty(
    "--progress-time",
    duration + "ms"
  );
  console.log(
    document.documentElement.style.getPropertyValue("--progress-time")
  );

  timer2 = setTimeout(() => {
    progress.classList.remove("active");
  }, duration + 300);
}

closeIcon.addEventListener("click", () => {
  toast.classList.remove("active");

  setTimeout(() => {
    progress.classList.remove("active");
  }, 300);

  clearTimeout(timer1);
  clearTimeout(timer2);
});

colorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let mainColor = btn.getAttribute("data-color");
    let pulseColor = btn.getAttribute("data-pulse");

    document.documentElement.style.setProperty("--main-color", mainColor);
    document.documentElement.style.setProperty("--pulse-color", pulseColor);

    colorBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");
  });
});

darkModeBtn.addEventListener("click", () => {
  toast.classList.add("dark");
  darkModeBtn.classList.add("active");
  lightModeBtn.classList.remove("active");
});

lightModeBtn.addEventListener("click", () => {
  toast.classList.remove("dark");
  darkModeBtn.classList.remove("active");
  lightModeBtn.classList.add("active");
});

// Different reminders
const reminders = [
  {
    time: 20000, // 20 seconds
    title: "20-20-20 Rule",
    message: "Every 20 minutes, look at something 20 feet away for 20 seconds.",
  },
  {
    time: 10000, // 10 seconds
    title: "Ergonomics",
    message:
      "Check your sitting and desk position. Ensure your back, neck, and wrists are properly aligned.",
  },
  {
    time: 15000, // 15 seconds
    title: "Workspace Setup",
    message: "Make sure your workspace is ergonomic and comfortable.",
  },
  {
    time: 5000, // 25 seconds
    title: "Break Time",
    message:
      "Take a 15-minute break. Drink water and walk around to improve blood circulation.",
  },
];

function displayReminder(reminder) {
  toast.querySelector(".text-1").textContent = reminder.title;
  toast.querySelector(".text-2").textContent = reminder.message;
  showToast(reminder.time);
}

let reminderIndex = 0;

function cycleReminders() {
  displayReminder(reminders[reminderIndex]);
  setTimeout(() => {
    reminderIndex = (reminderIndex + 1) % reminders.length;
    cycleReminders();
  }, reminders[reminderIndex].time + 5000); // Change to the desired interval in milliseconds
}

cycleReminders(); // Start cycling reminders

// Customize link for additional information
moreLink.addEventListener("click", (e) => {
  e.preventDefault();
  const reminder = reminders[reminderIndex - 1];
  alert(`More details about: ${reminder.title}\n${reminder.message}`);
});
