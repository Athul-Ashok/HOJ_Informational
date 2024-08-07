CREATE DATABASE artists_app;
USE artists_app;

CREATE TABLE artists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    genres TEXT NOT NULL,
    image TEXT NOT NULL,
    latitude FLOAT,
    longitude FLOAT
);

-- INSERT INTO artists (name, description, genres, image, latitude, longitude)
-- VALUES
-- ("Miles Davis", "One of the most influential jazz musicians at the forefront of the jazz era. A talented trumpeter and bandleader who spearheaded several sub-genres of jazz.", "bebop, cool jazz, modal jazz, fusion jazz", "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSTAIBJCIJfgiMj1FCWWGk-DPz88YqzCW6wZS62S21t6ymMQ9Gr", 40, -74);