import FadeIn from "react-fade-in";
import React from "react";
import ResponsiveContent from "../BaseLayout/Content/ResponsiveContent.js";
import Sidebar from "../BaseLayout/Sidebar/Sidebar";

export const DefaultLayout = (props) => {
  const [forceClose, setForceClose] = React.useState(false);

  return (
    <>
      <Sidebar forceClose={forceClose} />
      <FadeIn>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
          onMouseOver={() => setForceClose(true)}
          onMouseOut={() => setForceClose(false)}
        >
          <ResponsiveContent>{props.children}</ResponsiveContent>
        </div>
      </FadeIn>
    </>
  );
};

export default DefaultLayout;
