import tkinter as tk

import colors

class Page(tk.Frame):
  def __init__(self, *args, **kwargs):
    tk.Frame.__init__(self, *args, **kwargs)
  
  def show(self):
    print("Show", self)
    
    self.lift()

  def change_btn_to_normal(self, *args, **kwargs):
    print("Change Button to Normal")

    try:
      if kwargs["btn"]:
        kwargs["btn"].configure(state=tk.NORMAL, bg=colors.BLUE, fg=colors.WHITE)
    except Exception as e:
      print(e)
    
    self.update()