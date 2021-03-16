import React, { 
  useState, 
  useRef,
  useEffect, 
} from 'react';
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
import { fileToBase64 } from '../utils/upload';
import UploadCard from '../component/Upload';

function Analysis() {
  const uploadRef = useRef(null)
  const [images, setImages] = useState([]);
  const [isOpenUploadCard, setIsOpenUploadCard] = useState(false);

  const toggleUploadCard = () => setIsOpenUploadCard(!isOpenUploadCard);

  const handleChangeFile = (event) => {
    const files = event.target.files;
    let arr = [];

    for (let i = 0; i < files.length; i++) {
      fileToBase64(files[i], (res) => {
        arr.push({ src: res, type: files[i].type, name: files[i].name })

        if (arr.length >= files.length) {
          event.target.value = null;

          setImages(arr.map((image) => image));
          toggleUploadCard();
        }
      });
    }
  };

  useEffect(() => {
    // console.log('upload', images);
  }, [images]);

  return (
    <AppContainer>
      <input
        style={{
          position: 'absolute',
          height: '0',
          width: '0',
        }}
        type="file"
        accept="image/*"
        onChange={handleChangeFile}
        ref={uploadRef}
        multiple
      />
      <UploadCard
        images={images}
        isOpen={isOpenUploadCard}
        onClose={toggleUploadCard}
      />
      <Card>
        <CardContent>
          <Typography className="mb-3" variant="h5">Analysis</Typography>
          <Table />
        </CardContent>
      </Card>
      <div className="mb-0 text-center">
        <Tooltip title="Analysis">
          <IconButton className="mt-5" color="primary" onClick={() => uploadRef.current.click()}>
            <AddIcon style={{ fontSize: '1.5em' }} />
          </IconButton>
        </Tooltip>
      </div>
    </AppContainer>
  );
};

export default Analysis;