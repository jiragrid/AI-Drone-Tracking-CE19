import tkinter as tk
import tkinter.filedialog

import colors
from Page import Page

class Select_Dir(Page):
  def __init__(self, *args, **kwargs):
    Page.__init__(self, *args, **kwargs)

    self.__target_dir = tk.Variable("")
    label = tk.Label(self, text="Choose image(s) Directory")
    label.pack(side=tk.TOP)
    entry = tk.Entry(self, textvariable=self.__target_dir, state=tk.DISABLED)
    entry.pack(side=tk.TOP, padx=50, pady=10, fill=tk.X)
    label_help = tk.Label(self, text="support format: *.png, *.jpg", fg=colors.GREY)
    label_help.pack(side=tk.TOP, fill=tk.X)
    btn_dir = tk.Button(self, text="Directory", command=lambda : self.__browser_dir(self, text=self.__target_dir), bg=colors.BLUE, fg=colors.WHITE, font=40)
    btn_dir.pack(side=tk.TOP, pady=10)

  def __browser_dir(self, *args, **kwargs):
    folder_name = tk.filedialog.askdirectory()

    try:
      if kwargs["text"]:
        kwargs["text"].set(folder_name + "/")
    except Exception as e:
      print(e)

    self.update()
  
  def get_target_dir(self):
    return self.__target_dir.get()
