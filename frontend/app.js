const API = "http://localhost:3000";

async function laodGroomers(){
    const res = await fetch(`${API}/groomers`);
    const groomers = await res.json();

    const select = document.getElementById("groomer");

    groomers.forEach(g => {
        const option = document.createElement("option");
        ption.value = g.id;
        option.textContent = g.name;
        select.appendChild(option);
    });
}

document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const dogName = document.getElementById("dogName").value;
  const time = document.getElementById("time").value;
  const groomerId = document.getElementById("groomer").value;

  const res = await fetch(`${API}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      dogName,
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