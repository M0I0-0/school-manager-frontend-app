import FadeIn from "react-fade-in";
import List from "@material-ui/core/List";
import MenuItem from "./MenuItem";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import React from "react";
import StorageIcon from "@material-ui/icons/Storage";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

let items = [
  {
    name: "Catálogos",
    icon: <StorageIcon fontSize={"small"} />,
    items: [
      {
        name: "Monedas",
        link: "/coin",
        icon: <MonetizationOnIcon style={{ fontSize: "small" }} />,
      },
      {
        name: "Clientes",
        link: "/client",
        icon: <PermIdentityIcon style={{ fontSize: "small" }} />,
      }
    ],
  },
];

const Menu = () => {
  return (
    <FadeIn>
      <List component="nav" disablePadding>
        {items.map((item, index) => {
          return <MenuItem {...item} key={index} />;
        })}
      </List>
    </FadeIn>
  );
};

export default React.memo(Menu);
