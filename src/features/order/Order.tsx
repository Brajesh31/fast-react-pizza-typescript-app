// Test ID: IIDSAT

import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getOrder, ICartItem } from "../../services/apiRestaurant";
import {
    calcMinutesLeft,
    formatCurrency,
    formatDate,
} from "../../utils/helpers";

// Define the type for the cart data
interface IOrder {
    id: string;
    customer: string;
    phone: string;
    address: string;
    priority: boolean;
    estimatedDelivery: string;
    cart: ICartItem[];
    position: string;
    orderPrice: number;
    priorityPrice: number;
}

//Define the
const order = {
    id: "ABCDEF",
    customer: "Jonas",
    phone: "123456789",
    address: "Arroios, Lisbon , Portugal",
    priority: true,
    estimatedDelivery: "2027-04-25T10:00:00",
    cart: [
        {
            pizzaId: 7,
            name: "Napoli",
            quantity: 3,
            unitPrice: 16,
            totalPrice: 48,
        },
        {
            pizzaId: 5,
            name: "Diavola",
            quantity: 2,
            unitPrice: 16,
            totalPrice: 32,
        },
        {
            pizzaId: 3,
            name: "Romana",
            quantity: 1,
            unitPrice: 15,
            totalPrice: 15,
        },
    ],
    position: "-9.000,38.000",
    orderPrice: 95,
    priorityPrice: 19,
};

function Order() {
    const order: IOrder = useLoaderData() as IOrder;

    // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
    const {
        id,
        status,
        priority,
        priorityPrice,
        orderPrice,
        estimatedDelivery,
        cart,
    } = order;

    const deliveryIn = calcMinutesLeft(estimatedDelivery);

    return (
        <div>
            <div>
                <h2>Status</h2>

                <div>
                    {priority && <span>Priority</span>}
                    <span>{status} order</span>
                </div>
            </div>

            <div>
                <p>
                    {deliveryIn >= 0
                        ? `Only ${calcMinutesLeft(
                              estimatedDelivery
                          )} minutes left 😃`
                        : "Order should have arrived"}
                </p>
                <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
            </div>

            <div>
                <p>Price pizza: {formatCurrency(orderPrice)}</p>
                {priority && (
                    <p>Price priority: {formatCurrency(priorityPrice)}</p>
                )}
                <p>
                    To pay on delivery:{" "}
                    {formatCurrency(orderPrice + priorityPrice)}
                </p>
            </div>
        </div>
    );
}

/* eslint-disable react-refresh/only-export-components */
export const loader = async ({
    params,
}: LoaderFunctionArgs): Promise<IOrder> => {
    const { orderId } = params;
    if (!orderId) throw new Error("Order ID is required");
    // Fetch order details or perform any other action with orderId
    const order = await getOrder(orderId);
    return order;
};

export default Order;
