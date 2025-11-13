import { createContext, useState, useContext } from "react";

const SideBarContext = createContext(null);

export function SideBarContextProvider({ children }) {
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);

    const toggleSideBar = () => setIsSideBarOpen(prev => !prev);
    const openSideBar = () => setIsSideBarOpen(true);
    const closeSideBar = () => setIsSideBarOpen(false);

    const contextValue = {
        isSideBarOpen,
        toggleSideBar,
        openSideBar,
        closeSideBar
    }

    return (
        <SideBarContext.Provider value={ contextValue }>
            {children}
        </SideBarContext.Provider>
    );
}

export const useSideBar = () => {
    return useContext(SideBarContext)
}
