function groupByDay(responses) {
  const grouped = {};

  responses.forEach((entry) => {
    entry.days.forEach((d) => {
      if (!grouped[d.day]) {
        grouped[d.day] = [];
      }
      grouped[d.day].push({
        name: entry.name,
        preferred: d.preferred,
      });
    });
  });

  return grouped;
}

function loadOverview() {
  const responses = JSON.parse(localStorage.getItem("responses") || "[]");
  const availableDays = JSON.parse(localStorage.getItem("availableDays") || "[]");
  const container = document.getElementById("day-overview");
  container.innerHTML = "";

  if (responses.length === 0) {
    container.innerHTML = `<p class="italic text-gray-500">Geen gegevens beschikbaar.</p>`;
    return;
  }

  const grouped = groupByDay(responses);

  availableDays.forEach((day) => {
    const section = document.createElement("div");

    section.innerHTML = `
      <h2 class="text-lg font-semibold mb-2">${day}</h2>
      <ul class="list-disc list-inside space-y-1">
        ${
          grouped[day]
            ? grouped[day]
                .map((entry) =>
                  entry.preferred
                    ? `<li>⭐ ${entry.name} <span class="text-sm text-gray-500">(voorkeur)</span></li>`
                    : `<li>${entry.name}</li>`
                )
                .join("")
            : `<li class="text-gray-500 italic">Niemand beschikbaar</li>`
        }
      </ul>
    `;

    container.appendChild(section);
  });
}

function clearAllResponses() {
  if (confirm("Ben je zeker dat je alles wilt wissen?")) {
    localStorage.removeItem("responses");
    loadOverview();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadOverview();
  document.getElementById("clear-data").addEventListener("click", clearAllResponses);
});

