import { Route, Switch, useLocation } from "react-router-dom";

import CoinRoutes from "./Sat/SatCoinCatalog";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import Home from "../../components/Home/Home";
import NotFoundPage from "../../components/Errors/NotFoundPage";
import ClientRoute from "./CLient/Clients";
import React from "react";

export default function Routes(props) {
  const username = props.username;
  const location = useLocation();
  let background = location.state && location.state.background;

  return (
    <DefaultLayout username={username}>
      <Switch location={background || location}>
        <Route path="/" exact component={Home} />

        {CoinRoutes.map((props, index) => (
          <Route {...props} key={`satcoincatalog-${index}`} />
        ))}

        {ClientRoute.map((props, index) => (
          <Route {...props} key={`cliente-${index}`} />
        ))}

        <Route path="*" exact={true} component={NotFoundPage} />
      </Switch>
    </DefaultLayout>
  );
}
