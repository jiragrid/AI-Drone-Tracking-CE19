import tensorflow as tf
import pandas as pd
import re
import pathlib
import numpy as np
import os

from matplotlib import pyplot as plt
from PIL import Image as img
from tensorflow import keras, metrics, math
from sklearn.metrics import classification_report

image_height = 256
image_width = 256
batch_size = 32
root_dataset_path = "./Dataset/test/"
model_path = "./SugarcaneDisease/Model/Save/CNN-V1"

print("Load Model ...")
model = tf.keras.models.load_model(model_path, compile=True)

print("Load test Dataset ...")
class_labels = pd.read_csv("./SugarcaneDisease/Class/labels.csv")
csv_labels = ["file_path", "class_no", "class_name", "accuracy"]

test_images_path = list(pathlib.Path(root_dataset_path).glob("**/*"))
result_list = []
images_list = []
y_predict = []
count = 0
y_true = [0]*45 + [1]*45 + [2]*45

print("Load image ...")
for test_path in test_images_path:
    print("Convert image to array ...")
    print(test_path)
    img = keras.preprocessing.image.load_img(test_path, target_size=(image_height, image_width))
    img_array = keras.preprocessing.image.img_to_array(img)

    print("Reshape image ...")
    # img_array /= 255
    img_array = img_array.reshape(1, image_width, image_height, 3)
    
    print("Predict image ...")
    predictions = model.predict(img_array)
    score = tf.nn.softmax(predictions[0])
    class_no = np.argmax(predictions[0])
    accuracy = 100 * np.max(score)

    y_predict.append(class_no)

    print("Write Prediction image ...")
    info = [
        test_path,
        class_no,
        class_labels["class_name"][class_no],
        accuracy
    ]
    result_list.append(info)
    count += 1
    print("Success", count, "...")

    # print(test_path)
    # print("Class", class_no, ":", class_labels["class_name"][class_no], "Probability:", probability)
    # print("--------------------------------------------------------------------------------------------------")

print("Result ...")
print(classification_report(y_true, y_predict))
print(tf.math.confusion_matrix(y_true, y_predict))

# df = pd.DataFrame(result_list, columns=csv_labels) 
# df.to_csv("./SugarcaneDisease/Result/" + "result.csv", index=True, header=True)


