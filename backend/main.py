from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import json
import os
import requests

from dotenv import load_dotenv
load_dotenv()

from routes.orders import router as orders_router


app = FastAPI()

ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:5174,http://localhost:5176"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(orders_router)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "mycafe.db")

PHONE_NUMBER_ID = os.getenv("PHONE_NUMBER_ID", "1371047999422998")
OWNER_PHONE     = os.getenv("OWNER_PHONE", "918556899621")


class Customer(BaseModel):
    name: str
    phone: str
    address: str
    payment: str


class OrderItem(BaseModel):
    id: int
    name: str
    price: float
    quantity: int


class Order(BaseModel):
    customer: Customer
    items: list[OrderItem]
    total: float


class WhatsAppOwnerNotification(BaseModel):
    customer_name: str
    customer_phone: str
    item_name: str
    address: str


@app.get("/")
def home():
    return {"message": "Mezbani API is running"}


@app.post("/orders")
def create_order(order: Order):
    connection = sqlite3.connect(DB_PATH)
    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO orders
        (name, phone, address, payment, items, total, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            order.customer.name,
            order.customer.phone,
            order.customer.address,
            order.customer.payment,
            json.dumps([item.model_dump() for item in order.items]),
            order.total,
            "Pending",
        )
    )

    connection.commit()
    order_id = cursor.lastrowid
    connection.close()

    return {
        "message": "Order saved successfully",
        "order_id": order_id,
        "order": order,
    }


@app.post("/send-order-notification-to-owner/")
def send_owner_notification(order: WhatsAppOwnerNotification):
    token = os.getenv("WHATSAPP_TOKEN")

    if not token:
        raise HTTPException(
            status_code=500,
            detail="WHATSAPP_TOKEN is not configured"
        )

    url = f"https://graph.facebook.com/v25.0/{PHONE_NUMBER_ID}/messages"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": OWNER_PHONE,
        "type": "text",
        "text": {
            "body": (
                f"🚨 *New Order Received!* ☕\n\n"
                f"👤 *Customer Name:* {order.customer_name}\n"
                f"🛍️ *Ordered Item:* {order.item_name}\n"
                f"📞 *Phone No:* {order.customer_phone}\n"
                f"📍 *Address:* {order.address}"
            )
        },
    }

    response = requests.post(url, json=payload, headers=headers, timeout=15)

    if response.status_code != 200:
        raise HTTPException(status_code=400, detail=response.json())

    return {
        "status": "Success",
        "message": "Owner notification sent successfully!",
    }
