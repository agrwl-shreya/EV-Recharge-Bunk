let map;

window.initMap = async function () {
  // Default center (you can set this to user's location or a city center)
  const center = { lat: 20.5937, lng: 78.9629 }; // Center of India

  // Create the map
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 5,
  });

  // Load bunk data from Firestore
  try {
    const snapshot = await firebase.firestore().collection("bunks").get();

    snapshot.forEach(doc => {
      const bunk = doc.data();

      // Check if the map location is valid
      if (bunk.latitude && bunk.longitude) {
        const position = {
          lat: parseFloat(bunk.latitude),
          lng: parseFloat(bunk.longitude)
        };

        const marker = new google.maps.Marker({
          position: position,
          map: map,
          title: bunk.bunkName || "EV Bunk"
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div>
              <strong>${bunk.bunkName}</strong><br>
              ${bunk.address}<br>
              Slots: ${bunk.totalSlots}<br>
              <a href="${bunk.mapLink}" target="_blank">Open in Google Maps</a>
            </div>
          `
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      }
    });
  } catch (err) {
    console.error("Error fetching bunk data:", err);
  }
};

// You must call initMap manually when Google Maps API loads
