const API = "http://localhost:3000";

async function loadGroomers() {
  const res = await fetch(`${API}/groomers`);
  const groomers = await res.json();

  const select = document.getElementById("groomerSelect");

  groomers.forEach(g => {
    const option = document.createElement("option");
    option.value = g.id;
    option.textContent = g.name;
    select.appendChild(option);
  });

  loadSchedule(select.value);

  select.addEventListener("change", () => {
    loadSchedule(select.value);
  });
}

async function loadSchedule(groomerId) {
  const res = await fetch(`${API}/groomers/${groomerId}/bookings`);
  const bookings = await res.json();

  const container = document.getElementById("schedule");
  container.innerHTML = "";

  if (bookings.length === 0) {
    container.textContent = "No bookings yet.";
    return;
  }

  bookings.forEach(b => {
    const div = document.createElement("div");
    div.className = "card";

    const time = new Date(b.time).toLocaleString();

    div.innerHTML = `
      <strong>${time}</strong><br/>
      Parent: ${b.parentName}<br/>
      Dog: ${b.dogName}<br/>
      Service: ${b.service}
    `;

    container.appendChild(div);
  });
}

loadGroomers();