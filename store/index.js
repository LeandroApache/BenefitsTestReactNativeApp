import {createContext, useState} from "react";

export const RootContext = createContext({
    currentCategory: 0,
    changeCategory: (id) => {}
})

export default function ContextProvider({children}) {
    const [currentCategory, setCurrentCategory] = useState(0);

    function changeCategory(id) {
        setCurrentCategory(id);
    }

    const value = {
        currentCategory,
        changeCategory: changeCategory
    }

    return <RootContext.Provider value={value}>{children}</RootContext.Provider>
}
