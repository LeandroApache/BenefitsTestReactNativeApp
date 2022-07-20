import {createContext, useState} from "react";

export const RootContext = createContext({
    currentCategory: 0,
    ids: [],
    changeCategory: (id) => {},
    addToFavorites: () => {},
    removeFromFavorites: () => {},
})

export default function ContextProvider({children}) {
    const [currentCategory, setCurrentCategory] = useState(0);
    const [favoriteIds, setFavoriteIds] = useState([]);

    function changeCategory(id) {
        setCurrentCategory(id);
    }

    function addToFavorites(id) {
        setFavoriteIds(prevState => {
            return [...prevState, id];
        })
    }

    function removeFromFavorites(id) {
        const updatedFavorites = favoriteIds.filter(benId => benId !== id);
        setFavoriteIds(updatedFavorites);
    }

    const value = {
        currentCategory,
        ids: favoriteIds,
        changeCategory: changeCategory,
        addToFavorites: addToFavorites,
        removeFromFavorites: removeFromFavorites,
    }

    return <RootContext.Provider value={value}>{children}</RootContext.Provider>
}
