import os, random, math, shutil
files = len(os.listdir("greyscale/1"))

for i in range(math.floor(files*0.6)):
    foo = str(random.choice(os.listdir("greyscale/1")))
    shutil.move("greyscale/1/"+foo,"greyscale/train/"+foo)


for i in range(math.floor(files*0.2)):
    foo = str(random.choice(os.listdir("greyscale/1")))
    shutil.move("greyscale/1/"+foo,"greyscale/CV/"+foo)



for i in range(math.floor(files*0.6)):
    foo = str(random.choice(os.listdir("greyscale/1")))
    shutil.move("greyscale/1/"+foo,"greyscale/test/"+foo)

