import os
import pathlib
from shutil import copyfile

SOURCE_PATH = "/Users/earthzaa/Downloads/MNIST_Image/"
DESTINATION_PATH = "/Users/earthzaa/Downloads/W9_TEST/"
DIR_NAME = "train-data-set"
START_INDEX = 0 #10
LIST_TOTAL_FILE = [10]#[90, 180, 270, 360, 450]

data_dir = pathlib.Path(SOURCE_PATH)
files = []

for index in range(10):
  files.append(list(data_dir.glob(str(index) + '/*')))

def create_dir(path_dir):
  if not os.path.exists(path_dir):
    os.makedirs(path_dir)

def start_copy_files(start_index, total_file, dest_path):
  for _path_files in files:
    for _path in _path_files[start_index:total_file + start_index]:
      [_path_dir, _file_name] = os.path.split(_path)
      [_path_base, _dir_name] = os.path.split(_path_dir)

      _new_dir = dest_path + _dir_name + "/" 

      create_dir(_new_dir)
      copyfile(_path, _new_dir + _file_name)

count = 0
for total in LIST_TOTAL_FILE:
  print("--------------------------------------------------")
  print("starting copy file, please wait ...")

  _dir = DESTINATION_PATH + DIR_NAME + str(total) + "/"
  create_dir(_dir)
  start_copy_files(START_INDEX, total, _dir)

  count += 1
  print("complete " + str(count) + "!!")
  print("--------------------------------------------------")
  
print("copy success !!")
