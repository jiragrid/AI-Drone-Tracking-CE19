import React from 'react';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import AppContainer from '../containers/AppContainer';
import EcoIcon from '@material-ui/icons/Eco';
import DotIcon from '@material-ui/icons/FiberManualRecord';
import CircleIcon from '@material-ui/icons/RadioButtonUnchecked';
import CardInfo from '../component/Card';
import OverallChart from '../component/OverallChart';

export default function Page() {
  const random = (max = 0, min = 0) => {
    return Math.floor(Math.random() * Math.floor(max) + min);
  };

  return (
    <AppContainer>
      <div className="row">
        <div className="col-md-4">
          <CardInfo
            title="White Leaf Disease"
            total={random(999)}
            percentUp={random(50)}
            percentDown={random(50)}
            icon={<EcoIcon />}
          />
        </div>
        <div className="col-md-4">
          <CardInfo
            title="Brown Spot Leaf Disease"
            total={random(999)}
            percentUp={random(50)}
            percentDown={random(50)}
            icon={<DotIcon />}
          />
        </div>
        <div className="col-md-4">
          <CardInfo
            title="Ring Spot Leaf Disease"
            total={random(999)}
            percentUp={random(50)}
            percentDown={random(50)}
            icon={<CircleIcon />}
          />
        </div>
      </div>
      <div className="mt-3">
        <Card>
          <CardContent>
            <Typography className="mb-3" variant="subtitle1" color="textSecondary">Overall</Typography>
            <OverallChart />
          </CardContent>
        </Card>
      </div>
    </AppContainer>
  )
};
