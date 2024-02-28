import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

import {MineField} from './components/Field/components/MineField';
import {gameParams} from './configs';
import {useBoard} from './hooks';

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    justifyContent: 'flex-end',
  },

  boardContainer: {
    alignItems: 'center',
    backgroundColor: '#777',
  },
});

function App(): React.JSX.Element {
  const {board, handleOpenField, handleInvertFlag} = useBoard();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />

      <Text>Iniciando o Mines!</Text>

      <Text>
        Tamanho da grade: {gameParams.getRowsAmount()}x
        {gameParams.getColumnsAmount()}
      </Text>

      <View style={styles.boardContainer}>
        <MineField
          board={board}
          onOpenField={handleOpenField}
          onSelectField={handleInvertFlag}
        />
      </View>
    </SafeAreaView>
  );
}

export default App;
