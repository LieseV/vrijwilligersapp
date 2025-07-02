const ADMIN_PASSWORD = "vzwHippofarm1";

function loadDays() {
  const days = JSON.parse(localStorage.getItem("availableDays") || "[]");
  const form = document.getElementById("availability-form");
  form.innerHTML = "";

  days.forEach((day) => {
    const id = `day-${day.replace(/\s+/g, "-")}`;

    const div = document.createElement("div");
    div.className =
      "flex flex-col sm:flex-row sm:items-center justify-between border border-gray-200 p-2 rounded gap-2";

    div.innerHTML = `
      <div class="flex items-center gap-2">
        <input type="checkbox" id="${id}" name="days" value="${day}" class="h-5 w-5 day-checkbox" />
        <label for="${id}" class="text-sm select-none">${day}</label>
      </div>
      <div class="flex items-center gap-2 ml-1">
        <input type="checkbox" id="pref-${id}" class="h-5 w-5 preference-checkbox" disabled />
        <label for="pref-${id}" class="text-xs text-gray-600 select-none">Voorkeur</label>
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
  const code = document.getElementById("volunteer-code").value.trim();

  if (!name || !code) {
    alert("Vul zowel je naam als toegangscode in.");
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

  const existingIndex = responses.findIndex((r) => r.name === name);

  if (existingIndex !== -1) {
    const existing = responses[existingIndex];
    if (existing.code !== code) {
      alert("Toegangscode klopt niet. Probeer opnieuw.");
      return;
    }
    responses[existingIndex] = { name, days: selected, code };
  } else {
    responses.push({ name, days: selected, code });
  }

  localStorage.setItem("responses", JSON.stringify(responses));
  alert("Je beschikbaarheid is opgeslagen of bijgewerkt!");

  document.getElementById("volunteer-name").value = "";
  document.getElementById("volunteer-code").value = "";
  document.querySelectorAll("input[type='checkbox']").forEach((el) => {
    el.checked = false;
    el.disabled = el.classList.contains("preference-checkbox");
  });
}

function checkAdminAccess() {
  const hasAccess = localStorage.getItem("adminAccess") === "true";
  if (hasAccess) {
    const adminSection = document.getElementById("admin-section");
    if (adminSection) {
      adminSection.classList.remove("hidden");
    }
  }
}

function setupAdminLogin() {
  const loginBtn = document.getElementById("admin-login");
  if (!loginBtn) return;

  loginBtn.addEventListener("click", () => {
    const pw = prompt("Wachtwoord voor admin-toegang:");
    if (pw === ADMIN_PASSWORD) {
      localStorage.setItem("adminAccess", "true");
      document.getElementById("admin-section").classList.remove("hidden");
      alert("Admin toegang verleend ✅");
    } else {
      alert("Fout wachtwoord ❌");
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  loadDays();
  setupAdminLogin();
  checkAdminAccess();

  const submitBtn = document.getElementById("submit-availability");
  if (submitBtn) {
    submitBtn.addEventListener("click", submitAvailability);
  }
});

