import matplotlib.pyplot as plt

total_files = [90, 180, 270, 360, 450]
acc_list = [94, 96, 97, 98, 99]

plt.plot(total_files, acc_list)
plt.xlabel("Total Files")
plt.ylabel('Accuracy (%)')
plt.show()