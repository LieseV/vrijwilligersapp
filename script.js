document.getElementById("availability-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const checkboxes = document.querySelectorAll("#days input[type='checkbox']");
  const selectedDays = [];
  checkboxes.forEach((cb) => {
    if (cb.checked) selectedDays.push(cb.value);
  });

  if (!name || selectedDays.length === 0) {
    alert("Vul je naam in en selecteer minstens 1 dag.");
    return;
  }

  const data = JSON.parse(localStorage.getItem("availability") || "[]");
  data.push({ name, days: selectedDays });
  localStorage.setItem("availability", JSON.stringify(data));

  alert("Bedankt voor je inzending!");
  this.reset();
});
