import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import axios from "axios";
import { useHistory } from "react-router-dom";
import {deleteCookie} from "../util";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiAppBar-root":{
        backgroundColor:"#005A3C"
    },
    "& .MuiToolbar-root":{
        padding:"0px"
    }
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  let history = useHistory();
  const classes = useStyles();
    function logout(){
        axios.post("http://localhost:8080/api/logout").then((res)=>{
            console.log(res);
            if(res.data.success){
                deleteCookie("token");
                history.push("/login");
            }
        });
    }

  return (
    <div className={classes.root}>
      <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={()=>{logout()}}>Logout</Button>
        </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
