import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getMinesAmount} from '../../hooks';
import {Flag} from '../Field/components/Flag';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#555',
    paddingTop: 32,
    paddingHorizontal: 16,
  },

  flagContainer: {
    flexDirection: 'row',
  },

  flagsLeft: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 5,
    marginLeft: 20,
  },

  flagButton: {
    marginTop: 10,
    minWidth: 30,
  },

  button: {
    backgroundColor: '#999',
    padding: 5,
    borderRadius: 4,
  },

  buttonLabel: {
    fontSize: 20,
    color: '#DDD',
    fontWeight: 'bold',
  },
});

interface HeaderProps {
  flagsInUse: number;
  onFlagPress: () => void;
  onNewGame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  flagsInUse,
  onFlagPress,
  onNewGame,
}) => (
  <View style={styles.container}>
    <View style={styles.flagContainer}>
      <TouchableOpacity style={styles.flagButton} onPress={onFlagPress}>
        <Flag bigger />
      </TouchableOpacity>

      <Text style={styles.flagsLeft}>= {getMinesAmount() - flagsInUse}</Text>
    </View>

    <TouchableOpacity style={styles.button} onPress={onNewGame}>
      <Text style={styles.buttonLabel}>Novo Jogo</Text>
    </TouchableOpacity>
  </View>
);
