CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS activities (
  activity_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  first_price REAL NOT NULL,
  second_price REAL,
  third_price REAL,
  is_social_deal BOOLEAN NOT NULL DEFAULT 0,
  min_player INTEGER NOT NULL,
  max_player INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  reservation_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  firstname TEXT NOT NULL,
  nbr_pers INTEGER NOT NULL,
  group_type TEXT NOT NULL,
  date TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_id TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS activity_res (
  activity_res_id INTEGER PRIMARY KEY AUTOINCREMENT,
  reservation_id INTEGER NOT NULL,
  activity_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (reservation_id) REFERENCES bookings(reservation_id),
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id)
);

CREATE TABLE IF NOT EXISTS food (
  food_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  category TEXT NOT NULL
);