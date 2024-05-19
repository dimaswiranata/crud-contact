import React from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from '../assets/icons';

function ContactItem(props) {
  const {data, editPress, deletePress} = props;

  const isValidUrl = string => {
    const regex = /\.(jpeg|jpg|gif|png|bmp|webp)$/i;
    return regex.test(string);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image
          style={styles.image}
          source={
            !isValidUrl(data?.photo ?? '')
              ? Icons.User
              : {
                  uri: data.photo,
                }
          }
        />
        <View style={{marginLeft: 16}}>
          <Text>
            {data?.firstName} {data?.lastName}
          </Text>
          <Text>{data?.age}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{paddingHorizontal: 4}} onPress={editPress}>
          <MaterialCommunityIcons name="pencil" size={24} color="#838383" />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingHorizontal: 4}} onPress={deletePress}>
          <MaterialCommunityIcons name="trash-can" size={24} color="#838383" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#A7A9AC',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});

export default ContactItem;
