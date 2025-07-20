import { FC } from "react";
import { formatCurrency } from "../../utils/helpers";
import type { TMenu } from "../../services/apiRestaurant";

interface IMenuItemProps {
    pizza: TMenu;
}

const MenuItem: FC<IMenuItemProps> = ({ pizza }) => {
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

    return (
        <li>
            <img src={imageUrl} alt={name} />
            <div>
                <p>{name}</p>
                <p>{ingredients.join(", ")}</p>
                <div>
                    {!soldOut ? (
                        <p>{formatCurrency(unitPrice)}</p>
                    ) : (
                        <p>Sold out</p>
                    )}
                </div>
            </div>
        </li>
    );
};

export default MenuItem;
