DROP DATABASE IF EXISTS fencs;
CREATE DATABASE fencs;

SET TIME ZONE
'GMT';

\c fencs;


CREATE TABLE categories
(
  topic_id SERIAL PRIMARY KEY,
  slug VARCHAR (50),
  description VARCHAR(200),
  img_url TEXT NOT NULL
);

CREATE TABLE images
(
  image_id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(200) NOT NULL,
  display_name VARCHAR(50) NOT NULL,
  posted_by VARCHAR(50) NOT NULL,
  date_uploaded DATE NOT NULL DEFAULT CURRENT_DATE,
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
  date_joined DATE NOT NULL DEFAULT CURRENT_DATE,
  location VARCHAR(100) NOT NULL,
  owns_printer BOOLEAN,
  designer_tag BOOLEAN,
  avatar TEXT,
  rating INT
);

INSERT INTO categories
  (slug, description, img_url)
VALUES
  ('shapes', 'Geometry and shapes etc.', 'https://dl.dropboxusercontent.com/s/gldwerv64dehp31/shapes.jpeg?dl=0'),
  ('objects', 'Assorted objects and tidbits', 'https://dl.dropboxusercontent.com/s/vgrmo3iiywiwhnr/objects.jpeg?dl=0'),
  ('animals', 'Dogs, cats and so much more', 'https://dl.dropboxusercontent.com/s/ksn0rhd6l7u336z/animals.jpeg?dl=0'),
  ('people', 'Assorted members of the human race', 'https://dl.dropboxusercontent.com/s/ypgvicoooy96p0q/people.jpeg?dl=0'),
  ('architecture', 'Buildings and structures', 'https://dl.dropboxusercontent.com/s/dnbmz05mroj2y0s/architecture.jpeg?dl=0' ),
  ('nature', 'Beautiful landscapes and nature scenes', 'https://dl.dropboxusercontent.com/s/uwzz9zvqi1g4f6s/nature.jpeg?dl=0'),
  ('transport', 'Planes, trains and automobiles', 'https://dl.dropboxusercontent.com/s/0dty45qakmy3vwc/transport.jpeg?dl=0'),
  ('cities', 'Town and city-scapes', 'https://dl.dropboxusercontent.com/s/0mp8efvucwh5jg0/cities.jpeg?dl=0'),
  ('space', 'The cosmos', 'https://dl.dropboxusercontent.com/s/meq4j4vbh4eo6g1/space.jpeg?dl=0'),
  ('tech', 'Gadgets, gizmos and devices', 'https://dl.dropboxusercontent.com/s/zjlfqgzu7akc3hk/tech.jpeg?dl=0');


INSERT INTO users
  (username, fullname, email_address, date_joined, location, owns_printer, designer_tag, avatar, rating)
VALUES
  ('nejetherington', 'nick etherington', 'nejetherington@thanks.com', '2019-06-13', 'Leeds', true, false, 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-512.png', 5),
  ('fraserkemp', 'fraser kemp', 'fraserkemp@thanks.com', '2019-06-13', 'Nottingham', false, true, 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-512.png' , 2),
  ('shiva19173', 'shiva heydaribeni', 'shiva', '2019-06-13', 'Salford', false, true, 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-512.png', 4),
  ('cpbattrick', 'charles battrick', 'cpbattrick@thanks.com', '2019-06-13', 'Newcastle', true, false, 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-512.png', 5),
  ('lizzyk', 'lizzy kerrigan', 'lizzyk@thanks.com', '2019-06-13', 'Manchester', false, true, 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-512.png', 5);

INSERT INTO images
  (title, description, display_name, posted_by, date_uploaded, price, thumbnail_url, obj_image_url, format, category)
VALUES
  ('Safe', 'A sturdy safe for storing precious items', 'safe', 'lizzyk', '2019-06-13', 0, 'https://dl.dropboxusercontent.com/s/gux00o21r1dj61f/antiqueironsafe.png?dl=0', 'https://dl.dropboxusercontent.com/s/drp9tjtqjpc4lw8/out.glb?dl=0', 'glb', 'objects'
),
  ('Skull', 'A head bone', 'skull', 'nejetherington', '2019-06-13', 0, 'https://dl.dropboxusercontent.com/s/ssh77gl7b6afpyh/Screenshot%202019-06-24%2012.14.36.png?dl=0', 'https://dl.dropboxusercontent.com/s/7d4ayvnel7u9ikt/skull.glb?dl=0', 'glb', 'people'),
  ('Cube', 'A simple cube', 'cube', 'lizzyk', '2019-06-13', 0, 'https://dl.dropboxusercontent.com/s/7h78ork0itwggld/Screenshot%202019-06-24%2012.23.22.png?dl=0', 'https://dl.dropboxusercontent.com/s/kj3xa7aybu8247m/cube.glb?dl=0', 'glb', 'shapes'),
  ('Hammer', 'An old hammer', 'hammer', 'fraserkemp', '2019-06-13', 0, 'https://dl.dropboxusercontent.com/s/lpnprxfsg1plur1/hammer.png?dl=0', 'https://dl.dropboxusercontent.com/s/s6h7j11rukhzu76/hammer.glb?dl=0', 'glb', 'objects'),
  ('Penguin', 'A majestic emperor penguin', 'penguin', 'shiva19173', '2019-06-13', 0, 'https://dl.dropboxusercontent.com/s/me7lbrncxxaa74m/Screenshot%202019-06-24%2015.39.56.png?dl=0', 'https://dl.dropboxusercontent.com/s/8f7rloczpm8i0m9/penguin%28new%29.glb?dl=0', 'glb', 'animals'),
  ('Smoking man', 'A man lighting a cigarette', 'smoking man', 'fraserkemp', '2019-06-13', 0, 'https://dl.dropboxusercontent.com/s/f3ephuupjj1mp29/Screenshot%202019-06-24%2015.20.20.png?dl=0', 'https://dl.dropboxusercontent.com/s/bca7nxi6vhrf3zj/smokingman.glb?dl=0', 'glb', 'people'),
  ('Stones', 'A pile of stones', 'stones', 'shiva19173', '2019-06-13', 0, 'https://dl.dropboxusercontent.com/s/2egr9bwbsb01b93/freestones.png?dl=0', 'https://dl.dropboxusercontent.com/s/1ysjff7c22kdueg/stones.glb?dl=0', 'glb', 'nature'),
  ('Turtle', 'A snapping turtle laying eggs', 'turtle', 'cpbattrick', '2019-06-13', 0, 'https://dl.dropboxusercontent.com/s/614eg8heq5lc9cc/Screenshot%202019-06-24%2012.09.41.png?dl=0', 'https://dl.dropboxusercontent.com/s/baagzbeplynbcxd/turtle.glb?dl=0)', 'glb', 'animals'),
  ('Pi', 'Our pi logo!', 'pi', 'nejetherington', '2019-06-13', 0, 'https://dl.dropboxusercontent.com/s/u235fosyc91mov4/pi.png?dl=0', 'https://dl.dropboxusercontent.com/s/dtzx4e0iivesmlq/pi.glb?dl=0', 'glb', 'shapes');
  