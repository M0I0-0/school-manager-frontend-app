import "./Sidebar.css";

import React, { useCallback, useContext, useEffect, useRef, useState } from "react";

import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";
import { SidebarContext } from "../../../context/Sidebar/SidebarState";
import Slide from "@material-ui/core/Slide";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Logo = () => {
  const { collapsed } = useContext(SidebarContext);

  return (
    <>
      <Slide direction={"right"} in={!collapsed}>
        <Grid item>
          <Link to="/">
            <img
              alt="School Manager"
              src={"/assets/images/landscape.png"}
              style={{
                height: "4.5em",
                width: "11.5em",
                margin: "0 2.5rem 0 1.5rem",
                display: !collapsed ? "" : "none",
              }}
            />
          </Link>
        </Grid>
      </Slide>
      <Slide direction={"right"} in={collapsed}>
        <Grid item>
          <Link to="/">
            <img
              alt="School Manager"
              src={process.env.PUBLIC_URL + "/isotipo.svg"}
              style={{
                height: "3.5em",
                display: collapsed ? "" : "none",
              }}
            />
          </Link>
        </Grid>
      </Slide>
    </>
  );
};

export const Sidebar = (props) => {
  const matches = useMediaQuery("(min-width:800px)");
  const { open, openSidebar, collapseMenu, collapsed } = useContext(SidebarContext);
  const [closeOnExit, setCloseOnExit] = useState(false);
  const drawer = useRef(null);

  const handleDrawerClose = () => {
    openSidebar(false);
    collapseMenu(true);
  };

  useEffect(() => {
    if (!matches) {
      openSidebar(false);
      collapseMenu(true);
    } else {
      openSidebar(true);
      collapseMenu(false);
    }
  }, [collapseMenu, matches, openSidebar]);

  const openMiniSidebar = () => {
    if (matches && !open) {
      const node = drawer.current;
      if (node) {
        node.classList.add("drawer-menu");
        collapseMenu(false);
        setCloseOnExit(true);
      }
    }
  };

  const closeMiniSidebar = useCallback(() => {
    const node = drawer.current;
    if (node) {
      node.classList.remove("drawer-menu");
    }
    setCloseOnExit(false);
    collapseMenu(true);
  }, [setCloseOnExit, drawer, collapseMenu]);

  useEffect(() => {
    const node = drawer.current;
    if (node) {
      if (closeOnExit) {
        node.addEventListener("mouseleave", closeMiniSidebar);
      }

      return () => {
        node.removeEventListener("mouseleave", closeMiniSidebar);
      };
    }
    return () => {};
  }, [drawer, closeOnExit, closeMiniSidebar]);

  useEffect(() => {
    if (!open && !collapsed && closeOnExit) {
      if (props.forceClose) {
        closeMiniSidebar();
      }
    }

    return () => {};
    // eslint-disable-next-line
  }, [props.forceClose, closeMiniSidebar, collapsed, closeOnExit]);

  return (
    <Drawer
      className={open ? "drawer-menu" : matches ? "mini-drawer-menu" : "closed-drawer-menu"}
      variant={matches ? "permanent" : "temporary"}
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
      onMouseEnter={openMiniSidebar}
      ref={drawer}
      style={{ zIndex: 1301 }}
    >
      <Scrollbars autoHide>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 70,
          }}
        >
          <Logo />
          {open && (
            <IconButton onClick={handleDrawerClose} color="primary">
              <MenuIcon color="primary" />
            </IconButton>
          )}
        </div>
        <Divider />

        <Box component="div" p="1rem 0" textOverflow="ellipsis">
          <Grid container direction="row" justifyContent="center" alignItems="center" wrap={"nowrap"}>
            <Grid item xs={11}>
              <Menu />
            </Grid>
          </Grid>
        </Box>
      </Scrollbars>
    </Drawer>
  );
};

Sidebar.propTypes = {
  username: PropTypes.string.isRequired,
};

Sidebar.defaultProps = {
  username: "",
};

export default Sidebar;
