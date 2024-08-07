import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

// Create (insert new artist)
export async function createArtist(name, description, genres, image, latitude, longitude) {
    const sql = "INSERT INTO artists (name, description, genres, image, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await pool.execute(sql, [name, description, genres, image, latitude, longitude]);
    return result;
}

// Read (get all artists for testing purposes)
export async function getAllArtists() {
    const [rows] = await pool.query("SELECT * FROM artists");
    return rows;
}

// Read (get artists by genre)
export async function getArtistsByGenre(genre) {
    const sql = "SELECT * FROM artists WHERE FIND_IN_SET(?, genres)";
    const [rows] = await pool.execute(sql, [genre]);
    return rows;
}

// Update (update artist info)
export async function updateArtist(id, name, description, genres, image, latitude, longitude) {
    const sql = "UPDATE artists SET name = ?, description = ?, genres = ?, image = ?, latitude = ?, longitude = ? WHERE id = ?";
    const [result] = await pool.execute(sql, [name, description, genres, image, latitude, longitude, id]);
    return result;
}

// Delete (delete artist)
export async function deleteArtist(id) {
    const sql = "DELETE FROM artists WHERE id = ?";
    const [result] = await pool.execute(sql, [id]);
    return result;
}

// Test the functions
(async () => {
    // await createArtist("Miles Davis", "A highly influential jazz bandleader and trumpeter at the forefront of the jazz movement.", "bebop, cool jazz, modal jazz, fusion jazz", "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSTAIBJCIJfgiMj1FCWWGk-DPz88YqzCW6wZS62S21t6ymMQ9Gr", 38.62, -90.19);
    // await createArtist("John Coltrane", "A legendary tenor saxophonist known for his innovative work in jazz.", "hard bop, modal jazz, free jazz, avant-garde jazz", "https://www.selmer.fr/cdn/shop/articles/1136623-coltrane-5e0f2c2e2bf44.jpg?v=1678131201", 39.95, -75.16);

    // Get artists by genre
    // let artists = await getAllArtists();
    let artists = await getArtistsByGenre("modal jazz");
    console.log(artists);
})();