import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    justify: "center",
  },
  card: {
    maxWidth: "40%",
    minHeight: "10vh",
    display: "flex",
    alignItems: "center",
    background: "#00b300",
    color: "#FFFFFF",
  },
});

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=626fdea4b9d14fe1abcb609db498c26c&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-email%20user-read-private%20user-library-read%20";

export default function Login() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Button
        className={classes.card}
        size="large"
        disableElevation
        disableRipple
        href={AUTH_URL}
      >
        Login with Spotify
      </Button>
    </Container>
  );
}
