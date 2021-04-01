import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import Axios from 'axios';
import { URL, URL_FILE } from '../constants/url';

function Upload({
  images = [],
  isOpen = false,
  onClose = () => { },
}) {
  const IMG_LENGTH = images.length || 0;

  const [progress, setProgress] = useState(0);
  const [prediction, setPrediction] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const NOT_COMPLETE = progress < 100

  const handleCloseModal = () => {
    setProgress(0);
    setPrediction([]);
    setCurrentIndex(0);
    onClose();
  };

  const uploadApi = async (image = {}, index = 0) => {
    try {
      console.log('start upload', index);

      const { data } = await Axios.post(URL, {
        file_name: image.name,
        file_type: image.type,
        src: image.src
      });

      console.log(index, 'success uploaded', data);

      if (Array.isArray(data?.data)) data?.data?.map((item) => prediction.push(item))

      setProgress(((prediction.length + 1) / IMG_LENGTH) * 100);
      setPrediction([...prediction]);
    }
    catch (error) {
      console.log('error upload', error);
    }
  };

  const handleUploadImages = () => {
    images.map((image, index) => {
      uploadApi(image, index);
    })
  };

  useEffect(() => {
    if (images.length > 0 && isOpen && prediction.length === 0 && NOT_COMPLETE) handleUploadImages();
  });

  const RenderBody = () => {
    if (!NOT_COMPLETE) {
      const current = prediction[currentIndex];

      return (
        <div className="row">
          <img className="col-md-6 mt-3" src={`${URL_FILE}/${current?.url || ''}`} />
          <div className="col-md-6 mt-3">
            <Typography variant="h6">Class Name:</Typography>
            <Typography>{current?.class_name}</Typography>
            <Typography className="mt-2" variant="h6">Accuracy:</Typography>
            <Typography>{current?.accuracy?.toFixed(2)}%</Typography>
            <Typography className="mt-2" variant="h6">Created At:</Typography>
            <Typography>
              {
                current?.timestamp ?
                  new Date(current?.timestamp * 1000).toLocaleString('th')
                  :
                  '-'
              }
            </Typography>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="text-center mt-3">
          <div>
            <CircularProgress variant="indeterminate" value={progress} />
          </div>
          <div>
            {/* <LinearProgress variant="indeterminate" value={progress} /> */}
            <small>please wait ...</small>
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
          disabled={currentIndex === 0 || NOT_COMPLETE}
        >
          Back
        </Button>
        <Button
          color="primary"
          onClick={() => setCurrentIndex(currentIndex + 1)}
          disabled={currentIndex >= IMG_LENGTH - 1 || NOT_COMPLETE}
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
