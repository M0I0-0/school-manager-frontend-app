import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React from "react";

const DashboardCard = (props) => {
  return (
    <Card>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default DashboardCard;
