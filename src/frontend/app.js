document.addEventListener("DOMContentLoaded", () => {
    const resetBtn = document.getElementById("reset-btn");
    const queryGenreBtn = document.getElementById("query-genre-btn");
    const genreInput = document.getElementById("genre-input");

    const db = new PouchDB('jazz_pins');
    const URL = "http://127.0.0.1:3000";


    async function fetchArtistsByGenre(genre) {
        try {
            const response = await fetch(`${URL}/artists?genre=${genre}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const artists = await response.json();
            return artists;
        } catch (error) {
            console.error('Error fetching artists by genre:', error);
            alert(`An error occurred: ${error.message}`);
            return []; // Return an empty array or handle the error as needed
        }
    }

    function addPin(lat, lng, info) {
        addMarker(lat, lng, info);
        db.put({
            _id: new Date().toISOString(),
            lat,
            lng,
            info
        });
    }

    function loadPins() {
        db.allDocs({ include_docs: true, descending: true }, (err, doc) => {
            doc.rows.forEach(row => {
                const { lat, lng, info } = row.doc;
                addMarker(lat, lng, info);
            });
        });
    }

    async function queryGenre() {
        const genre = genreInput.value.trim();
        if (!genre) return alert("Please enter a genre");

        const artists = await fetchArtistsByGenre(genre);
        console.log(artists);
        artists.forEach(artist => {
            addPin(artist.latitude, artist.longitude, {
                name: artist.name,
                description: artist.description,
                genres: artist.genres,
                image: artist.image
            });
        });
    }

    resetBtn.addEventListener("click", () => {
        db.destroy().then(() => {
            location.reload();
        });
    });

    queryGenreBtn.addEventListener("click", queryGenre);

    document.getElementById("add-pin-btn").addEventListener("click", () => {
        const lat = parseFloat(prompt("Enter latitude:"));
        const lng = parseFloat(prompt("Enter longitude:"));
        if (!isNaN(lat) && !isNaN(lng)) {
            addMarker(lat, lng); // Call the addMarker function to place the pin
        } else {
            alert("Invalid coordinates. Please enter numeric values for latitude and longitude.");
        }
    });

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
    .addEventListener("click", () => navigate("google-map-view"));
    document
    .getElementById("about-btn")
    .addEventListener("click", () => navigate("about-view"));

    // functions to call for startup of website
    navigate("google-map-view");
    loadPins();
});