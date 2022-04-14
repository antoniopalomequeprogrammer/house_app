import React, { useState } from "react";
import * as API from "utils/API_V2";
import PARAMS from "utils/PARAMS";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from '@material-ui/core/FormHelperText';
import { toast } from 'react-toastify';


const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `url(${PARAMS.loginAdminImg})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundPosition: "center",
    backgroundSize: "cover"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Login(props) {
  const [user, setUser] = useState({});
  const [errorMail, setErrorMail] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [error, setError] = useState('');

  const classes = useStyles();

  const login = async(e) => {
    localStorage.removeItem("avatar");
    e.preventDefault();
    setError('');
    setErrorMail('');
    setErrorPass('');

    const res = await API.login(user.email, user.password);
    if (res.error) {
      toast(res.error, {type: "warning"});
    }else{
      localStorage.setItem("apiToken", res.data.token);
      localStorage.setItem("userName", res.data.nombre);
      if (res.data.avatar) {
        localStorage.setItem("avatar", res.data.avatar);
      }
      window.location.reload(false);
      props.setApiToken(res.data.token);
    }
  };

  const handleChange = e => {
    e.persist();
    setUser(user => ({ ...user, [e.target.name]: e.target.value }));
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} style={{backgroundColor: PARAMS.firstColor}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión Administrador
          </Typography>
          <form className={classes.form} onSubmit={login} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              helperText={errorMail}
              error = {errorMail.length === 0 ? false : true }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              helperText={errorPass}
              error = {errorPass.length === 0 ? false : true }
            />
            {error && <FormHelperText error>{error}</FormHelperText>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{backgroundColor: PARAMS.firstColor}}
            >
              Entrar
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
