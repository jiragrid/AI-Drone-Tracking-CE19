import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography
} from '@material-ui/core';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';

function CardInfo({
  title = '',
  icon,
  total = 1234,
  percentUp = 5,
  percentDown = 10
}) {
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography className="d-flex justify-content-between" variant="subtitle1" color="textSecondary" gutterBottom>
          <span>{title}</span>
          <span>{icon}</span>
        </Typography>
        <Typography className="mt-3 text-right" variant="h4">{total.toString()}</Typography>
        <div className="d-flex justify-content-between">
          <Typography className="mt-3" color="primary">
            Percentage: {percentUp}%
            <ArrowUpIcon />
          </Typography>
          <Typography className="mt-3" color="error">
            Loss: {percentDown}%
            <ArrowDownIcon />
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

CardInfo.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  total: PropTypes.number,
  percentUp: PropTypes.number,
  percentDown: PropTypes.number
};

CardInfo.defaultProps = {
  title: '',
  icon: null,
  total: 1234,
  percentDown: 10,
  percentUp: 5,
};

export default CardInfo;