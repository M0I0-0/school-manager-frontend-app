import Container from "@material-ui/core/Container";
import React from "react";

export const Content = (props) => {
  return (
    <Container maxWidth={false} style={{ padding: 0 }}>
      {props.children}
    </Container>
  );
};
export default Content;
