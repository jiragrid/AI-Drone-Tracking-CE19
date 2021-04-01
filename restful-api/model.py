from PIL import Image
import time
import base64
from io import BytesIO
import tensorflow as tf
import pathlib
import numpy as np
from tensorflow import keras, metrics, math
import pandas as pd
import os
from shutil import copyfile


image_height = 256
image_width = 256
threshold = 80

def save_image(src, path):
    file_name = str(int(time.time())) + '.jpeg'
    file_path = path + "/" + file_name

    data = base64.b64decode(src)
    image = Image.open(BytesIO(data))
    image = image.resize((image_width, image_height))
    image.save(file_path, 'JPEG')

    return file_name


def prediction(path, model_dir, class_dir):
    model_path = model_dir
    class_labels = pd.read_csv(class_dir)
    result = []

    model = tf.keras.models.load_model(model_path, compile=True)
    test_path = list(pathlib.Path(path).glob('**/*'))

    for file_path in test_path:
        dir_name = 'restful-api/database/images/save/'

        img = keras.preprocessing.image.load_img(
            file_path, target_size=(image_height, image_width))
        img_array = keras.preprocessing.image.img_to_array(img)
        img_array = img_array.reshape(1, image_width, image_height, 3)

        predictions = model.predict(img_array)
        score = tf.nn.softmax(predictions[0])
        class_no = np.argmax(predictions[0])
        accuracy = 100 * np.max(score)

        get_time = int(time.time())
        file_name = str(get_time) + '.jpeg'
        info = dict()
        info['accuracy'] = accuracy
        info['url'] = dir_name + str(file_name)
        info['timestamp'] = int(get_time)
        
        if accuracy >= threshold:
            info['class_no'] = str(class_no)
            info['class_name'] = str(class_labels['class_name'][class_no])
        else:
            info['class_no'] = str(4)
            info['class_name'] = str(class_labels['class_name'][4])

        result.append(info)

        try:
            copyfile(file_path, './' + dir_name + str(file_name))
            os.remove(file_path)
        except:
            print('')

    return result
