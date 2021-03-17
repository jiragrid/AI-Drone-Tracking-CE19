import pandas as pd
import numpy as np
import cv2
import os
import pathlib
import re
import tensorflow as tf

from PIL import Image as img
from matplotlib import pyplot as plt
from sklearn.model_selection import train_test_split
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential

def get_images(path, isConverted=True):
    images_path = list(pathlib.Path(path).glob("**/*"))
    
    def atoi(text):
        return int(text) if text.isdigit() else text

    def natural_keys(text):
        return [atoi(c) for c in re.split(r'(\d+)', str(text))]

    def convert_path_to_string(path_os):
        return str(path_os)

    images_path_sorted = sorted(images_path, key=natural_keys)
    
    if isConverted:
        return convert_image_to_array(images_path_sorted)
    else:
        return map(convert_path_to_string, images_path)

def convert_image_to_array(list_path, no_class=0):
    convert_images = []
    class_ref = []

    for image_path in list_path:
        image_raw = img.open("./" + str(image_path))
        image_array = np.asarray(image_raw)
        convert_images.append(image_array)
        class_ref.append(no_class)
    
    return convert_images, class_ref

print("initialize ...")

print("set config ...")
dataset_path = "./Dataset/train/"
model_path = "./SugarcaneDisease/Class/"
save_path = './SugarcaneDisease/Model/Save/CNN'
label_files = "labels.csv"
image_height = 256
image_width = 256
batch_size = 8
total_epochs = 50
image_shape = (image_width, image_height, 3)
test_ratio = 0.2
validation_ratio = 0.2
seed = 6985
verbose = 1

print("Load Class labels ...")
class_labels = pd.read_csv(model_path + label_files)
print(class_labels)

print("Load Dataset directory ...")
dataset_dir = pathlib.Path(dataset_path)

print("Split train Dataset ...")
train_dataset = tf.keras.preprocessing.image_dataset_from_directory(
  dataset_dir,
  validation_split=validation_ratio,
  subset="training",
  seed=seed,
  image_size=(image_width, image_height),
  batch_size=batch_size
)

print("Split validation Dataset ...")
validattion_dataset = tf.keras.preprocessing.image_dataset_from_directory(
  dataset_dir,
  validation_split=validation_ratio,
  subset="validation",
  seed=seed,
  image_size=(image_width, image_height),
  batch_size=batch_size
)

print("Autotune train and validation Dataset ...")
AUTOTUNE = tf.data.experimental.AUTOTUNE

train_dataset = train_dataset.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
validattion_dataset = validattion_dataset.cache().prefetch(buffer_size=AUTOTUNE)

print("Normalization train and validation Dataset ...")
normalization_layer = layers.experimental.preprocessing.Rescaling(1/255)
normalized_dataset = train_dataset.map(lambda x, y: (normalization_layer(x), y))
image_batch, labels_batch = next(iter(normalized_dataset))
first_image = image_batch[0]
print(np.min(first_image), np.max(first_image)) 

print("Create Model ...")
num_classes = 3
data_augmentation = keras.Sequential(
  [
    layers.experimental.preprocessing.RandomFlip("horizontal", input_shape=image_shape),
    layers.experimental.preprocessing.RandomRotation(0.2),
    layers.experimental.preprocessing.RandomZoom(0.2),
  ]
)
model = Sequential([
    data_augmentation,
    layers.Conv2D(128, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(64, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(64, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(),
    layers.Flatten(),
    layers.Dense(32, activation='relu'),
    layers.Dense(num_classes)
])
model.compile(optimizer='adam',
    loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
    metrics=['accuracy']
)
model.summary()

print("Evaluate Model ...")
history = model.fit(
  train_dataset,
  validation_data=validattion_dataset,
  epochs=total_epochs,
  verbose=verbose
)

print("Visualization ...")
acc = history.history['accuracy']
val_acc = history.history['val_accuracy']

loss = history.history['loss']
val_loss = history.history['val_loss']

epochs_range = range(total_epochs)

plt.figure(figsize=(8, 8))
plt.subplot(1, 2, 1)
plt.plot(epochs_range, acc, label='Training Accuracy')
plt.plot(epochs_range, val_acc, label='Validation Accuracy')
plt.legend(loc='lower right')
plt.title('Training and Validation Accuracy')

plt.subplot(1, 2, 2)
plt.plot(epochs_range, loss, label='Training Loss')
plt.plot(epochs_range, val_loss, label='Validation Loss')
plt.legend(loc='upper right')
plt.title('Training and Validation Loss')
plt.show()

print("Save Model ...")
keras.models.save_model(model, save_path)