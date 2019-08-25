from PIL import Image
import glob, os

f= open("train.csv","a+")
f.write("label,")

for i in range(1567):
    f.write("Pixel "+str(i+1)+",")
f.write("Pixel 1567\n")

os.chdir("dataset\\greyscale\\train\\")
for file in glob.glob("low*.png"):
    img = Image.open(file,'r')
    pix_val = list(img.getdata())
    pix_val_flat = [x for sets in pix_val for x in sets]
    f.write("0,")
    for i in range(len(pix_val_flat)):
        f.write(str(pix_val_flat[i]) + ",")
    f.write(str(pix_val_flat[len(pix_val_flat)-1]) + "\n")

for file in glob.glob("med*.png"):
    img = Image.open(file,'r')
    pix_val = list(img.getdata())
    pix_val_flat = [x for sets in pix_val for x in sets]
    f.write("1,")
    for i in range(len(pix_val_flat)):
        f.write(str(pix_val_flat[i]) + ",")
    f.write(str(pix_val_flat[len(pix_val_flat)-1]) + "\n")

for file in glob.glob("high*.png"):
    img = Image.open(file,'r')
    pix_val = list(img.getdata())
    pix_val_flat = [x for sets in pix_val for x in sets]
    f.write("2,")
    for i in range(len(pix_val_flat)):
        f.write(str(pix_val_flat[i]) + ",")
    f.write(str(pix_val_flat[len(pix_val_flat)-1]) + "\n")

f.close()