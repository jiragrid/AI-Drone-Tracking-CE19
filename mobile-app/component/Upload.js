import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { URL } from '../../constants/url';

function Upload({
  onUploaded = () => { }
}) {
  const [images, setImages] = useState([]);

  const postToApi = async() => {
    try {
      const { data } = await Axios.post(URL, {
        file_name: images[0].name,
        file_type: images[0].type,
        src: images[0].src
      });

      console.log('success upload =>', data);
    }
    catch(error) {
      console.log('error upload =>', error);
    }
  };

  const fileToBase64 = (file, callback) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function() {
      return callback(reader.result.split(',')[1]);
    };
  };

  const handleChangFile = (event) => {
    const files = event.target.files;
    let arr = []

    for(let i = 0; i < files.length; i++) {
      fileToBase64(files[i], (res) => {
        arr.push({ src: res, type: files[i].type, name: files[i].name })

        if (arr.length >= files.length) {
          event.target.value = null;

          setImages(arr.map((image) => image));
        }
      });
    }    
  };

  useEffect(() => {
    // if (images.length > 0) postToApi();
  }, [images]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChangFile} multiple />
    </div>
  );
};

Upload.propTypes = {
  onUploaded: PropTypes.func,
};

export default Upload;
