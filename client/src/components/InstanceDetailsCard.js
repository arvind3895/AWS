import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CustomizedSwitches from './Switch';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderRaduis:"20px",
    margin:"40px 0",
    padding:"27px 45px",
    border: "1px solid #9B9EA8",
    borderRadius: "20px",
      ['@media (max-width:780px)']: { 
        padding: "5px",
      }
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  status:{
      color:"515562",
      display: "flex",
      "& .instance-details-wrp":{
        marginRight:"30px"
      },
      "& .data":{
          fontWeight:"bold",
          color:"#515562",
          fontSize:"24px",
          marginBottom:"10px",
          ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
            fontSize:"16px",
          }
      }
  },
  button:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
        marginTop:"8px",
      },
    "& .MuiFormControlLabel-root":{
        margin:"0"
    },
    "& MuiTypography-root":{
        fontWeight:"bold"
    }
  }
});

export default function InstanceDetailsCard({instances,type,toogleType}) {
  const classes = useStyles();
  var runningPrice =0;
  var stoppedPrice=0 ;
  useEffect(function(){
    if(instances?.length){
     calculatePrice(instances);
    }
  }, [instances]);

  function calculatePrice(instances){ 
        runningPrice =0;
        stoppedPrice =0;
        if(instances){
        instances.forEach(function(item){
        if(item.status === "stopped"){
            stoppedPrice += item.costPerHour;
        }else{
            runningPrice += item.costPerHour;
        }
    });
    }
  }
  return (
    <Card className={classes.root}>
      <CardContent>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={8} md={10} className={classes.status}>
            <div className="instance-details-wrp">
                <div className="data">{calculatePrice(instances)} {type==="INR"?"₹":"$"} {type==="INR"? (runningPrice/0.015).toFixed(4):runningPrice.toFixed(4)} </div>
                <div className="instance-status"> Running Instance</div>
            </div>
            <div className="instance-details-wrp">
            <div className="data">{type==="INR"? "₹":"$"} {type==="INR" ? (stoppedPrice/0.015).toFixed(4):stoppedPrice.toFixed(4)}</div>
                <div className="instance-status"> Stopped Instance</div>
            </div>
        </Grid>
        <Grid item xs={12} sm={4} md={2} className={classes.button} >
        <Typography >
          INR
          </Typography>
          <CustomizedSwitches toogleType={toogleType} type={type}/>
          <Typography>
          USD
        </Typography>
        </Grid>
    </Grid>
      </CardContent>
    </Card>
  );
}
