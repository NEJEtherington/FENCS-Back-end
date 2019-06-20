DROP DATABASE IF EXISTS fencs;
CREATE DATABASE fencs;

\c fencs;

CREATE TABLE categories
(
  topic_id SERIAL PRIMARY KEY,
  slug VARCHAR (50),
  description VARCHAR(200)
);

CREATE TABLE images
(
  image_id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(200) NOT NULL,
  display_name VARCHAR(50) NOT NULL,
  posted_by VARCHAR(50) NOT NULL,
  date_uploaded BIGINT,
  price INT DEFAULT 0,
  thumbnail_url TEXT NOT NULL,
  obj_image_url TEXT NOT NULL,
  format VARCHAR(20) NOT NULL,
  likes INT DEFAULT 0,
  category VARCHAR(50)
);

CREATE TABLE users
(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  fullname VARCHAR(200) NOT NULL,
  email_address VARCHAR(100) NOT NULL,
  date_joined INT,
  location VARCHAR(100) NOT NULL,
  owns_printer BOOLEAN,
  designer_tag BOOLEAN,
  avatar TEXT,
  rating INT
);

INSERT INTO categories
  (slug, description)
VALUES
  ('shapes', 'Geometry and shapes etc.'),
  ('objects', 'Assorted objects and tidbits'),
  ('animals', 'Dogs, cats and so much more'),
  ('people', 'Assorted members of the human race');

INSERT INTO users
  (username, fullname, email_address, date_joined, location, owns_printer, designer_tag, avatar, rating)
VALUES
  ('nejetherington', 'nick etherington', 'nejetherington@thanks.com', 1560782954, 'Leeds', true, false, 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-512.png', 5),
  ('fraserkemp', 'fraser kemp', 'fraserkemp@thanks.com', 1560782954, 'Nottingham', false, true, 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-512.png' , 2),
  ('shiva19173', 'shiva heydaribeni', 'shiva', 1560782954, 'Salford', false, true, 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-512.png', 4),
  ('cpbattrick', 'charles battrick', 'cpbattrick@thanks.com', 1560782954, 'Newcastle', true, false, 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-512.png', 5),
  ('lizzyk', 'lizzy kerrigan', 'lizzyk@thanks.com', 1560782954, 'Manchester', false, true, 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-512.png', 5);

INSERT INTO images
  (title, description, display_name, posted_by, date_uploaded, price, thumbnail_url, obj_image_url, format, category)
VALUES
  ('Cube', 'A simple white cube', 'Cube', 'lizzyk', 1560782954, 0, 'https://media.sketchfab.com/urls/cc49b01d97e24a9989c8cbc75c418c0e/dist/thumbnails/ad9caea573f645dfbd42342b42ba6b77/5649afe244cb44f5bc9bc9ce9e9add2b.jpeg', 'https://sketchfab.com/models/cc49b01d97e24a9989c8cbc75c418c0e/embed', 'obj', 'shapes'),
  ('Chap', 'A white blobby chap with a moustache', 'Moustache chap', 'fraserkemp', 15690782954, 0, 'https://media.sketchfab.com/urls/b197e61c969a45ab971ae17e1b465b05/dist/thumbnails/b1ac83ed821c4098a968997c14033abc/7928c7ce63a74e2e8c9c8b55f6cadd63.jpeg', 'https://sketchfab.com/models/b197e61c969a45ab971ae17e1b465b05/embed', 'obj', 'people'),
  ('Dogtag', 'A nice shiny dogtag', 'Dogtag', 'fraserkemp', 1560782954, 0, 'https://media.sketchfab.com/urls/2ff47d9471a44b24bf54280c64e75b63/dist/thumbnails/fe38e5dd2bfe4f6ebd6cf698c8526b82/8ef25f73a59e4c5ca71dfa3625c27640.jpeg', 'https://sketchfab.com/models/2ff47d9471a44b24bf54280c64e75b63/embed', 'obj', 'objects'),
  ('Shell', 'A beautiful shell on a sandy beach', 'Sea shell', 'shiva19173', 1560782954, 25, 'https://media.sketchfab.com/urls/488e08875aed49fcad02c8012c4f892f/dist/thumbnails/dfdb5173b16b45078a57f5273539fcaa/484953e31d9d48f9b79efb6db0d59c3f.jpeg', 'https://sketchfab.com/models/488e08875aed49fcad02c8012c4f892f/embed', 'obj', 'objects'),
  ('Slinky', 'A majestic slinky', 'Slinky', 'lizzyk', 1560782954, 0, 'https://static.turbosquid.com/Preview/001295/482/3Q/_D.jpg', 'https://www.turbosquid.com/3d-models/3d-slinky-metal-rainbow-model-1295482', 'obj', 'objects'),
  ('Toast', 'A pile of slices of white toast', 'Toast slices', 'lizzyk', 1560782954, 0, 'https://static.turbosquid.com/Preview/2019/05/30__23_45_15/toasts02_01.pngFE423239-4498-46E3-8C5B-5747669FA9C4Default.jpg', 'https://www.turbosquid.com/FullPreview/Index.cfm/ID/1411908', 'obj', 'shapes');