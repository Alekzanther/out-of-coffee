#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER docker;
    CREATE DATABASE docker;
    GRANT ALL PRIVILEGES ON DATABASE docker TO postgres;
		CREATE TABLE IF NOT EXISTS items (
					id INTEGER UNIQUE PRIMARY KEY,
					name TEXT UNIQUE NOT NULL,
					link TEXT,
					category TEXT
		);
		CREATE TABLE IF NOT EXISTS base_order (
					item_id INTEGER PRIMARY KEY REFERENCES items(id),
					quantity TEXT,
					frequency_per_week INTEGER default 1
		);
		CREATE TABLE IF NOT EXISTS orders (
					id SERIAL PRIMARY KEY UNIQUE,
					timestamp TEXT UNIQUE,
					status TEXT
		);
		CREATE TABLE IF NOT EXISTS order_items (
					item_id INTEGER REFERENCES items(id),
					order_id INTEGER REFERENCES orders(id),
					quantity TEXT,
					PRIMARY KEY (item_id, order_id)
		);
EOSQL
