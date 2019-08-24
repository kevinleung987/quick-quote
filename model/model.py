from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D
from keras.laters import Activation, Dropout, Flatten, Dense

model = Sequential()
model.add(Conv2D(32, (3, 3), input_shape=(3, 150, 150)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))

model.add(Conv2D(32, (3, 3), input_shape=(3, 150, 150)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))

model.add(Conv2D(64, (3, 3), input_shape=(3, 150, 150)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))

model.add(Flatten())
model.add(Dense(64))
model.add(Activation('relu'))
model.add(Dropout(0.5))
model.add(Dense(3))
model.add(Activation('sigmoid'))

model.compile(loss='categorical_crossentropy', optimizer='rmsprop',metrics=['accuracy'])

BATCH_SIZE = 16

train_datagen = ImageDataGenerator(              #Parameters by which we will randomly transform images, thereby increasing data set size
    rescale = 1./255,
    shear_range=0.2,                       #radomly apply shearing transformations
    zoom_range=0.2,                        #Randomly zooming inside pictures
    horizontal_flip=True)                  #random horizontal flip half the images

validate_datagen = ImageDataGenerator(rescale=1./255)

train_generator = train_datagen.flow_from_directory(
    
)