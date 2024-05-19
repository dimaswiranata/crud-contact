import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {setStatus, addData, modifyData} from '../features/apiSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Formik} from 'formik';
import axios from 'axios';
import {Button} from '../component';

const API_URL = 'https://contact.herokuapp.com/contact';

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

  if (!values.age) {
    errors.age = 'Required';
  }

  return errors;
};

function EditContactScreen({navigation, route}) {
  const dispatch = useDispatch();
  const {status} = useSelector(state => state.api);
  const insets = useSafeAreaInsets();
  const {data} = route.params;

  const handleAdd = async values => {
    dispatch(setStatus('loading'));
    dispatch(modifyData({id: data?.id, updatedData: values}));
    try {
      await axios.put(`${API_URL}/${data?.id}`, values);
    } catch (error) {
      console.log('Error adding data:', error);
    } finally {
      dispatch(setStatus('idle'));
      navigation.goBack();
    }
  };

  return (
    <View>
      <View
        style={{
          backgroundColor: '#FF613C',
          height: insets.top + 56,
          paddingTop: insets.top,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{paddingRight: 16}}>
          <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 18}}>
          Update Contact
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{padding: 16}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Formik
            initialValues={{
              firstName: data.firstName,
              lastName: data.lastName,
              age: data.age.toString(),
            }}
            validate={validate}
            onSubmit={values => {
              handleAdd(values);
            }}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <View>
                <TextInput
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  placeholder="Enter First Name"
                  style={{
                    height: 40,
                    borderColor: 'gray',
                    borderBottomWidth: 1,
                  }}
                />
                {errors.firstName ? (
                  <Text style={{color: '#FF470D', fontSize: 12}}>
                    {errors.firstName}
                  </Text>
                ) : null}
                <TextInput
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  placeholder="Enter Last Name"
                  style={{
                    height: 40,
                    borderColor: 'gray',
                    borderBottomWidth: 1,
                    marginTop: 16,
                  }}
                />
                {errors.lastName ? (
                  <Text style={{color: '#FF470D', fontSize: 12}}>
                    {errors.lastName}
                  </Text>
                ) : null}
                <TextInput
                  onChangeText={handleChange('age')}
                  onBlur={handleBlur('age')}
                  value={values.age}
                  keyboardType="numeric"
                  placeholder="Enter Age"
                  style={{
                    height: 40,
                    borderColor: 'gray',
                    borderBottomWidth: 1,
                    marginTop: 16,
                  }}
                />
                {errors.age ? (
                  <Text style={{color: '#FF470D', fontSize: 12}}>
                    {errors.age}
                  </Text>
                ) : null}
                <Button title="Submit" onPress={handleSubmit} status={status} />
              </View>
            )}
          </Formik>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

export default EditContactScreen;
