import tkinter as tk
from tkinter.ttk import Progressbar
import time

import colors
from Page import Page
import tkinter.messagebox

class Progress_Bar(Page):
  def __init__(self, *args, **kwargs):
    Page.__init__(self, *args, **kwargs)

    self.__percent = 0

    label = tk.Label(self, text="in Progress ...")
    label.pack(side=tk.TOP, fill=tk.X)
    self.__progress_bar = Progressbar(self, orient=tk.HORIZONTAL, length=100, mode="determinate")
    self.__progress_bar.pack(side=tk.TOP, fill=tk.X, padx=20, pady=10)

  def simulate_progress(self, *args, **kwargs):
    print("Start simulate")

    try:
      for i in range(100):
        self.__percent += 1
        self.__progress_bar["value"] = i
        self.update_idletasks()
        time.sleep(0.025)
      tk.messagebox.showinfo(title="Progress", message="Success !!, click Next to Result")

    except Exception as e:
      print(e)
    
    self.update()

  def get_percentage(self):
    return self.__percent