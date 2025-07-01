function loadDays() {
  const days = JSON.parse(localStorage.getItem("availableDays") || "[]");
  const form = document.getElementById("availability-form");
  form.innerHTML = "";

  days.forEach((day) => {
    const id = `day-${day.replace(/\s+/g, "-")}`;

    const div = document.createElement("div");
    div.className = "flex items-center gap-4 justify-between border border-gray-200 p-2 rounded";

    div.innerHTML = `
      <div class="flex items-center gap-2">
        <input type="checkbox" id="${id}" name="days" value="${day}" class="h-4 w-4 day-checkbox" />
        <label for="${id}" class="text-sm">${day}</label>
      </div>
      <div class="flex items-center gap-2">
        <input type="checkbox" id="pref-${id}" class="h-4 w-4 preference-checkbox" disabled />
        <label for="pref-${id}" class="text-xs text-gray-600">Voorkeur</label>
      </div>
    `;

    form.appendChild(div);
  });

  form.querySelectorAll(".day-checkbox").forEach((checkbox) => {
    const prefCheckbox = form.querySelector(`#pref-${checkbox.id}`);
    checkbox.addEventListener("change", () => {
      prefCheckbox.disabled = !checkbox.checked;
      if (!checkbox.checked) prefCheckbox.checked = false;
    });
  });
}

function submitAvailability() {
  const name = document.getElementById("volunteer-name").value.trim();
  if (!name) {
    alert("Vul je naam in.");
    return;
  }

  const responses = JSON.parse(localStorage.getItem("responses") || "[]");
  const selected = [];

  document.querySelectorAll(".day-checkbox").forEach((checkbox) => {
    if (checkbox.checked) {
      const pref = document.querySelector(`#pref-${checkbox.id}`).checked;
      selected.push({ day: checkbox.value, preferred: pref });
    }
  });

  if (selected.length === 0) {
    alert("Duid minstens één dag aan.");
    return;
  }

  responses.push({ name, days: selected });
  localStorage.setItem("responses", JSON.stringify(responses));

  alert("Bedankt! Je beschikbaarheid is opgeslagen.");

  document.getElementById("volunteer-name").value = "";
  document.querySelectorAll("input[type='checkbox']").forEach((el) => {
    el.checked = false;
    el.disabled = el.classList.contains("preference-checkbox");
  });
}

// 🔐 Admin login logic
const ADMIN_PASSWORD = "vzwHippofarm1"; // ← verander dit wachtwoord indien gewenst

function checkAdminAccess() {
  const hasAccess = localStorage.getItem("adminAccess") === "true";
  if (hasAccess) {
    document.getElementById("admin-section").classList.remove("hidden");
  }
}

document.getElementById("admin-login").addEventListener("click", () => {
  const pw = prompt("Wachtwoord voor admin-toegang:");
  if (pw === ADMIN_PASSWORD) {
    localStorage.setItem("adminAccess", "true");
    document.getElementById("admin-section").classList.remove("hidden");
    alert("Admin toegang verleend ✅");
  } else {
    alert("Fout wachtwoord ❌");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  loadDays();
  document
    .getElementById("submit-availability")
    .addEventListener("click", submitAvailability);
  checkAdminAccess();
});

