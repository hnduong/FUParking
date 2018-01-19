import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

const FUPButton = ({ text }) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: 'tomato' }]}
    onPress={() => console.log('pressed me!')}
  >
    <View style={styles.button}>
      <Text style={{ color: 'white' }}>
        {text}
      </Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FUPButton
