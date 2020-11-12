import numpy as np
import matplotlib.pyplot as plt
import pathlib
import os
import re
import cv2
import xml.etree.ElementTree as et
import csv
import pandas as pd 

from keras.preprocessing.image import load_img


class SugarcaneDataset():
    def __init__(self):
        self.images_list = []
        self.annots_list = []
        self.images_np = []
        self.annots_np = []

    def __atoi(self, text):
        return int(text) if text.isdigit() else text

    def __natural_keys(self, text):
        return [self.__atoi(c) for c in re.split(r'(\d+)', str(text))]

    def __convert_dir_to_list(self, base_path, class_path, files_path="images/*"):
        data_dir = pathlib.Path(base_path)
        sample_list = list(data_dir.glob(class_path + files_path))
        sample_list = sorted(sample_list, key=self.__natural_keys)

        return sample_list

    def load_dataset(self, base_path, class_path):
        self.images_list = self.__convert_dir_to_list(
            base_path, class_path, files_path="images/*")
        self.annots_list = self.__convert_dir_to_list(
            base_path, class_path, files_path="annotations/*")

    def walk_in_path(self, _path):
        if not os.path.exists(_path):
            return False

        for root, dirs, files in os.walk(_path, topdown=False):
            # for name in files:
            # print(os.path.join("file name:", root, name))
            for name in dirs:
                print(os.path.join("dir name:", root, name))

    def extract_boxes(self, filename):
        tree = et.parse(filename)
        root = tree.getroot()
        boxes = list()

        for box in root.findall('.//bndbox'):
            xmin = int(box.find('xmin').text)
            ymin = int(box.find('ymin').text)
            xmax = int(box.find('xmax').text)
            ymax = int(box.find('ymax').text)
            coors = [xmin, ymin, xmax, ymax]
            boxes.append(coors)

        width = int(root.find('.//size/width').text)
        height = int(root.find('.//size/height').text)

        return boxes, width, height

    def load_image(self, index, width=256, height=256, isPlot=False):
        image = load_img(self.images_list[index])
        image = image.resize((width, height))
        image_array = np.asarray(image)

        if isPlot:
            plt.figure(figsize=(10, 10))
            plt.imshow(image_array)
            plt.show()

        return image_array

    def load_mask(self, index):
        path = self.annots_list[index]
        boxes, w, h = self.extract_boxes(path)
        masks = np.zeros([h, w, len(boxes)], dtype='uint8')

        for i in range(len(boxes)):
            box = boxes[i]
            row_s, row_e = box[1], box[3]
            col_s, col_e = box[0], box[2]
            masks[row_s:row_e, col_s:col_e, i] = 1

            return masks, boxes


dataset_path = "/Users/earthzaa/Downloads/Dataset/"
class_path = "white-leaf-disease/"

print("create class")
white_leaf = SugarcaneDataset()
white_leaf.load_dataset(base_path=dataset_path, class_path=class_path)
print("success load dataset")

images_list = white_leaf.images_list[:5]
meta_list = ["id", "file_name", "x_init", "y_init", "x_end", "y_end", "white-leaf-disease", "ring-spot-disease", "narrow-bronw-spot-disease"]
new_list = []

print("create dataframe")
for index, image_id in enumerate(images_list):
    mask, mask_array = white_leaf.load_mask(index)

    info = [
        str(image_id.stem),
        str(image_id.name),
        mask_array[0][0],
        mask_array[0][1],
        mask_array[0][2],
        mask_array[0][3],
        1,
        0,
        0
    ]

    new_list.append(info)
    print("create dataframe index:", str(index), "success")

df = pd.DataFrame(new_list, columns=meta_list) 
print(df)
df.to_csv(dataset_path + class_path + "white-leaf.csv", index=False, header=True)



