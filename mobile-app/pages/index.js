import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import AppContainer from '../containers/AppContainer';
import EcoIcon from '@material-ui/icons/Eco';
import DotIcon from '@material-ui/icons/FiberManualRecord';
import CircleIcon from '@material-ui/icons/RadioButtonUnchecked';
import NoneIcon from '@material-ui/icons/NotInterested';
import CardInfo from '../component/Card';
import OverallChart from '../component/OverallChart';
import Axios from 'axios';
import { URL } from '../constants/url';

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [predictionInfo, setPredictionInfo] = useState([]);
  const [whiteLeafs, setWhiteLeafs] = useState([]);
  const [ringSpots, setRingSpots] = useState([]);
  const [brownSpots, setBrownSpots] = useState([]);

  const fetchPrediction = async () => {
    try {
      setIsLoading(true);
      const { data } = await Axios.get(URL);

      setPredictionInfo(data?.data?.map((item, index) => ({ 
        no: index,
        white_leaf_disease: item.class_name === 'white_leaf_disease' ? item.accuracy : 0,
        brown_spot_disease: item.class_name === 'brown_spot_disease' ? item.accuracy : 0,
        ring_spot_disease: item.class_name === 'ring_spot_disease' ? item.accuracy : 0,
      })));
      setWhiteLeafs(data?.data?.filter((item) => item.class_name === 'white_leaf_disease'));
      setBrownSpots(data?.data?.filter((item) => item.class_name === 'brown_spot_disease'));
      setRingSpots(data?.data?.filter((item) => item.class_name === 'ring_spot_disease'));
      setIsLoading(false);
    }
    catch(error) {
      console.log(error);
    }
  }

  const calculatePercentage = (arr = []) => {
    const length = arr.length;

    if (length === 0) return 0;

    const sum = arr.reduce((prev, curr) => (prev + curr?.accuracy) , 0);

    return parseFloat((sum/length).toFixed(2));
  }

  const getLastAccuracy = (arr = []) => parseFloat(arr[arr.length - 1]?.accuracy?.toFixed(2)) || 0

  useEffect(() => {
    fetchPrediction();
  }, []);

  return (
    <AppContainer>
      <div className="row">
        <div className="col-md-3">
          <CardInfo
            title="White Leaf Disease"
            total={whiteLeafs.length}
            percentUp={calculatePercentage(whiteLeafs)}
            percentDown={getLastAccuracy(whiteLeafs)}
            icon={<EcoIcon />}
          />
        </div>
        <div className="col-md-3">
          <CardInfo
            title="Brown Spot Leaf Disease"
            total={brownSpots.length}
            percentUp={calculatePercentage(brownSpots)}
            percentDown={getLastAccuracy(brownSpots)}
            icon={<DotIcon />}
          />
        </div>
        <div className="col-md-3">
          <CardInfo
            title="Ring Spot Leaf Disease"
            total={ringSpots.length}
            percentUp={calculatePercentage(ringSpots)}
            percentDown={getLastAccuracy(ringSpots)}
            icon={<CircleIcon />}
          />
        </div>
        <div className="col-md-3">
          <CardInfo
            title="None of All"
            total={ringSpots.length}
            percentUp={calculatePercentage(ringSpots)}
            percentDown={getLastAccuracy(ringSpots)}
            icon={<NoneIcon />}
          />
        </div>
      </div>
      <div className="mt-3">
        <Card>
          <CardContent>
            <Typography className="mb-3" variant="subtitle1" color="textSecondary">Overall Accuracy</Typography>
            <OverallChart data={predictionInfo} />
          </CardContent>
        </Card>
      </div>
    </AppContainer>
  )
};
