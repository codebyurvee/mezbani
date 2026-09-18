from fastapi import APIRouter, HTTPException
from services.order_service import get_all_orders, update_order_status

router = APIRouter()


@router.get("/orders")
def get_orders():
    orders = get_all_orders()
    return {"orders": orders}


@router.patch("/orders/{order_id}/status")
def change_order_status(order_id: int, status: str):
    allowed_statuses = [
        "Pending",
        "Preparing",
        "Ready",
        "Out for Delivery",
        "Delivered",
    ]

    if status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid order status"
        )

    updated = update_order_status(order_id, status)

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return {
        "message": "Order status updated",
        "order_id": order_id,
        "status": status
    }
