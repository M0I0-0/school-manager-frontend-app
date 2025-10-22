import "./Sidebar.css";

import React, { useContext, useMemo, useState } from "react";

import CollapseMui from "@material-ui/core/Collapse";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItemIconMui from "@material-ui/core/ListItemIcon";
import ListItemTextMui from "@material-ui/core/ListItemText";
import MenuItemComponent from "./MenuItemComponent";
import PropTypes from "prop-types";
import { SidebarContext } from "../../../context/Sidebar/SidebarState";
import { matchPath } from "react-router";
import { withStyles } from "@material-ui/core/styles";

const ListItemIcon = withStyles(
  () => ({
    root: {
      minWidth: "auto",
    },
  }),
  { index: 1 }
)(ListItemIconMui);
const ListItemText = withStyles(
  () => ({
    root: {
      marginLeft: "1em",
    },
  }),
  { index: 1 }
)(ListItemTextMui);

const Collapse = withStyles(
  () => ({
    wrapper: {
      "& .MuiList-root:before": {
        content: "''",
        height: "100%",
        opacity: "1",
        width: "3px",
        background: "#e0f3ff",
        position: "absolute",
        left: "-0.5rem",
        top: "0",
        borderRadius: "15px",
      },
    },
  }),
  { index: 1 }
)(CollapseMui);

const recursiveItems = (elements, pathname) => {
  for (let index = 0; index < elements.length; index++) {
    let element = elements[index];
    if (
      element.link &&
      matchPath(element.link, {
        path: pathname,
        exact: false,
        strict: false,
      }) !== null
    ) {
      return true;
    }
    if (element.items) {
      const result = recursiveItems(element.items, pathname);
      if (result) {
        return true;
      }
    }
  }
  return false;
};

const MenuItem = (props) => {
  const { name, link, icon, items = [], activeClassName, exact } = props;
  const isExpandable = items && items.length > 0;
  const { collapsed } = useContext(SidebarContext);

  const memoItems = useMemo(() => recursiveItems(items, window.location.pathname), [items]);

  const hasItemActive = () => {
    let result = false;
    if (window.location.pathname === "/") {
      return result;
    }
    result = memoItems;
    return memoItems;
  };
  const [open, setOpen] = useState(hasItemActive());

  function handleClick() {
    setOpen(!open);
  }

  const MenuItemRoot = (
    <MenuItemComponent link={link} exact={exact} onClick={handleClick} activeClassName={activeClassName}>
      {!!icon && <ListItemIcon>{icon}</ListItemIcon>}
      {!collapsed && <ListItemText primary={name} className={open ? "MuiListItem-Text_bold" : ""} />}
      {isExpandable && !open && !collapsed && (
        <IconExpandMore
          style={{
            opacity: 0.3,
          }}
        />
      )}
      {isExpandable && open && !collapsed && (
        <IconExpandLess
          style={{
            opacity: 0.3,
          }}
        />
      )}
    </MenuItemComponent>
  );

  const MenuItemChildren = isExpandable ? (
    <Collapse
      in={open && !collapsed}
      timeout="auto"
      unmountOnExit
      mountOnEnter
      style={{ marginLeft: "1em" }}
    >
      <List component="ul" disablePadding>
        {items.map((item, index) => (
          <MenuItem {...item} key={index} />
        ))}
      </List>
    </Collapse>
  ) : null;

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  );
};

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  icon: PropTypes.node,
  items: PropTypes.array,
  activeClassName: PropTypes.string,
  exact: PropTypes.bool,
};

MenuItem.defaultProps = {
  name: "",
  link: "",
  icon: null,
  items: [],
  activeClassName: "",
  exact: false,
};

export default MenuItem;
