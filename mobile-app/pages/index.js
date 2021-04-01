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
import OtherIcon from '@material-ui/icons/DevicesOther';
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
  const [other, setOther] = useState([]);
  const [notAnalysis, setNotAnalysis] = useState([]);

  const fetchPrediction = async () => {
    try {
      setIsLoading(true);
      const { data } = await Axios.get(URL);
      const arr = data?.data?.map((item) => item).splice(-10);

      setPredictionInfo(arr.map((item, index) => ({ 
        no: index + 1,
        white_leaf_disease: item.class_no === '0' ? item.accuracy.toFixed(2) : 0,
        brown_spot_disease: item.class_no === '1' ? item.accuracy.toFixed(2) : 0,
        ring_spot_disease: item.class_no === '2' ? item.accuracy.toFixed(2) : 0,
        other: item.class_no === '3' ? item.accuracy.toFixed(2) : 0,
        not_analysis: item.class_no === '4' ? item.accuracy.toFixed(2) : 0,
      })));
      setWhiteLeafs(data?.data?.filter((item) => item.class_no === '0'));
      setBrownSpots(data?.data?.filter((item) => item.class_no === '1'));
      setRingSpots(data?.data?.filter((item) => item.class_no === '2'));
      setOther(data?.data?.filter((item) => item.class_no === '3'));
      setNotAnalysis(data?.data?.filter((item) => item.class_no === '4'));
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
        <div className="col-md-4">
          <CardInfo
            title="White Leaf Disease"
            total={whiteLeafs.length}
            percentUp={calculatePercentage(whiteLeafs)}
            percentDown={getLastAccuracy(whiteLeafs)}
            icon={<EcoIcon />}
          />
        </div>
        <div className="col-md-4">
          <CardInfo
            title="Narrow Brown Spot Leaf Disease"
            total={brownSpots.length}
            percentUp={calculatePercentage(brownSpots)}
            percentDown={getLastAccuracy(brownSpots)}
            icon={<DotIcon />}
          />
        </div>
        <div className="col-md-4">
          <CardInfo
            title="Ring Spot Leaf Disease"
            total={ringSpots.length}
            percentUp={calculatePercentage(ringSpots)}
            percentDown={getLastAccuracy(ringSpots)}
            icon={<CircleIcon />}
          />
        </div>
        <div className="col-md-4">
          <CardInfo
            title="Other"
            total={other.length}
            percentUp={calculatePercentage(other)}
            percentDown={getLastAccuracy(other)}
            icon={<OtherIcon />}
          />
        </div>
        <div className="col-md-4">
          <CardInfo
            title="N/A"
            total={notAnalysis.length}
            percentUp={calculatePercentage(notAnalysis)}
            percentDown={getLastAccuracy(notAnalysis)}
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
