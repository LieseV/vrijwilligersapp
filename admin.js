const data = JSON.parse(localStorage.getItem("availability") || "[]");
const tbody = document.querySelector("#table tbody");

data.forEach(({ name, days, preferences }) => {
  const tr = document.createElement("tr");

  const tdName = document.createElement("td");
  tdName.className = "border px-4 py-2";
  tdName.textContent = name;

  const tdDays = document.createElement("td");
  tdDays.className = "border px-4 py-2";

  // Markeer voorkeurdagen met een ster
  const dayList = days.map((day) => {
    return preferences && preferences.includes(day) ? `${day} ⭐` : day;
  });

  tdDays.textContent = dayList.join(", ");

  tr.appendChild(tdName);
  tr.appendChild(tdDays);
  tbody.appendChild(tr);
});
