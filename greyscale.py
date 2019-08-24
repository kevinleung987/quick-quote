from PIL import Image
import glob, os

lowDamageRoute = '/dataset/1/'
medDamageRoute = '/dataset/2/'
highDamageRoute = '/dataset/3/'

os.chdir("dataset\\3\\")
for file in glob.glob("*.jpg"):
    img = Image.open(file).convert('LA')
    img.save('grey-'+file[:-4]+'.png')