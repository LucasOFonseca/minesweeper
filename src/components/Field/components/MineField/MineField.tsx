import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BoardField} from '../../../../hooks';
import {Field} from '../../Field';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#777',
  },

  row: {
    flexDirection: 'row',
  },
});

interface MineFieldProps {
  board: BoardField[][];
  onOpenField: (row: number, column: number) => void;
  onSelectField: (row: number, column: number) => void;
}

export const MineField: React.FC<MineFieldProps> = ({
  board,
  onOpenField,
  onSelectField,
}) => (
  <View style={styles.container}>
    {board.map((row, r) => (
      <View key={r} style={styles.row}>
        {row.map((field, c) => (
          <Field
            key={c}
            {...field}
            onOpen={() => onOpenField(r, c)}
            onSelect={() => onSelectField(r, c)}
          />
        ))}
      </View>
    ))}
  </View>
);
