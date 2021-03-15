import React from 'react';
import PropTypes from 'prop-types'
import {
  Drawer,
  List,
  ListItem,
  Divider,
} from '@material-ui/core';
import DevIcon from '@material-ui/icons/DeveloperBoardSharp';
import BarChartIcon from '@material-ui/icons/BarChartSharp';
import LibIcon from '@material-ui/icons/ComputerRounded';
import CopyrightIcon from '@material-ui/icons/CopyrightRounded';

function LeftNavbar({
  isOpen = false,
  onClose = () => { },
}) {
  const RenderListItems = () => {
    return (
      <List className="list-left-nav">
        <ListItem>
          <DevIcon className="mr-3" />
          AI Sugarcane Disease
        </ListItem>
        <Divider />
        <ListItem className="active">
          <BarChartIcon className="mr-3" />
          Dashboard
        </ListItem>
        <ListItem>
          <LibIcon className="mr-3" />
          Analysis
        </ListItem>
        <ListItem>
          <CopyrightIcon className="mr-3"/>
          Power by CE-19
        </ListItem>
      </List>
    );
  };

  return (
    <Drawer
      anchor="left"
      open={Boolean(isOpen)}
      onClose={onClose}
    >
      {RenderListItems()}
    </Drawer>
  );
};

LeftNavbar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

LeftNavbar.defaultProps = {
  isOpen: false,
  onClose: () => { },
}

export default LeftNavbar;