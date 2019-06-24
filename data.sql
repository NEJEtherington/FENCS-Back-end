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
  ('shapes', 'Geometry and shapes etc.', 'https:
//images.unsplash.com/photo-1532691900426-90f6909545f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'),
  ('objects', 'Assorted objects and tidbits', 'https:
//images.unsplash.com/photo-1560697043-f880bb028f1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1504&q=80'),
  ('animals', 'Dogs, cats and so much more', 'https:
//images.unsplash.com/photo-1459262838948-3e2de6c1ec80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1498&q=80'),
  ('people', 'Assorted members of the human race', 'https:
//images.unsplash.com/photo-1454923634634-bd1614719a7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'),
  ('architecture', 'Buildings and structures', 'https:
//images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' ),
  ('nature', 'Beautiful landscapes and nature scenes', 'https:
//images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'),
  ('transport', 'Planes, trains and automobiles', 'https:
//images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1749&q=80'),
  ('cities', 'Town and city-scapes', 'https:
//images.unsplash.com/photo-1498036882173-b41c28a8ba34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'),
  ('space', 'The cosmos', 'https:
//images.unsplash.com/photo-1446941611757-91d2c3bd3d45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=866&q=80'),
  ('tech', 'Gadgets, gizmos and devices', 'https:
//images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1414&q=80');


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
  ('Penguin', 'A majestic emperor penguin', 'penguin', 'shiva19173', '2019-06-13', 0, 'https://dl.dropboxusercontent.com/s/1hq5x1uzvpmtu99/emperorpenguin.png?dl=0', 'https://dl.dropboxusercontent.com/s/jr1u917pry6zrro/penguin.glb?dl=0', 'glb', 'animals'),
  ('Smoking man', 'A man lighting a cigarette', 'smoking man', 'fraserkemp', '2019-06-13', 0, 'https://dl.dropboxusercontent.com/s/5uprs5sil9p6p6y/Screenshot%202019-06-24%2012.11.25.png?dl=0', 'https://dl.dropboxusercontent.com/s/bca7nxi6vhrf3zj/smokingman.glb?dl=0', 'glb', 'people'),
  ('Stones', 'A pile of stones', 'stones', 'shiva19173', '2019-06-13', 0, 'https://dl.dropboxusercontent.com/s/2egr9bwbsb01b93/freestones.png?dl=0', 'https://dl.dropboxusercontent.com/s/1ysjff7c22kdueg/stones.glb?dl=0', 'glb', 'nature'),
  ('Turtle', 'A snapping turtle laying eggs', 'turtle', 'cpbattrick', '2019-06-13', 0, 'https://dl.dropboxusercontent.com/s/614eg8heq5lc9cc/Screenshot%202019-06-24%2012.09.41.png?dl=0', 'https://dl.dropboxusercontent.com/s/baagzbeplynbcxd/turtle.glb?dl=0)', 'glb', 'animals'),
  ('Pi', 'Our pi logo!', 'pi', 'nejetherington', '2019-06-13', 0, 'https://dl.dropboxusercontent.com/s/u235fosyc91mov4/pi.png?dl=0', 'https://dl.dropboxusercontent.com/s/dtzx4e0iivesmlq/pi.glb?dl=0', 'glb', 'shapes');
  