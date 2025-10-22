import BreadcrumbsUI from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import LinkUI from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    ol: {
      flexWrap: "initial",
    },
  }),
  { index: 1 }
);

const Breadcrumbs = (props) => {
  const classes = useStyles();

  return (
    <BreadcrumbsUI
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      classes={{ ol: classes.ol }}
    >
      {props.items.map((item, index) => (
        <LinkUI key={index} to={item.to} color="primary" className="primary-purple-icon" component={Link}>
          <Typography variant="subtitle2">{item.name}</Typography>
        </LinkUI>
      ))}
      <Typography variant="subtitle2" noWrap color={"textSecondary"}>
        {props.current}
      </Typography>
    </BreadcrumbsUI>
  );
};

export default Breadcrumbs;
