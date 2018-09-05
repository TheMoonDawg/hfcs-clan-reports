CREATE TABLE ninja
(
    ninja_id INTEGER PRIMARY KEY,
    display_name TEXT NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE report
(
    id SERIAL PRIMARY KEY,
    clan_id TEXT NOT NULL,
    clan_name TEXT,
    clan_motto TEXT,
    clan_mission_statement TEXT,
    notes TEXT,
    ninja_id INTEGER REFERENCES ninja(ninja_id),
    judgment TEXT NOT NULL,
    report_date TIMESTAMP NOT NULL
);

CREATE TABLE token
(
    ninja_id INTEGER REFERENCES ninja(ninja_id),
    access_token TEXT NOT NULL,
    refresh_token TEXT NOT NULL,
    cookie_token TEXT NOT NULL
);

-- Add region column to ninja
ALTER TABLE ninja
ADD COLUMN region TEXT NOT NULL DEFAULT 'English';

-- Add region column to report
ALTER TABLE report
ADD COLUMN region TEXT NOT NULL DEFAULT 'English';
