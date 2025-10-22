import "./Header.css";

import React, { useContext, useEffect, useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";
import { SidebarContext } from "../../../context/Sidebar/SidebarState";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const Header = (props) => {
  const { title, options, disableExpanded } = props;
  const matches = useMediaQuery("(max-width:800px)");
  const [expanded, setExpanded] = useState(false);

  const closeHeaderOptions = () => {
    let buttonClose = document.getElementById("closeHeaderOptions");
    if (buttonClose != null) {
      buttonClose.click();
    }
  };

  const handleChange = () => {
    setExpanded((prev) => !prev);
  };

  const collapseOptions = () => {
    setExpanded(false);
  };

  useEffect(() => {
    let buttons = document.querySelectorAll("#optionsHeaderArea button");
    let buttonsIgnore = ["filterContainers", "splitButton"];
    if (expanded) {
      if (buttons.length > 0) {
        for (let i = 0; i < buttons.length - 1; i++) {
          if (buttonsIgnore.includes(buttons[i].id) === false) {
            buttons[i].addEventListener("click", closeHeaderOptions, false);
          }
        }
      }
    }
  }, [expanded]);

  const { open, openSidebar, toggleStatusSidebar, collapseMenu, collapsed } = useContext(SidebarContext);

  const toggleSidebar = () => {
    const isWizard = document.querySelector(".wizard-drawer");

    if (isWizard !== null && !matches) {
      openSidebar(true);
      collapseMenu(false);
      isWizard.style.display = isWizard.style.display === "none" ? "" : "none";

      return;
    }
    collapseMenu(!collapsed);
    toggleStatusSidebar();
  };

  const useStyles = makeStyles(
    (theme) => {
      const backgroundColorDefault =
        theme.palette.type === "light" ? theme.palette.common.white : theme.palette.grey[900];

      return {
        expansionPanel: {
          backgroundColor: backgroundColorDefault,
          color: theme.palette.getContrastText(backgroundColorDefault),
        },
        toolbar: {
          minHeight: 70,
          paddingLeft: "16px",
          paddingRight: "16px",
        },
        title: {
          flexGrow: 1,
          alignSelf: "center",
          paddingLeft: theme.spacing(2),
        },
        appbar: {
          paddingLeft: matches ? "0px !important" : open ? "230px !important" : "75px !important",
          backgroundColor: backgroundColorDefault,
          color: theme.palette.getContrastText(backgroundColorDefault),
        },
      };
    },
    { index: 1 }
  );
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed" color="default" className={classes.appbar} elevation={3}>
        <Toolbar className={classes.toolbar}>
          <Grid container direction="row" justifyContent="space-around" alignItems="center" wrap={"nowrap"}>
            <Grid item container justifyContent="flex-start" alignItems="center" xs wrap={"nowrap"}>
              <IconButton edge="start" aria-label="menu" color="primary" onClick={toggleSidebar}>
                <MenuIcon color="primary" />
              </IconButton>
              {expanded && matches ? (
                <ClickAwayListener onClickAway={collapseOptions}>
                  <div id="optionsHeaderArea">{options} </div>
                </ClickAwayListener>
              ) : (
                <Box ml={2}>{title}</Box>
              )}
            </Grid>

            <Grid
              item
              container
              justifyContent="flex-end"
              alignItems="center"
              wrap={"nowrap"}
              style={{ width: "fit-content" }}
            >
              {disableExpanded ? (
                <Box ml={2}>{options}</Box>
              ) : (
                <React.Fragment>
                  {!matches && options && <Box ml={2}>{options}</Box>}

                  {matches && options && (
                    <IconButton
                      aria-label="display more actions"
                      edge="end"
                      color="inherit"
                      id="closeHeaderOptions"
                      onClick={handleChange}
                    >
                      {expanded ? <CloseIcon /> : <MoreVertIcon />}
                    </IconButton>
                  )}
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propoTypes = {
  title: PropTypes.node,
  options: PropTypes.node,
  disableExpanded: PropTypes.bool,
};

Header.defaultProps = {
  title: null,
  options: null,
  disableExpanded: false,
};

export default Header;
