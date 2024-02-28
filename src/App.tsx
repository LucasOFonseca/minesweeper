import React, {useMemo} from 'react';
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
    backgroundColor: '#AAA',
  },
});

function App(): React.JSX.Element {
  const {create} = useBoard();

  const getMinesAmount = () => {
    const cols = gameParams.getColumnsAmount();
    const rows = gameParams.getRowsAmount();

    return Math.ceil(cols * rows * gameParams.difficultLevel);
  };

  const board = useMemo(
    () =>
      create(
        gameParams.getRowsAmount(),
        gameParams.getColumnsAmount(),
        getMinesAmount(),
      ),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />

      <Text>Iniciando o Mines!</Text>

      <Text>
        Tamanho da grade: {gameParams.getRowsAmount()}x
        {gameParams.getColumnsAmount()}
      </Text>

      <View style={styles.boardContainer}>
        <MineField board={board} />
      </View>
    </SafeAreaView>
  );
}

export default App;
