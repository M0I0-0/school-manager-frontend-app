import { darken, lighten, withStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import React from "react";

const DangerButton = withStyles(
  (theme) => ({
    root: {
      color: theme.palette.getContrastText("#d92550"),
      backgroundColor: "#d92550",
      "&:hover": {
        backgroundColor: darken("#d92550", 0.2),
      },
    },
  }),
  { index: 1 }
)(IconButton);

const PrimaryButton = withStyles(
  (theme) => ({
    root: {
      color: theme.palette.getContrastText("#3f6ad8"),
      backgroundColor: "#3f6ad8",
      "&:hover": {
        backgroundColor: darken("#3f6ad8", 0.2),
      },
    },
  }),
  { index: 1 }
)(IconButton);

const SecondaryButton = withStyles(
  (theme) => ({
    root: {
      color: theme.palette.getContrastText("#6c757d"),
      backgroundColor: "#6c757d",
      "&:hover": {
        backgroundColor: darken("#6c757d", 0.2),
      },
    },
  }),
  { index: 1 }
)(IconButton);

const SuccessButton = withStyles(
  (theme) => ({
    root: {
      color: "#fff",
      backgroundColor: "#3ac47d",
      "&:hover": {
        backgroundColor: darken("#3ac47d", 0.2),
      },
    },
  }),
  { index: 1 }
)(IconButton);

const WarningButton = withStyles(
  (theme) => ({
    root: {
      color: theme.palette.getContrastText("#f7a324"),
      backgroundColor: "#f7a324",
      "&:hover": {
        backgroundColor: darken("#f7a324", 0.2),
      },
    },
  }),
  { index: 1 }
)(IconButton);

const DangerOutlinedButton = withStyles(
  (theme) => ({
    root: {
      color: "#d92550",
      "&:hover": {
        backgroundColor: lighten("#d92550", 0.9),
      },
    },
  }),
  { index: 1 }
)(IconButton);

const PrimaryOutlinedButton = withStyles(
  (theme) => ({
    root: {
      color: "#3f6ad8",
      "&:hover": {
        backgroundColor: lighten("#3f6ad8", 0.9),
      },
    },
  }),
  { index: 1 }
)(IconButton);

const SecondaryOutlinedButton = withStyles(
  (theme) => ({
    root: {
      color: "#6c757d",
      "&:hover": {
        backgroundColor: lighten("#6c757d", 0.9),
      },
    },
  }),
  { index: 1 }
)(IconButton);

const SuccessOutlinedButton = withStyles(
  (theme) => ({
    root: {
      color: "#3ac47d",
      "&:hover": {
        backgroundColor: lighten("#3ac47d", 0.9),
      },
    },
  }),
  { index: 1 }
)(IconButton);

const WarningOutlinedButton = withStyles(
  (theme) => ({
    root: {
      color: "#f7a324",
      "&:hover": {
        backgroundColor: lighten("#f7a324", 0.9),
      },
    },
  }),
  { index: 1 }
)(IconButton);

const IconButtonPermission = (props) => {
  const { color } = props;
  switch (color.toLowerCase()) {
    case "danger":
      return (
        <DangerButton {...props} color="primary">
          {props.children}
        </DangerButton>
      );
    case "primary":
      return (
        <PrimaryButton {...props} color="primary">
          {props.children}
        </PrimaryButton>
      );
    case "secondary":
      return (
        <SecondaryButton {...props} color="primary">
          {props.children}
        </SecondaryButton>
      );
    case "success":
      return (
        <SuccessButton {...props} color="primary">
          {props.children}
        </SuccessButton>
      );
    case "warning":
      return (
        <WarningButton {...props} color="primary">
          {props.children}
        </WarningButton>
      );
    case "danger-outlined":
      return (
        <DangerOutlinedButton {...props} color="primary">
          {props.children}
        </DangerOutlinedButton>
      );
    case "primary-outlined":
      return (
        <PrimaryOutlinedButton {...props} color="primary">
          {props.children}
        </PrimaryOutlinedButton>
      );
    case "secondary-outlined":
      return (
        <SecondaryOutlinedButton {...props} color="primary">
          {props.children}
        </SecondaryOutlinedButton>
      );
    case "success-outlined":
      return (
        <SuccessOutlinedButton {...props} color="primary">
          {props.children}
        </SuccessOutlinedButton>
      );
    case "warning-outlined":
      return (
        <WarningOutlinedButton {...props} color="primary">
          {props.children}
        </WarningOutlinedButton>
      );
    default:
      return (
        <IconButton {...props} color="default">
          {props.children}
        </IconButton>
      );
  }
};

IconButtonPermission.propTypes = {
  color: PropTypes.oneOf([
    "danger",
    "primary",
    "secondary",
    "success",
    "warning",
    "default",
    "danger-outlined",
    "primary-outlined",
    "secondary-outlined",
    "success-outlined",
    "warning-outlined",
    "default-outlined",
  ]),
};

IconButtonPermission.defaultProps = {
  color: "default",
};

export default IconButtonPermission;
