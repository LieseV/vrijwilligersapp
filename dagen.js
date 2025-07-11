function loadDays() {
  const days = JSON.parse(localStorage.getItem("availableDays") || "[]");
  const list = document.getElementById("day-list");
  list.innerHTML = "";

  days.forEach((day, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-gray-100 px-4 py-2 rounded";

    li.innerHTML = `
      <span>${day}</span>
      <button class="text-red-500 hover:underline" onclick="removeDay(${index})">Verwijder</button>
    `;

    list.appendChild(li);
  });
}

function addDay() {
  const input = document.getElementById("new-day");
  const newDay = input.value.trim();
  if (!newDay) return;

  const days = JSON.parse(localStorage.getItem("availableDays") || "[]");
  days.push(newDay);
  localStorage.setItem("availableDays", JSON.stringify(days));

  input.value = "";
  loadDays();
}

function removeDay(index) {
  const days = JSON.parse(localStorage.getItem("availableDays") || "[]");
  days.splice(index, 1);
  localStorage.setItem("availableDays", JSON.stringify(days));
  loadDays();
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("add-day").addEventListener("click", addDay);
  loadDays();
});
