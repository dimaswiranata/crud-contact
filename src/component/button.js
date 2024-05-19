import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

function Button(props) {
  const {title, onPress, status} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: status === 'loading' ? '#A7A9AC' : '#FF613C',
        },
      ]}>
      {status === 'loading' ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 16,
  },
  title: {color: '#ffffff', fontWeight: 'bold', fontSize: 14},
});

export default Button;
