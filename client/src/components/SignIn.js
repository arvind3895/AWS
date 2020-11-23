import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { setCookie} from "../util";
const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input:{
    width:"100%",
    '& .MuiInput-formControl':{
        border: "1px solid #515562",
        borderRadius: "4px",
        padding:"5px",
        marginTop:"24px",
        marginBottom:"16px"
    },
    '& .MuiFormLabel-root':{
        paddingBottom:"10px"
    },
    '& input.MuiInputBase-input:-internal-autofill-selected ':{
        backgroundColor:"#fff !important"
    }
},
main:{
    backgroundColor:"#ffffff",
    borderRadius:"10px",
    padding: "25px",
    marginTop: "20vh"
}
}));

export default function SignIn() {
    let history = useHistory();
    const classes = useStyles();

    function handleLogin(e){

        e.preventDefault();

        var payload ={
            email: e.target.email.value,
            password: e.target.password.value
        }

        axios.post("http://localhost:8080/api/login",payload,{
            "Access-Control-Expose-Headers": true
        }).then(res=>{
            if(res.data.success){
                axios.interceptors.request.use(function (config) {
                    config.headers.Authorization = `Bearer ${res.headers.authorization}`;
                    return config;
                });
                setCookie("token",res.headers.authorization);
                history.push("/dashboard");
            }
            
        });

    }
  return (
    <Container component="main" maxWidth="xs" className={classes.main}>     
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e)=>handleLogin(e)}>
        <TextField
          label="EMAIL"
          fullWidth
          className={classes.input}
          id="email"
          placeholder="Please enter your Email"
          name="email"
            autoComplete="email"
            autoFocus
          InputLabelProps={{
            shrink: true,
          }}
        />
          <TextField
            className={classes.input}
            required
            fullWidth
            name="password"
            label="PASSWORD"
            type="password"
            placeholder="Please enter your Password"
            id="password"
            autoComplete="current-password"
            InputLabelProps={{
                shrink: true,
              }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/signup" variant="body2">
                {"create an account"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}