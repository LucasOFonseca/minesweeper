import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BoardField} from '../../../../hooks';
import {Field} from '../../Field';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
  },

  row: {
    flexDirection: 'row',
  },
});

interface MineFieldProps {
  board: BoardField[][];
}

export const MineField: React.FC<MineFieldProps> = ({board}) => (
  <View style={styles.container}>
    {board.map((row, r) => (
      <View key={r} style={styles.row}>
        {row.map((field, c) => (
          <Field key={c} {...field} />
        ))}
      </View>
    ))}
  </View>
);
