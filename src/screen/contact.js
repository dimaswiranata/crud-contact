import React, {useEffect} from 'react';
import {View, ActivityIndicator, FlatList, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {removeData, setData, setStatus} from '../features/apiSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {ContactItem, Header} from '../component';

const API_URL = 'https://contact.herokuapp.com/contact';

function ContactScreen({navigation}) {
  const dispatch = useDispatch();
  const {data, status} = useSelector(state => state.api);

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchData = async () => {
    dispatch(setStatus('loading'));
    try {
      const response = await axios.get(API_URL);
      dispatch(setData(response?.data?.data));
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      dispatch(setStatus('idle'));
    }
  };

  const deleteData = async id => {
    dispatch(setStatus('loading'));
    dispatch(removeData(id));
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      dispatch(setStatus('idle'));
    }
  };

  const createThreeButtonAlert = data =>
    Alert.alert('Warning!', 'Are you sure want to delete this contact?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteData(data.id)},
    ]);

  if (status === 'loading') {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#FF613C" />
      </View>
    );
  }

  return (
    <View>
      <Header
        title={'My Contact'}
        rightPress={() => navigation.navigate('Add')}
        right={<MaterialIcons name="add" size={30} color="#ffffff" />}
      />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        extraData={data}
        refreshing={status == 'loading'}
        onRefresh={fetchData}
        // keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ContactItem
            data={item}
            editPress={() => {
              console.log('Edit Pressed');
              navigation.navigate('Edit', {data: item});
            }}
            deletePress={() => createThreeButtonAlert(item)}
          />
        )}
      />
    </View>
  );
}

export default ContactScreen;
