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
from sklearn.metrics import classification_report
import json
import time
import datetime


class SugarcaneDisease:
    def __init__(self, config_dir):
        self.config = json.loads(self.open_json_file(config_dir))
    
    def open_json_file(self, path):
        with open(path, 'r') as f:
            return f.read()

    def write_json_file(self, path, data):
        with open(path, 'w') as f:
            json.dump({'logs': data}, f, indent=4)

    def save_log(self, logs_dir):
        logs = json.loads(self.open_json_file(logs_dir))
        logs = logs['logs']

        info = dict()
        info['log_name'] = 'CNN'
        info['date'] = str(datetime.datetime.now())
        info['timestamp'] = int(time.time())
        info['config'] = self.config
        logs.append(info)

        self.write_json_file(logs_dir, logs)

    def train(self):
        print("Set config ...")
        image_config = self.config['image_config']

        image_height = image_config['height']
        image_width = image_config['width']
        dimension = image_config['dimensions']
        batch_size = image_config['batch_size']

        test_ratio = self.config['test_ratio']
        validation_ratio = self.config['validation_ratio']
        verbose = self.config['verbose']
        seed = self.config['seed']
        total_epochs = self.config['epochs']
        hidden_layers = self.config['hidden_layers']
        max_pooling = self.config['max_pooling']

        image_shape = (image_width, image_height, dimension)
        
        print("Load Class labels ...")
        print(self.config['labels_dir'])

        print("Load Dataset directory ...")
        dataset_dir = pathlib.Path(self.config['dataset_dir'])

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
        data_augment = self.config['data_augment']

        train_dataset = train_dataset.cache().shuffle(data_augment['shuffle']).prefetch(buffer_size=AUTOTUNE)
        validattion_dataset = validattion_dataset.cache().prefetch(buffer_size=AUTOTUNE)

        print("Normalization train and validation Dataset ...")
        normalization_layer = layers.experimental.preprocessing.Rescaling(1/255)
        normalized_dataset = train_dataset.map(lambda x, y: (normalization_layer(x), y))
        image_batch, labels_batch = next(iter(normalized_dataset))
        first_image = image_batch[0]
        print(np.min(first_image), np.max(first_image)) 

        print("Create Model ...")
        num_classes = self.config['total_class']
        data_augmentation = keras.Sequential(
            [
                layers.experimental.preprocessing.RandomFlip(data_augment['flip'], input_shape=image_shape),
                layers.experimental.preprocessing.RandomRotation(data_augment['rotation']),
                layers.experimental.preprocessing.RandomZoom(data_augment['zoom']),
            ]
        )
        model = Sequential([
            data_augmentation,
            layers.experimental.preprocessing.Rescaling(1./255, input_shape=(image_width, image_height, dimension)),
            layers.Conv2D(hidden_layers[0], max_pooling, padding='same', activation='relu'),
            layers.MaxPooling2D(),
            layers.Conv2D(hidden_layers[1], max_pooling, padding='same', activation='relu'),
            layers.MaxPooling2D(),
            layers.Conv2D(hidden_layers[2], max_pooling, padding='same', activation='relu'),
            layers.MaxPooling2D(),
            layers.Dropout(0.2),
            layers.Flatten(),
            layers.Dense(hidden_layers[3], activation='relu'),
            layers.Dense(num_classes)
        ])
        model.compile(optimizer=self.config['optimizer'],
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
        keras.models.save_model(model, self.config['save_model_dir'])

    def train_with_gpu(self):
        with tf.device('/device:GPU:0'):
            self.train()
    
    def test(self, y_true):
        print("Set config ...")
        image_config = self.config['image_config']

        image_height = image_config['height']
        image_width = image_config['width']
        dimensions = image_config['dimensions']
        batch_size = 32
        model_dir = self.config['test_model_dir']
        class_labels = pd.read_csv(self.config['labels_dir'])
        test_path = self.config['testset_dir']
        test_images_path = list(pathlib.Path(test_path).glob("**/*"))
        result_list = []
        images_list = []
        y_predict = []
        count = 0

        print("Load Model ...")
        model = tf.keras.models.load_model(model_dir, compile=True)

        print("Load test Dataset ...")
        csv_labels = ["file_path", "class_no", "class_name", "accuracy"]
        print(class_labels)

        print("Load image ...")

        for test_path in test_images_path:
            print("Convert image to array ...")
            print(test_path)
            img = keras.preprocessing.image.load_img(test_path, target_size=(image_height, image_width))
            img_array = keras.preprocessing.image.img_to_array(img)

            print("Reshape image ...")
            # img_array /= 255
            img_array = img_array.reshape(1, image_width, image_height, dimensions)
            
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
            result_list.append(class_no)
            count += 1
            print("Success", count, "...")

            # print(test_path)
            # print("Class", class_no, ":", class_labels["class_name"][class_no], "Probability:", probability)
            # print("--------------------------------------------------------------------------------------------------")

        print("Result ...")
        print(classification_report(y_true, y_predict))
        print(tf.math.confusion_matrix(y_true, y_predict))

        return result_list

        # df = pd.DataFrame(result_list, columns=csv_labels) 
        # df.to_csv("./SugarcaneDisease/Result/" + "result.csv", index=True, header=True)
        
