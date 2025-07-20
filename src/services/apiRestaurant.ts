const API_URL = "https://react-fast-pizza-api.onrender.com/api";

export type TMenu = {
    id: number | string;
    imageUrl: string;
    ingredients: string[];
    name: string;
    soldOut: boolean;
    unitPrice: number;
};

// Define the type for an individual cart item
export interface ICartItem {
    pizzaId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface IOrder {
    customer: string;
    phone: string;
    address: string;
    priority: boolean;
    cart: ICartItem[];
}

export async function getMenu(): Promise<TMenu[]> {
    const res = await fetch(`${API_URL}/menu`);

    // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
    if (!res.ok) throw Error("Failed getting menu");

    const { data }: { data: TMenu[] } = await res.json();
    return data;
}

export async function getOrder(id: string) {
    const res = await fetch(`${API_URL}/order/${id}`);
    if (!res.ok) throw Error(`Couldn't find order #${id}`);

    const { data } = await res.json();

    return data;
}

export async function createOrder(
    newOrder: IOrder
): Promise<IOrder & { id: string }> {
    try {
        const res = await fetch(`${API_URL}/order`, {
            method: "POST",
            body: JSON.stringify(newOrder),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) throw Error();
        const { data } = await res.json();
        return data;
    } catch {
        throw Error("Failed creating your order");
    }
}

export async function updateOrder(id, updateObj) {
    try {
        const res = await fetch(`${API_URL}/order/${id}`, {
            method: "PATCH",
            body: JSON.stringify(updateObj),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) throw Error();
        // We don't need the data, so we don't return anything
    } catch (err) {
        throw Error("Failed updating your order");
    }
}
