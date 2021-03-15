import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import AppContainer from '../containers/AppContainer';
import Table from '../component/Table';
import AddIcon from '@material-ui/icons/AddCircle';

function Analysis() {
  return (
    <AppContainer>
      <Card>
        <CardContent>
          <Typography className="mb-3" variant="h5">Analysis</Typography>
          <Table />
        </CardContent>
      </Card>
      <div className="text-center">
        <Tooltip title="Analysis">
          <IconButton className="mt-5" color="primary">
            <AddIcon style={{ fontSize: '1.5em' }} />
          </IconButton>
        </Tooltip>
      </div>
    </AppContainer>
  );
};

export default Analysis;