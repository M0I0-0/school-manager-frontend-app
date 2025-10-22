import React, { useContext } from "react";

import Container from "@material-ui/core/Container";
import { SidebarContext } from "../../../context/Sidebar/SidebarState";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const ResponsiveContent = (props) => {
  const matches = useMediaQuery("(min-width:800px)");
  const { open } = useContext(SidebarContext);

  let toggleClass = "";
  if (matches && open) {
    toggleClass = " main-container__shift ";
  }
  if (matches && !open) {
    toggleClass = " main-container__mini-shift ";
  }
  return (
    <Container maxWidth={false} className={"main-container " + toggleClass} style={{ padding: 0 }}>
      {props.children}
    </Container>
  );
};

export default ResponsiveContent;
