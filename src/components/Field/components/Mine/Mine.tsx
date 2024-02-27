import React from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  coreMine: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  line: {
    position: 'absolute',
    height: 3,
    width: 20,
    backgroundColor: 'black',
    borderRadius: 3,
  },
});

export const Mine: React.FC = () => (
  <View style={styles.container}>
    <View style={styles.coreMine} />
    <View style={styles.line} />
    <View style={[styles.line, {transform: [{rotate: '45deg'}]}]} />
    <View style={[styles.line, {transform: [{rotate: '90deg'}]}]} />
    <View style={[styles.line, {transform: [{rotate: '135deg'}]}]} />
  </View>
);
