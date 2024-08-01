document.addEventListener("DOMContentLoaded", () => {
    const resetBtn = document.getElementById("reset-btn");
    const usMap = document.getElementById("us-map");

    // Load pins from local storage
    loadPins();

    // Event listener for reset button
    resetBtn.addEventListener("click", () => {
        localStorage.removeItem("pins");
        document.querySelectorAll(".pin").forEach(pin => pin.remove());
    });
    
    // Add a pin to the map on click
    usMap.addEventListener("click", (event) => {
        const x = event.offsetX;
        const y = event.offsetY;
        addPin(x, y);
        savePin(x, y);
    });

    function addPin(x, y) {
        const pin = document.createElement("div");
        pin.className = "pin";
        pin.style.left = `${x}px`;
        pin.style.top = `${y}px`;
        pin.addEventListener("click", () => {
            alert("This is where information about this region's musician information will be presented.");
        });
        usMap.parentElement.appendChild(pin);
    }

    function savePin(x, y) {
        const pins = JSON.parse(localStorage.getItem("pins")) || [];
        pins.push({ x, y });
        localStorage.setItem("pins", JSON.stringify(pins));
    }

    function loadPins() {
        const pins = JSON.parse(localStorage.getItem("pins")) || [];
        pins.forEach(pin => addPin(pin.x, pin.y));
    }

    function navigate(viewId) {
        // Hide all views
        document.querySelectorAll(".view").forEach((view) => {
          view.style.display = "none";
        });
    
        // Show the requested view
        document.getElementById(viewId).style.display = "block";
    }

    document
    .getElementById("back-btn")
    .addEventListener("click", () => navigate("map-view"));
    document
    .getElementById("about-btn")
    .addEventListener("click", () => navigate("about-view"));

    navigate("map-view");

    window.initMap = function() {
        const map = new google.maps.Map(document.getElementById("google-map"), {
            center: { lat: 39.8283, lng: -98.5795 }, // longitude and latitude centered at US!
            zoom: 4,
        });

        map.addListener("click", (event) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            addGoogleMapPin(map, lat, lng);
            saveGoogleMapPin(lat, lng);
        });

        loadGoogleMapPins(map);
    }
});