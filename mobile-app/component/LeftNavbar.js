import React from 'react';
import PropTypes from 'prop-types'
import { useRouter } from 'next/router';
import {
  Drawer,
  List,
  ListItem,
  Divider,
} from '@material-ui/core';
import DevIcon from '@material-ui/icons/DeveloperBoardSharp';
import BarChartIcon from '@material-ui/icons/BarChartSharp';
import ComputerIcon from '@material-ui/icons/ComputerRounded';
import CopyrightIcon from '@material-ui/icons/CopyrightRounded';

const PATH = [
  { icon: <DevIcon className="mr-2" />, name: 'AI Sugarcane Disease', url: '#', },
  { icon: <BarChartIcon className="mr-2" />, name: 'Dashboard', url: '/', },
  { icon: <ComputerIcon className="mr-2" />, name: 'Analysis', url: '/analysis', },
  { icon: <CopyrightIcon className="mr-2" />, name: 'Power by CE-19', url: '#', }
]

function LeftNavbar({
  isOpen = false,
  onClose = () => { },
}) {
  const router = useRouter();
  const pathUrl = router.pathname.split('/')[1]

  const RenderListItems = () => {
    return (
      <List className="list-left-nav">
        {
          PATH.map((path, index) => (
            <ListItem 
              className={pathUrl === path.url.toLowerCase().split('/')[1] ? 'active' : ''}
              key={`list-items-${index}`} 
              onClick={() => router.push(path.url)}
            >
              {path.icon}
              {path.name}
            </ListItem>
          ))
        }
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