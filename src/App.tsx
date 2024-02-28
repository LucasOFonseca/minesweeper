import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';

import {MineField} from './components/Field/components/MineField';
import {Header} from './components/Header';
import {gameParams} from './configs';
import {useBoard} from './hooks';
import {LevelSelectionModal} from './screens/LevelSelectionModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  boardContainer: {
    alignItems: 'center',
    backgroundColor: '#777',
  },
});

function App(): React.JSX.Element {
  const {board, newGame, handleOpenField, handleInvertFlag, getFlagsInUse} =
    useBoard();

  const [showLevelSelectionModal, setShowLevelSelectionModal] = useState(false);

  const onLevelSelected = (level: number) => {
    gameParams.difficultLevel = level;

    setShowLevelSelectionModal(false);
    newGame();
  };

  return (
    <>
      <LevelSelectionModal
        isVisible={showLevelSelectionModal}
        onLevelSelected={onLevelSelected}
        onCancel={() => setShowLevelSelectionModal(false)}
      />

      <SafeAreaView style={styles.container}>
        <StatusBar hidden />

        <Header
          flagsInUse={getFlagsInUse()}
          onFlagPress={() => setShowLevelSelectionModal(true)}
          onNewGame={newGame}
        />

        <View style={styles.boardContainer}>
          <MineField
            board={board}
            onOpenField={handleOpenField}
            onSelectField={handleInvertFlag}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

export default App;
