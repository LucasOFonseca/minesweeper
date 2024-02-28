import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {gameParams} from '../configs';

export interface BoardField {
  row: number;
  column: number;
  opened: boolean;
  nearMines: number;
  flagged?: boolean;
  mined?: boolean;
  exploded?: boolean;
}

const getMinesAmount = () => {
  const cols = gameParams.getColumnsAmount();
  const rows = gameParams.getRowsAmount();

  return Math.ceil(cols * rows * gameParams.difficultLevel);
};

const initializeBoard = (rows: number, columns: number) =>
  Array(rows)
    .fill(0)
    .map((_, row) =>
      Array(columns)
        .fill(0)
        .map<BoardField>((__, column) => ({
          row,
          column,
          opened: false,
          nearMines: 0,
          flagged: false,
          mined: false,
          exploded: false,
        })),
    );

const spreadMines = (board: BoardField[][], minesAmount: number) => {
  const rows = board.length;
  const columns = board[0].length;

  let minesPlanted = 0;

  while (minesPlanted < minesAmount) {
    const row = parseInt(String(Math.random() * rows), 10);
    const column = parseInt(String(Math.random() * columns), 10);

    if (!board[row][column].mined) {
      board[row][column].mined = true;

      minesPlanted += 1;
    }
  }
};

const create = (rows: number, columns: number, minesAmount: number) => {
  const board = initializeBoard(rows, columns);

  spreadMines(board, minesAmount);

  return board;
};

export function useBoard() {
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [board, setBoard] = useState<BoardField[][]>(
    create(
      gameParams.getRowsAmount(),
      gameParams.getColumnsAmount(),
      getMinesAmount(),
    ),
  );

  const cloneBoard = () => board.map(row => row.map(field => ({...field})));

  const getNeighbors = (b: BoardField[][], row: number, column: number) => {
    const rows = [row - 1, row, row + 1];
    const columns = [column - 1, column, column + 1];

    const neighbors: BoardField[] = [];

    rows.forEach(r => {
      columns.forEach(c => {
        const different = r !== row || c !== column;
        const validRow = r >= 0 && r < b.length;
        const validColumn = c >= 0 && c < b[0].length;

        if (different && validRow && validColumn) neighbors.push(b[r][c]);
      });
    });

    return neighbors;
  };

  const safeNeighborhood = (b: BoardField[][], row: number, column: number) =>
    getNeighbors(b, row, column).reduce(
      (acc, neighbor) => acc && !neighbor.mined,
      true,
    );

  const openField = (b: BoardField[][], row: number, column: number) => {
    const field = b[row][column];

    if (field.opened) return;

    field.opened = true;

    if (field.mined) {
      field.exploded = true;

      b[row][column] = field;

      setLost(true);

      return;
    }

    const neighbors = getNeighbors(b, row, column);

    if (safeNeighborhood(b, row, column)) {
      neighbors.forEach(n => openField(b, n.row, n.column));

      return;
    }

    field.nearMines = neighbors.filter(n => n.mined).length;

    b[row][column] = field;

    if (getFields(b).filter(pending).length === 0) setWon(true);
  };

  const handleOpenField = (row: number, column: number) => {
    if (won || lost) return;

    const boardClone = cloneBoard();

    openField(boardClone, row, column);

    setBoard(boardClone);
  };

  const getFields = (b: BoardField[][]) => b.reduce((a, c) => [...a, ...c]);

  const pending = (field: BoardField) =>
    (field.mined && !field.flagged) ||
    (!field.mined && !field.opened && field.flagged);

  const showMines = () => {
    const boardClone = cloneBoard();

    getFields(boardClone)
      .filter(field => field.mined)
      .forEach(field => (field.opened = true));

    setBoard(boardClone);
  };

  const handleInvertFlag = (row: number, column: number) => {
    const boardClone = cloneBoard();

    const field = boardClone[row][column];

    field.flagged = !field.flagged;

    setWon(getFields(boardClone).filter(pending).length === 0);

    setBoard(boardClone);
  };

  useEffect(() => {
    if (lost) {
      showMines();

      Alert.alert('Perdeu', 'Que pena, você perdeu :(');
    }
  }, [lost]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (won) Alert.alert('Parabéns', 'Você venceu!');
  }, [won]);

  return {
    board,
    won,
    lost,
    handleOpenField,
    handleInvertFlag,
  };
}
