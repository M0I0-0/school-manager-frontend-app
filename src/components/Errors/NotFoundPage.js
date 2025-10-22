import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FadeIn from "react-fade-in";
import Grid from "@material-ui/core/Grid";
import Header from "../BaseLayout/Header/Header";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    background: (props) =>
      props.color === "home" ? "linear-gradient(45deg, #074070 30%, #006cb0 90%)" : "transparent",
    border: (props) => (props.color === "home" ? 0 : "1px solid #006cb0"),
    borderRadius: "3rem",
    boxShadow: (props) => (props.color === "home" ? "0 3px 5px 2px #006cb04D" : "0 3px 5px 2px #006cb04D"),
    color: (props) => (props.color === "home" ? "white" : "#006cb0"),
    height: 48,
    padding: "0 30px",
    margin: 8,
  },
};

function GradientButton(props) {
  const { classes, color, ...other } = props;
  return <Button className={classes.root} {...other} />;
}

GradientButton.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["back", "home"]).isRequired,
};

const StyledGradientButton = withStyles(styles, { index: 1 })(GradientButton);

const NotFoundPage = ({ fullPage }) => {
  const history = useHistory();

  const goHome = (params) => {
    history.push("/");
  };

  const goBack = () => {
    history.goBack();
  };

  if (fullPage !== undefined && fullPage === true) {
    return (
      <FadeIn>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent={"flex-start"}
          spacing={0}
          style={{
            minHeight: "100vh",
            backgroundImage: "linear-gradient(0deg,#FFF 0,#E7E8E9 100%)",
          }}
        >
          <Grid item xs={12}>
            <Box mt={15}>
              <Typography
                variant="h1"
                component="h1"
                noWrap={true}
                style={{
                  color: "#485b65",
                  fontSize: "12em",
                  letterSpacing: "2rem",
                  fontWeight: "400",
                }}
              >
                404
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={8} md={6} style={{ color: "#505050" }}>
            <Box mb={5} mt={0}>
              <Typography variant="h4" component="h4" align={"center"} gutterBottom>
                Página no encontrada
              </Typography>
              <Typography variant="h5" component="h5" align={"center"} gutterBottom>
                La página que está buscando podría haberse eliminado, haberse cambiado de nombre o no está
                disponible temporalmente.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </FadeIn>
    );
  }

  return (
    <>
      <FadeIn>
        <Header />
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent={"flex-start"}
          spacing={0}
          style={{
            minHeight: "calc(100vh - 70px)",
            backgroundImage: "linear-gradient(0deg,#FFF 0,#E7E8E9 100%)",
          }}
        >
          <Grid item xs={12}>
            <Box mb={0} mt={15}>
              <Typography
                variant="h1"
                component="h1"
                noWrap={true}
                style={{
                  color: "#485b65",
                  fontSize: "12em",
                  letterSpacing: "2rem",
                  fontWeight: "400",
                }}
              >
                404
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={8} md={6} style={{ color: "#505050" }}>
            <Box mb={5} mt={0}>
              <Typography variant="h4" component="h4" align={"center"} gutterBottom>
                Página no encontrada
              </Typography>
              <Typography variant="h5" component="h5" align={"center"} gutterBottom>
                La página que está buscando podría haberse eliminado, haberse cambiado de nombre o no está
                disponible temporalmente.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mb={2} mt={2}>
              <StyledGradientButton color="home" onClick={goHome}>
                IR A INICIO
              </StyledGradientButton>
              <StyledGradientButton color="back" onClick={goBack}>
                VOLVER A LA PÁGINA ANTERIOR
              </StyledGradientButton>
            </Box>
          </Grid>
        </Grid>
      </FadeIn>
    </>
  );
};

export default NotFoundPage;
