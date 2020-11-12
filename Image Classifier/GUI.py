import tkinter as tk

H = 512 
W = 1024 

root = tk.Tk()

canvas = tk.Canvas(root, height=H, width=W)
canvas.pack()

label = tk.Label(text="Name")

entry = tk.Entry()

root.mainloop()