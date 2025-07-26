document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addBunkForm');
  const msg = document.getElementById('adminMsg');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const bunkName = document.getElementById('bunkName').value.trim();
      const address = document.getElementById('address').value.trim();
      const mobile = document.getElementById('mobile').value.trim();
      const mapLink = document.getElementById('mapLink').value.trim();
      const totalSlots = parseInt(document.getElementById('totalSlots').value.trim());

      if (!bunkName || !address || !mobile || !mapLink || isNaN(totalSlots)) {
        msg.textContent = "Please fill in all fields correctly.";
        return;
      }

      const coords = extractLatLng(mapLink);

      const bunkData = {
        bunkName,
        address,
        mobile,
        mapLink,
        totalSlots,
        availableSlots: totalSlots,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };

      if (coords) {
        bunkData.latitude = coords.latitude;
        bunkData.longitude = coords.longitude;
      }

      try {
        await firebase.firestore().collection('bunks').add(bunkData);
        msg.textContent = "EV bunk added successfully!";
        form.reset();
      } catch (error) {
        console.error("Error adding bunk:", error);
        msg.textContent = "Error adding bunk. Check console for details.";
      }
    });
  }
});

// Extract latitude & longitude from Google Maps URL
function extractLatLng(url) {
  try {
    const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (match) {
      return {
        latitude: parseFloat(match[1]),
        longitude: parseFloat(match[2])
      };
    }
  } catch (e) {
    console.warn("Could not extract lat/lng from URL:", url);
  }
  return null;
}

// Logout
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  }).catch((error) => {
    console.error("Logout failed:", error);
  });
}

window.logout = logout;
