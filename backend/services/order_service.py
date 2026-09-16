import sqlite3
import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "mycafe.db")


def get_all_orders():
    connection = sqlite3.connect(DB_PATH)
    cursor = connection.cursor()

    cursor.execute("""
        SELECT id, name, phone, address, payment, items, total, status
        FROM orders
        ORDER BY id DESC
    """)

    rows = cursor.fetchall()
    connection.close()

    orders = []
    for row in rows:
        orders.append({
            "id":      row[0],
            "name":    row[1],
            "phone":   row[2],
            "address": row[3],
            "payment": row[4],
            "items":   json.loads(row[5]),
            "total":   row[6],
            "status":  row[7],
        })

    return orders


def update_order_status(order_id, status):
    connection = sqlite3.connect(DB_PATH)
    cursor = connection.cursor()

    cursor.execute(
        "UPDATE orders SET status = ? WHERE id = ?",
        (status, order_id)
    )

    connection.commit()
    updated = cursor.rowcount > 0
    connection.close()

    return updated
