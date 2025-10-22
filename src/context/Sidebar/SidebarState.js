import React, { createContext, useCallback, useReducer } from "react";

import SidebarReducer from "./SidebarReducer";

// Initial state

const initialState = {
  open: true,
  collapsed: false,
};

// Create context
export const SidebarContext = createContext(initialState);

// Provider component
export const SidebarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SidebarReducer, initialState);
  const openSidebar = useCallback((isOpen) => {
    dispatch({
      type: "OPEN_SIDEBAR",
      payload: isOpen,
    });
  }, []);
  const toggleStatusSidebar = useCallback(() => {
    dispatch({
      type: "TOGGLE_STATUS_SIDEBAR",
    });
  }, []);
  const collapseMenu = useCallback((isCollapsed) => {
    dispatch({
      type: "COLLAPSE_MENU",
      payload: isCollapsed,
    });
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        open: state.open,
        collapsed: state.collapsed,
        openSidebar,
        toggleStatusSidebar,
        collapseMenu,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
