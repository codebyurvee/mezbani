import sqlite3

connection = sqlite3.connect("mycafe.db")
cursor = connection.cursor()

cursor.execute("""
ALTER TABLE orders
ADD COLUMN status TEXT NOT NULL DEFAULT 'Pending'
""")

connection.commit()
connection.close()

print("Status column added successfully!")