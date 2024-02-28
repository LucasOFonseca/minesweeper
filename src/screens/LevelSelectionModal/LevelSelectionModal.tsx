import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  container: {
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },

  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 10,
    padding: 5,
    borderRadius: 4,
  },

  buttonLabel: {
    fontSize: 20,
    color: '#EEE',
    fontWeight: 'bold',
  },

  bgEasy: {
    backgroundColor: '#49B65D',
  },

  bgNormal: {
    backgroundColor: '#2765F1',
  },

  bgHard: {
    backgroundColor: '#F26337',
  },
});

interface LevelSelectionModalProps {
  isVisible: boolean;
  onLevelSelected: (level: number) => void;
  onCancel: () => void;
}

export const LevelSelectionModal: React.FC<LevelSelectionModalProps> = ({
  isVisible,
  onLevelSelected,
  onCancel,
}) => (
  <Modal
    transparent
    animationType="slide"
    visible={isVisible}
    onRequestClose={onCancel}>
    <View style={styles.frame}>
      <View style={styles.container}>
        <Text style={styles.title}>Selecione um Nível</Text>

        <TouchableOpacity
          style={[styles.button, styles.bgEasy]}
          onPress={() => onLevelSelected(0.1)}>
          <Text style={styles.buttonLabel}>Fácil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.bgNormal]}
          onPress={() => onLevelSelected(0.2)}>
          <Text style={styles.buttonLabel}>Médio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.bgHard]}
          onPress={() => onLevelSelected(0.3)}>
          <Text style={styles.buttonLabel}>Difícil</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);
