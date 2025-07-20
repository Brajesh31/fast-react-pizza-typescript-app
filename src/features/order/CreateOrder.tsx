import { useState } from 'react';
import {
    ActionFunction,
    Form,
    redirect,
    useActionData,
    useNavigation,
} from 'react-router-dom';
import { createOrder, ICartItem, IOrder } from '../../services/apiRestaurant';

interface IFormErrors {
    phone?: string;
}

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string): boolean => {
    return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str,
    );
};

const fakeCart = [
    {
        pizzaId: 12,
        name: 'Mediterranean',
        quantity: 2,
        unitPrice: 16,
        totalPrice: 32,
    },
    {
        pizzaId: 6,
        name: 'Vegetale',
        quantity: 1,
        unitPrice: 13,
        totalPrice: 13,
    },
    {
        pizzaId: 11,
        name: 'Spinach and Mushroom',
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
    },
];

const CreateOrder: React.FC = () => {
    // const [withPriority, setWithPriority] = useState(false);
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const formErrors = useActionData() as IFormErrors;

    const cart = fakeCart;

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     const form = event.currentTarget;
    //     const phoneInput = form.phone.value;
    //     if (!isValidPhone(phoneInput)) {
    //         event.preventDefault();
    //         alert("Please enter a valid phone number.");
    //     }
    // };

    return (
        <div>
            <h2>Ready to order? Let's go!</h2>

            <Form method="POST">
                <div>
                    <label>First Name</label>
                    <input type="text" name="customer" required />
                </div>

                <div>
                    <label>Phone number</label>
                    <div>
                        <input type="tel" name="phone" />
                    </div>
                    {formErrors?.phone && <p>{formErrors.phone}</p>}
                </div>

                <div>
                    <label>Address</label>
                    <div>
                        <input type="text" name="address" required />
                    </div>
                </div>

                <div>
                    <input
                        type="checkbox"
                        name="priority"
                        id="priority"
                        // value={withPriority}
                        // onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <button
                        disabled={isSubmitting}
                        className="inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Placing order...' : 'Order now'}
                    </button>
                </div>
            </Form>
        </div>
    );
};

/* eslint-disable react-refresh/only-export-components */
export const action: ActionFunction = async ({ request }) => {
    const formData: FormData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        const order: IOrder = {
            customer: data.customer as string,
            phone: data.phone as string,
            address: data.address as string,
            priority: data.priority === 'on',
            cart: JSON.parse(data.cart as string) as ICartItem[],
        };

        const errors: IFormErrors = {};
        if (!isValidPhone(order.phone)) {
            errors.phone = 'Please enter a valid phone number.';
        }

        if (Object.keys(errors).length > 0) {
            return errors;
        }

        //if everything is ok, create the order and redirect to the order page
        const newOrder = await createOrder(order);
        return redirect(`/order/${newOrder.id}`);
    } catch (error) {
        console.error('Failed too process the order: ', error);
        throw new Error('Invalid form data.');
    }
};

export default CreateOrder;
