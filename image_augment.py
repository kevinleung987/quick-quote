from keras.preprocessing.image import ImageDataGenerator, array_to_img, img_to_array, load_img
import os, random

datagen = ImageDataGenerator(              #Parameters by which we will randomly transform images, thereby increasing data set size
    rotation_range=40,                     #Image rotation range in degrees
    width_shift_range=0.2,                 #Randomly translate height/width
    height_shift_range=0.2,
    shear_range=0.2,                       #radomly apply shearing transformations
    zoom_range=0.2,                        #Randomly zooming inside pictures
    horizontal_flip=True,                  #random horizontal flip half the images
    fill_mode='nearest')                   #Fill in newly created pixels from rotation

img = load_img("dataset/greyscale/1/"+str(random.choice(os.listdir("dataset/greyscale/1"))))
img_array = img_to_array(img)                                           #Numpy array with shape of 3, 150, 150
img_array = img_array.reshape((1,) + img_array.shape)                   #Numpy array with shape 1, 3, 150, 150

i = 0
for batch in datagen.flow(img_array, batch_size=1,save_to_dir='preview',save_prefix='car', save_format='jpeg'):
    i += 1
    if i > 20:
        break   #would cause indefinite loop otherwise.

