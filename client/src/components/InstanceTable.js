import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#B8D5D1",
    color: "#515562",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    border:"2px solid white",
    backgroundColor:"#f2f2f2",
    '&:nth-of-type(odd)': {
      backgroundColor: "#E9F0F0",
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    borderRadius: "10px",
    overflow: "hidden"
  },
  container:{
    boxSizing: "border-box",
      padding:"30px 45px 60px 45px",
      width:"100%",
      borderRadius:"20px"
  },
  mainHeader:{
      fontSize:"24px",
      fontWeight:"600",
      lineHeight:"36px",
      marginBottom:"24px"
  }
});

export default function InstanceTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Typography className={classes.mainHeader} >Instance</Typography>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Instance Name</StyledTableCell>
            <StyledTableCell align="right">Cost per hour</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.instances.length?props.instances.map((row) => (
            <StyledTableRow key={row.name+row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{props.type==="INR"?"₹":"$"}{props.type==="INR"? (row.costPerHour/0.015).toFixed(4):row.costPerHour}</StyledTableCell>
              <StyledTableCell align="right" style={{color:row.status==="stopped"?"#EB5757":"#005A3C"}}>{row.status}</StyledTableCell>
              <StyledTableCell align="right">{row.status==="running"?<Button style={{color:"#EB5757"}} onClick={() => { props.stopInstances(row.id) }}>Stop</Button>:<Button style={{color:"#005A3C"}} onClick={() => { props.startInstances(row.id) }}>start</Button>}</StyledTableCell>
            </StyledTableRow>
          )):"Loading..."}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
