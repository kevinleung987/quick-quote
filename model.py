import numpy as np
import pandas as pd
#from subprocess import check_output
from keras.utils.np_utils import to_categorical
from sklearn.model_selection import train_test_split
from keras import Sequential
from keras.layers import Dense, MaxPooling2D, Dropout, Flatten, Conv2D

training_data = pd.read_csv('dataset/train.csv')
testing_data = pd.read_csv('dataset/test.csv')

labelTrain = training_data['label']
dataTrain = training_data.drop(labels=['label'], axis=1)
dataTest = testing_data.values

dataTrain = dataTrain/255                                            #normalization, makes data easier to work with visually.
dataTest = dataTrain/255                           

dataTrain = dataTrain.values.reshape(-1,28,28,1)            #unroll vector back into image matrix. 28*28px (h,w) with a channel of 1.
dataTest = dataTest.reshape([-1,28,28,1])

labelTrain = to_categorical(labelTrain, num_classes=3)

dataTrain, dataVal, labelTrain, labelVal = train_test_split(dataTrain, dataVal, random_state=2, test_size=0.25)

model = Sequential()

model.add(Conv2D(filters=32, kernel_size=(5,5), activation='relu', padding='same', input_shape=(28, 28, 1)))
model.add(MaxPooling2D(padding='same', pool_size=(2, 2)))
model.add(Dropout(0.25))

model.add(Conv2D(filters=32, kernel_size=(5,5), activation='relu', padding='same'))
model.add(MaxPooling2D(padding='same', pool_size=(2, 2)))
model.add(Dropout(0.25))

model.add(Conv2D(filters=64, kernel_size=(3,3), activation='relu', padding='same'))
model.add(MaxPooling2D(padding='same', pool_size=(2, 2)))
model.add(Dropout(0.25))

model.add(Conv2D(filters=64, kernel_size=(3,3), activation='relu', padding='same'))
model.add(MaxPooling2D(padding='same', pool_size=(2, 2)))
model.add(Dropout(0.25))

model.add(Flatten())
model.add(Dense(256, activation='relu'))
model.add(Dropout(0.25))
model.add(Dense(3, activation='softmax'))

model.compile(loss='categorical_crossentropy', optimizer='Adam', metrics=['accuracy'] )
model.fit(batch_size=200, epochs=12, x=dataTrain, y=labelTrain, validation_data=[dataVal, labelVal])

predict = model.predict(dataTest)
label = np.argmax(predict, axis=1)
test_id = np.reshape(range(1, len(predict) + 1), label.shape)

output = pd.DataFrame({'ImageId': test_id, 'Label': label})
output.to_csv('output.csv', index=False)
