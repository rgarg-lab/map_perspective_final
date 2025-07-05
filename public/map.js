const map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
let clickedLocation = null;
let countryCode = null;
map.on('click', async function (e) {
  clickedLocation = { lat: e.latlng.lat, lng: e.latlng.lng };
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${clickedLocation.lat}&lon=${clickedLocation.lng}&format=json`;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'LeafletNewsProject/1.0' }
    });
    const data = await res.json();
    clickedLocation.place = data.display_name || "Unknown location";
    countryCode = data.address?.country_code || null;
    L.popup().setLatLng(clickedLocation)
      .setContent(`<strong>${clickedLocation.place}</strong><br>Lat: ${clickedLocation.lat.toFixed(2)}<br>Lng: ${clickedLocation.lng.toFixed(2)}`)
      .openOn(map);
    console.log("📍 Clicked Location:", clickedLocation.place);
    console.log("🌍 Country Code:", countryCode);
  } catch (error) {
    console.error("Error fetching place name:", error);
  }
});