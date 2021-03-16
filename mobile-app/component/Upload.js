import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
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

  const uploadApi = async (image = {}, index = 0) => {
    try {
      const { data } = await Axios.post(URL, {
        file_name: image.name,
        file_type: image.type,
        src: image.src
      })

      setProgress((index + 1) / IMG_LENGTH * 100);
      console.log(IMG_LENGTH);
      console.log('success upload', data);
    }
    catch (error) {
      console.log('error upload', error);
    }
  };

  const handleUploadImages = () => {
    images.map((image, index) => uploadApi(image, index));
  };

  useEffect(() => {
    if (images.length > 0) handleUploadImages();
  }, [images]);

  const RenderBody = () => {
    if (progress === 100) {
      return (
        <div className="m-2">
          <img className="w-100" src={images[0]} />
        </div>
      )
    }
    else {
      return (
        <span>
          <CircularProgress variant="determinate" value={progress} />
          <div>in progress ...</div>
        </span>
      )
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogContent className="text-center">
        {RenderBody()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
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
