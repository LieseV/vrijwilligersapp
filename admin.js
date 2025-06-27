const data = JSON.parse(localStorage.getItem("availability") || "[]");
const tbody = document.querySelector("#table tbody");

data.forEach(({ name, days }) => {
  const tr = document.createElement("tr");
  const tdName = document.createElement("td");
  tdName.className = "border px-4 py-2";
  tdName.textContent = name;

  const tdDays = document.createElement("td");
  tdDays.className = "border px-4 py-2";
  tdDays.textContent = days.join(", ");

  tr.appendChild(tdName);
  tr.appendChild(tdDays);
  tbody.appendChild(tr);
});
