import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Dialog,
  DialogContent,
  Typography,
} from '@material-ui/core';
import Axios from 'axios';
import { URL, URL_FILE } from '../constants/url';

function CustomTable({

}) {
  const [predictionInfo, setPredictionInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({});

  const toggleDialog = () => setIsOpenDialog(!isOpenDialog);

  const fetchPrediction = async () => {
    try {
      setIsLoading(true);
      const { data } = await Axios.get(URL);

      // console.log(data);
      setPredictionInfo(data?.data?.map((item) => item))
      setIsLoading(false);
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleCloseDialog = () => {
    setDialogInfo(false);
    toggleDialog();
  }

  const handleClickRow = (index = 0) => {
    toggleDialog();
    setDialogInfo(predictionInfo[index]);
  }

  useEffect(() => {
    fetchPrediction();
  }, [])

  // console.log(predictionInfo)

  const RenderDialog = () => (
    <Dialog open={isOpenDialog} onClose={handleCloseDialog} fullWidth>
      <DialogContent>
        <div className="row">
          <img className="col-md-6 w-100 mb-3" src={`${URL_FILE}/${dialogInfo?.url || ''}`} />
          <div className="col-md-6 mb-3">
            <Typography variant="h6">Image Name:</Typography>
            <Typography>{dialogInfo?.file_name?.split('.')[0]}</Typography>
            <Typography className="mt-2" variant="h6">Class Name:</Typography>
            <Typography>{dialogInfo?.class_name}</Typography>
            <Typography className="mt-2" variant="h6">Accuracy:</Typography>
            <Typography>{dialogInfo?.accuracy?.toFixed(2)}%</Typography>
            <Typography className="mt-2" variant="h6">Created At:</Typography>
            <Typography>
              {
                dialogInfo?.timestamp ?
                  new Date(dialogInfo?.timestamp * 1000).toLocaleString()
                  :
                  '-'
              }
            </Typography>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="overflow-100">
      {RenderDialog()}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Image Name</TableCell>
            <TableCell className="text-center">Image Type</TableCell>
            <TableCell className="text-center">Accuracy</TableCell>
            <TableCell className="text-center">Class Name</TableCell>
            <TableCell className="text-center">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={isLoading ? 'd-none' : ''}>
          {
            predictionInfo.map((predict, index) => (
              <TableRow className="row-data" key={`prediction-table-${index}`} onClick={() => handleClickRow(index)}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{predict.file_name.split('.')[0]}</TableCell>
                <TableCell className="text-center">{predict.file_type}</TableCell>
                <TableCell className="text-center">{predict.accuracy.toFixed(2)}%</TableCell>
                <TableCell className="text-center">{predict.class_name}</TableCell>
                <TableCell className="text-center">
                  {
                    predict.timestamp ?
                      new Date(predict.timestamp * 1000).toLocaleString()
                      :
                      '-'
                  }
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <div className={!isLoading && predictionInfo.length === 0 ? 'mt-3 text-center' : 'd-none'}>
        <small>Data is coming soon ...</small>
      </div>
      <div className={isLoading ? 'text-center mt-3' : 'd-none'}>
        <CircularProgress />
        <div>loading ...</div>
      </div>
    </div>
  );
};

export default CustomTable;