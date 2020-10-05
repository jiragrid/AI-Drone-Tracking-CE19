import PIL.Image 
from IPython.display import display, Image

def display_image(file_img, scale=1):
  im = PIL.Image .open(file_img)
  w, h = im.size  
  display(Image(filename=file_img ,width=int(w*scale), height=int(h*scale) ) )
  
display_image('image.jpg',scale=0.25)