import { FC } from 'react';
import { Link } from 'react-router-dom';
import SearchOrder from '../../features/order/SearchOrder';
import Username from '../../features/user/Username';

const Header: FC = () => {
    return (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-500 bg-yellow-400 px-4 py-4 uppercase sm:px-6">
            <Link to="/" className="tracking-widest">
                Fast React Pizza Co.
            </Link>
            <SearchOrder />
            <Username />
        </header>
    );
};

export default Header;
