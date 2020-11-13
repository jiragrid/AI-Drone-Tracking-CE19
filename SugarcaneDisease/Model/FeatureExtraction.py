import pandas as pd
import numpy as np
import cv2
import os
import pathlib
import re

from PIL import Image as img
from matplotlib import pyplot as plt

def get_images(path_dir):
    images_path = list(pathlib.Path(path_dir).glob("**/*"))
    
    def atoi(text):
        return int(text) if text.isdigit() else text

    def natural_keys(text):
        return [atoi(c) for c in re.split(r'(\d+)', str(text))]

    return sorted(images_path, key=natural_keys)

class_label = pd.read_csv("./SugarcaneDisease/Class/labels.csv")
feature_label = pd.read_csv("./SugarcaneDisease/Features/labels.csv")
images_path = get_images("./SugarcaneDisease/Class/0/images")

print("\n----------------------------------------------------\n", "Class\n", class_label, "\n----------------------------------------------------\n")
print("\n----------------------------------------------------\n", "Feature\n", feature_label, "\n----------------------------------------------------\n")

plt.figure(figsize=(10, 10))
for image in images_path:
    image_raw = img.open(image)
    image_array = np.asanyarray(image_raw)
    plt.imshow(image_array)
    plt.show()
