function loadDays() {
  const days = JSON.parse(localStorage.getItem("availableDays") || "[]");
  const form = document.getElementById("availability-form");
  form.innerHTML = "";

  days.forEach((day) => {
    const id = `day-${day.replace(/\s+/g, "-")}`;

    const div = document.createElement("div");
    div.className = "flex items-center gap-2";

    div.innerHTML = `
      <input type="checkbox" id="${id}" name="days" value="${day}" class="h-4 w-4" />
      <label for="${id}" class="text-sm">${day}</label>
    `;

    form.appendChild(div);
  });
}

function submitAvailability() {
  const name = document.getElementById("volunteer-name").value.trim();
  const selected = Array.from(document.querySelectorAll('input[name="days"]:checked')).map(
    (el) => el.value
  );

  if (!name || selected.length === 0) {
    alert("Gelieve je naam in te vullen én minstens één dag te selecteren.");
    return;
  }

  const responses = JSON.parse(localStorage.getItem("responses") || "[]");
  responses.push({ name, days: selected });
  localStorage.setItem("responses", JSON.stringify(responses));

  alert("Bedankt! Je beschikbaarheid is opgeslagen.");
  document.getElementById("volunteer-name").value = "";
  document.querySelectorAll('input[name="days"]').forEach((el) => (el.checked = false));
}

window.addEventListener("DOMContentLoaded", () => {
  loadDays();
  document.getElementById("submit-availability").addEventListener("click", submitAvailability);
});
