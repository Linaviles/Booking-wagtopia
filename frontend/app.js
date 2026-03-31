const API = "http://localhost:3000";

async function loadGroomers() {
  const res = await fetch(`${API}/groomers`);
  const groomers = await res.json();

  const select = document.getElementById("groomer");

  groomers.forEach(g => {
    const option = document.createElement("option");
    option.value = g.id;
    option.textContent = g.name;
    select.appendChild(option);
  });
}

document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const parentName = document.getElementById("parentName").value;
  const dogName = document.getElementById("dogName").value;
  const service = document.getElementById("service").value;
  const time = document.getElementById("time").value;
  const groomerId = document.getElementById("groomer").value;

  const res = await fetch(`${API}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      parentName,
      dogName,
      service,
      time,
      groomerId: parseInt(groomerId)
    })
  });

  const data = await res.json();

  if (data.error) {
    alert(data.error);
  } else {
    alert("Booking successful!");
  }
});

loadGroomers();