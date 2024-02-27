export interface BoardField {
  row: number;
  column: number;
  opened: boolean;
  nearMines: number;
  flagged?: boolean;
  mined?: boolean;
  exploded?: boolean;
}

export function useBoard() {
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

  return create;
}
