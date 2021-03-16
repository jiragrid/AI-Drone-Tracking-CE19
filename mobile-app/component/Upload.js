import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import Axios from 'axios';
import { URL } from '../constants/url';

function Upload({
  images = [],
  isOpen = false,
  onClose = () => { },
}) {
  const IMG_LENGTH = images.length || 0;
  const [progress, setProgress] = useState(0);
  const [prediction, setPrediction] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCloseModal = () => {
    setProgress(0);
    setPrediction([]);
    setCurrentIndex(0);
    onClose();
  };

  const uploadApi = async (image = {}, index = 0) => {
    try {
      const { data } = await Axios.post(URL, {
        file_name: image.name,
        file_type: image.type,
        src: image.src
      });

      console.log('success upload', data);
      prediction.push(data?.data[0]);

      setProgress((index + 1) / IMG_LENGTH * 100);
      setPrediction([...prediction]);
    }
    catch (error) {
      console.log('error upload', error);
    }
  };

  const handleUploadImages = () => {
    images.map((image, index) => uploadApi(image, index));
  };

  useEffect(() => {
    if (images.length > 0 && isOpen && prediction.length === 0) handleUploadImages();
  });

  const RenderBody = () => {
    if (progress === 100) {
      const current = prediction[currentIndex];

      return (
        <div className="row">
          <img className="col-md-6 mb-2" src={current?.url} />
          <div className="col-md-6 border rounded">
            <Typography variant="h6">Class Name:</Typography>
            <Typography>{current?.class_name}</Typography>
            <Typography className="mt-2" variant="h6">Accuracy:</Typography>
            <Typography>{current?.accuracy}</Typography>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="text-center">
          <div>
            <CircularProgress variant="indeterminate" />
          </div>
          {/* <CircularProgress variant="determinate" value={progress} /> */}
          <div>
            <small>in progress ...</small>
          </div>
        </div>
      )
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseModal}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent>
        {RenderBody()}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setCurrentIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          Back
        </Button>
        <Button
          color="primary"
          onClick={() => setCurrentIndex(currentIndex + 1)}
          disabled={currentIndex >= IMG_LENGTH - 1}
        >
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Upload.propTypes = {
  images: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

Upload.defaultProps = {
  images: [],
  isOpen: false,
  onClose: () => { },
};

export default Upload;
