import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "mycafe.db")

connection = sqlite3.connect(DB_PATH)
cursor = connection.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS orders (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name     TEXT    NOT NULL,
    phone    TEXT    NOT NULL,
    address  TEXT    NOT NULL,
    payment  TEXT    NOT NULL,
    items    TEXT    NOT NULL,
    total    REAL    NOT NULL,
    status   TEXT    NOT NULL DEFAULT 'Pending'
)
""")

# Add status column if upgrading an existing DB that doesn't have it yet
try:
    cursor.execute("ALTER TABLE orders ADD COLUMN status TEXT NOT NULL DEFAULT 'Pending'")
except Exception:
    pass  # Column already exists

connection.commit()
connection.close()
