import tkinter as tk

from Page import Page

class Result(Page):
  def __init__(self, *args, **kwargs):
    Page.__init__(self, *args, **kwargs)

    label = tk.Label(self, text="Result")
    label.pack(side=tk.TOP, fill=tk.X)

