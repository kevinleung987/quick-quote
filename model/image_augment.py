from keras.preprocessing.image import ImageDataGenerator, array_to_img, img_to_array, load_img

datagen = ImageDataGenerator(              #Parameters by which we will randomly transform images, thereby increasing data set size
    rotation_range=40,                     #Image rotation range in degrees
    width_shift_range=0.2,                 #Randomly translate height/width
    height_shift_range=0.2,
    shear_range=0.2,                       #radomly apply shearing transformations
    zoom_range=0.2,                        #Randomly zooming inside pictures
    horizontal_flip=True,                  #random horizontal flip half the images
    fill_mode='nearest')                   #Fill in newly created pixels from rotation


