import numpy as np
import pandas as pd
#from subprocess import check_output
from keras.utils.np_utils import to_categorical

training_data = pd.read_csv()
cross_validate_data = pd.read_csv()

labelTrain = training_data['label']
dataTrain = training_data.drop(labels=['label'], axis=1)
dataCrossValidate = cross_validate_data.values
