import React, {useEffect, useMemo, useState} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {gameParams} from '../../configs';
import {Flag} from './components/Flag';
import {Mine} from './components/Mine';

const styles = StyleSheet.create({
  container: {
    height: gameParams.blockSize,
    width: gameParams.blockSize,
    borderWidth: gameParams.borderSize,
    backgroundColor: '#999',
  },

  regular: {
    borderLeftColor: '#CCC',
    borderTopColor: '#CCC',
    borderRightColor: '#333',
    borderBottomColor: '#333',
  },

  opened: {
    borderColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flagged: {},

  exploded: {
    backgroundColor: 'red',
    borderColor: 'red',
  },

  mined: {},

  label: {
    fontWeight: 'bold',
    fontSize: gameParams.fontSize,
  },
});

interface FieldProps {
  exploded?: boolean;
  mined?: boolean;
  opened?: boolean;
  flagged?: boolean;
  nearMines: number;
}

export const Field: React.FC<FieldProps> = ({
  exploded,
  mined,
  opened,
  flagged,
  nearMines,
}) => {
  const [fieldStyles, setFieldStyles] = useState<StyleProp<ViewStyle>[]>([
    styles.container,
  ]);

  const color = useMemo(() => {
    if (nearMines === 1) return '#2B570F';
    if (nearMines === 2) return '#2A28D7';
    if (nearMines > 2 && nearMines < 6) return '#F221A9';
    if (nearMines >= 6) return '#F9060A';

    return undefined;
  }, [nearMines]);

  useEffect(() => {
    if (opened && !fieldStyles.some(style => style === styles.opened))
      setFieldStyles(curr => [...curr, styles.opened]);

    if (exploded && !fieldStyles.some(style => style === styles.exploded))
      setFieldStyles(curr => [...curr, styles.exploded]);

    if (flagged && !fieldStyles.some(style => style === styles.flagged))
      setFieldStyles(curr => [...curr, styles.flagged]);

    if (mined && !fieldStyles.some(style => style === styles.mined))
      setFieldStyles(curr => [...curr, styles.mined]);

    if (!opened && !exploded) setFieldStyles(curr => [...curr, styles.regular]);
  }, [mined, opened, exploded, flagged]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={fieldStyles}>
      {opened ? (
        <>
          {mined ? (
            <Mine />
          ) : nearMines > 0 ? (
            <Text style={[styles.label, {color}]}>{nearMines}</Text>
          ) : null}
        </>
      ) : (
        flagged && <Flag />
      )}
    </View>
  );
};
