import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 0,
      color: "#005A3C",
      '&$checked': {
        transform: 'translateX(16px)',
        height:"100%",
        color: "#005A3C",
        '& + $track': {
          backgroundColor: '#B8D5D1;',
          opacity: 1,
          border: 'none',
        },
      },
      '& + $track': {
        backgroundColor: '#B8D5D1;',
        opacity: 1,
        border: 'none',
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 26,
      height: 26,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });
  

export default function CustomizedSwitches({type,toogleType}) {
      const handleChange = (event) => {
        toogleType()
      };
      return (
        <FormGroup>
          <FormControlLabel
            control={<IOSSwitch checked={type==="USD"} onChange={handleChange} name="checkedB" />}
          />
        </FormGroup>
      );
}