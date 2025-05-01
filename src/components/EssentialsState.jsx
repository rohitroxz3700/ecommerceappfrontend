import { useState } from "react";

const useEssentialsState = () => {
    const [selectedCategoryProducts, setSelectedCategoryProducts] = useState([]);
    return { selectedCategoryProducts, setSelectedCategoryProducts };
};

export default useEssentialsState;