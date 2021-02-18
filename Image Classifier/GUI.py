import numpy as np
import pathlib
import os
import re
import tkinter.filedialog
import tkinter.messagebox
import tkinter as tk

from tkinter.ttk import Progressbar
from PIL import Image
from matplotlib import pyplot as plt
from collections import namedtuple


class Page(tk.Frame):
    def __init__(self, *args, **kwargs):
        tk.Frame.__init__(self, *args, **kwargs)

    def show(self):
        self.lift()


class Page1(Page):
    def __init__(self, *args, **kwargs):
        Page.__init__(self, *args, **kwargs)
        label = tk.Label(self, text="This is page 1")
        label.pack(side="top", fill="both", expand=True)


class Page2(Page):
    def __init__(self, *args, **kwargs):
        Page.__init__(self, *args, **kwargs)
        label = tk.Label(self, text="This is page 2")
        label.pack(side="top", fill="both", expand=True)


class MainView(tk.Frame):
    def __init__(self, *args, **kwargs):
        tk.Frame.__init__(self, *args, **kwargs)
        p1 = Page1(self)
        p2 = Page2(self)

        buttonframe = tk.Frame(self)
        container = tk.Frame(self)
        buttonframe.pack(side="top", fill="x", expand=False)
        container.pack(side="top", fill="both", expand=True)

        p1.place(in_=container, x=0, y=0, relwidth=1, relheight=1)
        p2.place(in_=container, x=0, y=0, relwidth=1, relheight=1)

        b1 = tk.Button(buttonframe, text="Page 1", command=p1.show)
        b2 = tk.Button(buttonframe, text="Page 2", command=p2.show)

        b1.pack(side="left")
        b2.pack(side="left")

        p1.show()

root = tk.Tk()
main = MainView(root)
main.pack(side="top", fill="both", expand=True)
root.wm_geometry("400x400")
root.mainloop()
