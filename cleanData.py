from PIL import Image
import glob, os

f= open("dataset\\train.csv","a+")

# f.write("label,")
# for i in range(784):
#     f.write("Pixel "+str(i)+",")
# f.write("\n")

os.chdir("dataset\\greyscale\\CV\\")
for file in glob.glob("low*.png"):
    img = Image.open(file,'r')
    pix_val = list(img.getdata())
    pix_val_flat = []
    for sets in pix_val:
        pix_val_flat.append(sets[0])
    f.write("0,")
    for i in range(len(pix_val_flat)):
        f.write(str(pix_val_flat[i]) + ",")
    f.write(str(pix_val_flat[len(pix_val_flat)-1]) + "\n")

for file in glob.glob("med*.png"):
    img = Image.open(file,'r')
    pix_val = list(img.getdata())
    pix_val_flat = []
    for sets in pix_val:
        pix_val_flat.append(sets[0])
    f.write("1,")
    for i in range(len(pix_val_flat)):
        f.write(str(pix_val_flat[i]) + ",")
    f.write(str(pix_val_flat[len(pix_val_flat)-1]) + "\n")

for file in glob.glob("high*.png"):
    img = Image.open(file,'r')
    pix_val = list(img.getdata())
    pix_val_flat = []
    for sets in pix_val:
        pix_val_flat.append(sets[0])
    f.write("2,")
    for i in range(len(pix_val_flat)):
        f.write(str(pix_val_flat[i]) + ",")
    f.write(str(pix_val_flat[len(pix_val_flat)-1]) + "\n")

f.close()