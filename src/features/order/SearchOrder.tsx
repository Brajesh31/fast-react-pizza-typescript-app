import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder: FC = () => {
    const [query, setQuery] = useState<string>();
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!query) return;
        navigate(`/order/${query}`);
        setQuery("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search order #"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </form>
    );
};

export default SearchOrder;
