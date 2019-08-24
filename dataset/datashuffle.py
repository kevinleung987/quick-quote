import os, random, math
files = len(os.listdir("greyscale/1"))
for i in range(math.floor(files*0.6)):
    foo = str(random.choice(os.listdir("greyscale/1")))
    os.rename("grayscale/1/"+foo,"train/"+foo)

for i in range(math.floor(files*0.2)):
    foo = str(random.choice(os.listdir("greyscale/1")))
    os.rename("grayscale/1/"+foo,"CV/"+foo)

for i in range(math.floor(files*0.6)):
    foo = str(random.choice(os.listdir("greyscale/1")))
    os.rename("grayscale/1/"+foo,"test/"+foo)
