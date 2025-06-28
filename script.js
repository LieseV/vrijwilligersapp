document.getElementById("availability-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();

  const dayCheckboxes = document.querySelectorAll("input[name='day']");
  const prefCheckboxes = document.querySelectorAll("input[name='preference']");

  const selectedDays = [];
  const preferences = [];

  dayCheckboxes.forEach((cb) => {
    if (cb.checked) selectedDays.push(cb.value);
  });

  prefCheckboxes.forEach((cb) => {
    if (cb.checked) preferences.push(cb.value);
  });

  if (!name || selectedDays.length === 0) {
    alert("Vul je naam in en selecteer minstens 1 dag.");
    return;
  }

  const data = JSON.parse(localStorage.getItem("availability") || "[]");
  data.push({ name, days: selectedDays, preferences });
  localStorage.setItem("availability", JSON.stringify(data));

  alert("Bedankt voor je inzending!");
  this.reset();
});
