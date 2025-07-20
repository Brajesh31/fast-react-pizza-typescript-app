import { FC } from "react";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { getMenu, TMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

const Menu: FC = () => {
    const menu = useLoaderData() as TMenu[];
    return (
        <ul>
            {menu.map((pizza: TMenu) => (
                <MenuItem pizza={pizza} key={pizza.id} />
            ))}
        </ul>
    );
};

/* eslint-disable react-refresh/only-export-components */
export const loader: LoaderFunction = async (): Promise<TMenu[]> => {
    const menu = await getMenu();
    return menu;
};

export default Menu;
