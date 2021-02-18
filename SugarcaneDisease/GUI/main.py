import tkinter as tk
import tkinter.messagebox

import colors
from Select_Dir import Select_Dir
from Progress import Progress_Bar
from Result import Result

class Main(tk.Frame):
  def __init__(self, *args, **kwargs):
    tk.Frame.__init__(self, *args, **kwargs)

    self.__P1 = Select_Dir(self)
    self.__P2 = Progress_Bar(self)
    self.__P3 = Result(self)
    self.__state = 0

    container = tk.Frame(self)
    container.pack(side=tk.TOP, fill=tk.BOTH, expand=True, pady=20)

    self.__btn_next = tk.Button(self, text="next", bg=colors.BLUE, fg=colors.WHITE, command=self.__next_page)
    self.__btn_next.pack(side=tk.BOTTOM, pady=10)

    self.__P1.place(in_=container, x=0, y=0, relwidth=1, relheight=1)
    self.__P2.place(in_=container, x=0, y=0, relwidth=1, relheight=1)
    self.__P3.place(in_=container, x=0, y=0, relwidth=1, relheight=1)

    self.__P1.show()

  def __next_page(self):
    if self.__P2.get_percentage():
      self.state = 2
      # tk.messagebox.showinfo(title="Report", message="Update")
      self.__btn_next.pack_forget()
      self.__P3.show()
      self.update()

    elif self.__P1.get_target_dir():
      self.state = 1
      self.__P2.show()
      self.update()
      self.__P2.simulate_progress()

    else:
      tk.messagebox.showerror(title="Error", message="Please select image(s) Directory")

if __name__ == "__main__":
  root = tk.Tk()
  main = Main(root)
  root.title("Sugarcane Disease Prediction")
  main.pack(side=tk.TOP, fill=tk.BOTH, expand=True)
  root.wm_geometry("512x512")
  root.mainloop(0)