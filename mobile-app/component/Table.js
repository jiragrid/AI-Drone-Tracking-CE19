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

      console.log(data);
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

  const RenderDialog = () => (
    <Dialog open={isOpenDialog} onClose={handleCloseDialog} fullWidth>
      <DialogContent>
        <img className="w-100" src={`${URL_FILE}/${dialogInfo?.url || ''}`} />
        <Typography className="mt-3 mb-3 text-center" variant="subtitle2">Class Name: {dialogInfo?.class_name || ''}</Typography>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="w-100">
      {RenderDialog()}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Image Name</TableCell>
            <TableCell className="text-center">Image Type</TableCell>
            <TableCell className="text-center">Accuracy</TableCell>
            <TableCell className="text-center">Class Name</TableCell>
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