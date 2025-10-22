import "./Home.css";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Content from "../BaseLayout/Content/Content";
import DashboardCard from "../Elements/Cards/DashboardCard";
import Grid from "@material-ui/core/Grid";
import Header from "../BaseLayout/Header/Header";
import Link from "@material-ui/core/Link";
import React from "react";
import Title from "../BaseLayout/Content/Title";
import Typography from "@material-ui/core/Typography";

const Home = () => {
  return (
    <Content>
      <Header disableExpanded={true} />
      <Title>
        <Box component="div" m={1}>
          <Typography variant="h3" className="primary-company-color" gutterBottom>
            Taller de Consumo de REST API en FrontEnd(React)
          </Typography>
        </Box>
      </Title>
      <Container maxWidth="md">
        <div className="flex-grow">
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <DashboardCard>
                <Box component="div">
                  <Typography variant="subtitle1" gutterBottom>
                    Éste proyecto fue desarrollado en Javascript y React usando el framework Material-ui,
                    puedes encontrar la documentación de los componentes en el siguiente enlace:{" "}
                    <Link
                      href="https://v4.mui.com/getting-started/installation/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Material-UI
                    </Link>
                  </Typography>
                </Box>
              </DashboardCard>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Content>
  );
};

export default Home;
