import React, { forwardRef, useCallback, useContext } from "react";

import ListItemMui from "@material-ui/core/ListItem";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { SidebarContext } from "../../../context/Sidebar/SidebarState";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withStyles } from "@material-ui/core/styles";

const ListItem = withStyles(
  (theme) => ({
    root: {
      borderRadius: ".25rem !important",
    },
  }),
  { index: 1 }
)(ListItemMui);

const MenuItemComponent = (props) => {
  const { className, onClick, link, children, activeClassName, open, exact } = props;
  const { openSidebar, collapseMenu } = useContext(SidebarContext);
  const matches = useMediaQuery("(min-width:800px)");

  const clickAndClose = useCallback(() => {
    if (!matches) {
      openSidebar(false);
      collapseMenu(true);
    }
  }, [collapseMenu, matches, openSidebar]);

  if (!link || typeof link !== "string") {
    return (
      <ListItem
        button
        className={className}
        children={children}
        onClick={onClick}
        selected={open}
        alignItems={"center"}
        style={{ justifyContent: "center" }}
      />
    );
  }
  return (
    <ListItem
      button
      className={className}
      children={children}
      selected={open}
      alignItems={"center"}
      component={forwardRef((props, ref) => (
        <NavLink
          exact={exact}
          activeStyle={{
            background: "#e0f3ff",
            color: "#3f6ad8",
          }}
          activeClassName={"item-selected " + activeClassName}
          {...props}
          innerRef={ref}
        />
      ))}
      to={link}
      style={{ justifyContent: "center" }}
      onClick={clickAndClose}
    />
  );
};

MenuItemComponent.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  link: PropTypes.string,
  activeClassName: PropTypes.string,
  open: PropTypes.bool,
  exact: PropTypes.bool,
};

MenuItemComponent.defaultProps = {
  exact: false,
  activeClassName: "",
  link: "",
  open: false,
  className: "",
};

export default MenuItemComponent;
