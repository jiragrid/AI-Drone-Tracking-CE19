import tensorflow as tf
import pandas as pd
import re
import pathlib
import numpy as np
import os

from matplotlib import pyplot as plt
from PIL import Image as img
from tensorflow import keras

image_height = 256
image_width = 256
batch_size = 32
root_dataset_path = "./Dataset/test/"
model_path = "./SugarcaneDisease/Model/Save/CNN"

print("Load Model ...")
model = tf.keras.models.load_model(model_path, compile=True)

print("Load test Dataset ...")
class_labels = pd.read_csv("./SugarcaneDisease/Class/labels.csv")
csv_labels = ["File path", "Class No", "Class Name", "Probability"]

test_images_path = list(pathlib.Path(root_dataset_path).glob("**/*"))
result_list = []
count = 0

print("Create CSV result ...")
for test_path in test_images_path:
    img = keras.preprocessing.image.load_img(test_path, target_size=(image_height, image_width))
    img_array = keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    predictions = model.predict(img_array)
    score = tf.nn.softmax(predictions[0])
    class_no = np.argmax(predictions[0])
    probability = 100 * np.max(score)

    info = [
        test_path,
        class_no,
        class_labels["class_name"][class_no],
        probability
    ]
    result_list.append(info)
    print(count+1, end=" ")
    count += 1

    # print(test_path)
    # print("Class", class_no, ":", class_labels["class_name"][class_no], "Probability:", probability)
    # print("--------------------------------------------------------------------------------------------------")

df = pd.DataFrame(result_list, columns=csv_labels) 
df.to_csv("./SugarcaneDisease/Result/" + "result.csv", index=True, header=True)


