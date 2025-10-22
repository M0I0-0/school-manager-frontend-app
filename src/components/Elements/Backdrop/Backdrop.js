import React, { useEffect, useState } from "react";

import BackdropUI from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import ProgressBar from "../ProgressBar/ProgressBar";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const Backdrop = (props) => {
  const { open } = props;
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const useStyles = makeStyles(
    (theme) => ({
      backdrop: {
        backdropFilter: "blur(2px)",
        zIndex: 1500,
        color: "#fff",
      },
    }),
    { index: 1 }
  );

  const classes = useStyles();

  useEffect(() => {
    if (open) {
      setOpenBackdrop(open);
    } else {
      setTimeout(function () {
        setOpenBackdrop(open);
      }, 650);
    }
  }, [open]);

  return (
    <Fade in={openBackdrop} timeout={500}>
      <BackdropUI className={classes.backdrop} open={openBackdrop} {...props}>
        <Grid container direction="column" justifyContent="center" item xs={10} md={4} spacing={4}>
          <Grid item container justifyContent="center">
            <CircularProgress color="inherit" disableShrink />
          </Grid>
          <Grid item container justifyContent="center">
            <ProgressBar open={open} />
          </Grid>
          <Grid item container justifyContent="center">
            {props.children}
          </Grid>
        </Grid>
      </BackdropUI>
    </Fade>
  );
};
Backdrop.propTypes = {
  open: PropTypes.bool.isRequired,
};
export default Backdrop;
