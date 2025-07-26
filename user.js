document.addEventListener('DOMContentLoaded', async () => {
  const bunkList = document.getElementById("bunkList");

  try {
    const snapshot = await firebase.firestore().collection("bunks").get();
    if (snapshot.empty) {
      bunkList.innerHTML = "<p>No EV recharge bunks found.</p>";
      return;
    }

    snapshot.forEach(doc => {
      const bunk = doc.data();
      const div = document.createElement("div");
      div.style.marginBottom = "20px";
      div.innerHTML = `
        <strong>${bunk.bunkName}</strong><br>
        Address: ${bunk.address}<br>
        Mobile: ${bunk.mobile}<br>
        Total Slots: ${bunk.totalSlots}<br>
        Available Slots: ${bunk.availableSlots}<br>
        <a href="${bunk.mapLink}" target="_blank">View on Map</a>
      `;
      bunkList.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading bunk list:", err);
    bunkList.innerHTML = "<p>Error loading bunk list. Try again later.</p>";
  }
});

// Logout button logic
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  }).catch((error) => {
    console.error("Logout failed:", error);
  });
}

window.logout = logout;
