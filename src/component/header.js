import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function Header(props) {
  const {title, right, rightPress} = props;

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {height: insets.top + 56, paddingTop: insets.top},
      ]}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={rightPress}>{right}</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF613C',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {color: '#ffffff', fontWeight: 'bold', fontSize: 18},
});

export default Header;
