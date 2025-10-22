import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const SectionLogo = (props) => {
  const history = useHistory();
  const matches = useMediaQuery("(min-width:800px)");

  const goBack = () => {
    history.goBack();
  };

  let { src, section, backButton, breadcrumbs } = props;
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1}
      wrap={"nowrap"}
      style={{ minWidth: "-moz-max-content" }}
    >
      {backButton && (
        <Grid item>
          <IconButton
            edge={"start"}
            onClick={goBack}
            title="Retroceder"
            style={matches ? {} : { padding: "0px" }}
          >
            <ChevronLeftIcon fontSize={"large"} />
          </IconButton>
        </Grid>
      )}
      {src.length > 0 && (
        <Grid item style={{ display: matches ? "block" : "none" }}>
          <div
            style={{
              width: "2rem",
              height: "2rem",
            }}
          >
            <img
              src={src}
              alt="Logo Section"
              style={{
                margin: "auto",
                display: "block",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          </div>
        </Grid>
      )}
      <Grid item container direction="column" justifyContent="flex-start" alignItems="flex-start">
        <Grid item>
          {typeof section === "string" ? (
            <Typography variant={matches ? "h5" : "subtitle1"}>{section}</Typography>
          ) : (
            section
          )}
        </Grid>
        <Grid item style={{ display: matches ? "block" : "none" }}>
          {breadcrumbs}
        </Grid>
      </Grid>
    </Grid>
  );
};

SectionLogo.propTypes = {
  backButton: PropTypes.bool,
  src: PropTypes.string,
  section: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  breadcrumbs: PropTypes.node,
};

SectionLogo.defaultProps = {
  backButton: false,
  src: "",
  breadcrumbs: null,
};

export default SectionLogo;
