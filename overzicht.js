function loadResponses() {
  const responses = JSON.parse(localStorage.getItem("responses") || "[]");
  const tableBody = document.getElementById("response-table");
  tableBody.innerHTML = "";

  if (responses.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td class="border px-4 py-2 italic text-gray-500" colspan="2">Geen gegevens gevonden.</td>`;
    tableBody.appendChild(row);
    return;
  }

  responses.forEach((entry) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.className = "border px-4 py-2 font-medium";
    nameCell.textContent = entry.name;

    const daysCell = document.createElement("td");
    daysCell.className = "border px-4 py-2";
    daysCell.textContent = entry.days.join(", ");

    row.appendChild(nameCell);
    row.appendChild(daysCell);
    tableBody.appendChild(row);
  });
}

function clearAllResponses() {
  if (confirm("Ben je zeker dat je alle gegevens wilt verwijderen?")) {
    localStorage.removeItem("responses");
    loadResponses();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadResponses();
  document.getElementById("clear-data").addEventListener("click", clearAllResponses);
});
