DROP TABLE IF EXISTS settings cascade;

CREATE TABLE settings (
  id INTEGER PRIMARY KEY,
  server_url VARCHAR(250) NOT NULL,
);

