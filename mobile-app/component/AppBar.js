import React from 'react';
import PropTypes from 'prop-types'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

function AppBarComponent({
  onToggleLeftNav = () => { },
}) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" onClick={onToggleLeftNav} color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">AI Sugarcane Disease</Typography>
      </Toolbar>
    </AppBar>
  );
};

AppBarComponent.propTypes = {
  onToggleLeftNav: PropTypes.func,
};

AppBarComponent.defaultProps = {
  onToggleLeftNav: () => { },
};

export default AppBarComponent;