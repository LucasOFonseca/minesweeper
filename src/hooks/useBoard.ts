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

  const cloneBoard = (board: BoardField[][]) =>
    board.map(row => row.map(field => ({...field})));

  const getNeighbors = (board: BoardField[][], row: number, column: number) => {
    const rows = [row - 1, row, row + 1];
    const columns = [column - 1, column, column + 1];

    const neighbors: BoardField[] = [];

    rows.forEach(r => {
      columns.forEach(c => {
        const different = r !== row || c !== column;
        const validRow = r >= 0 && r < board.length;
        const validColumn = c >= 0 && c < board[0].length;

        if (different && validRow && validColumn) neighbors.push(board[r][c]);
      });
    });

    return neighbors;
  };

  const safeNeighborhood = (
    board: BoardField[][],
    row: number,
    column: number,
  ) =>
    getNeighbors(board, row, column).reduce(
      (acc, neighbor) => acc && !neighbor.mined,
      true,
    );

  const openField = (board: BoardField[][], row: number, column: number) => {
    const field = board[row][column];

    if (field.opened) return;

    field.opened = true;

    if (field.mined) {
      field.exploded = true;

      return;
    }

    const neighbors = getNeighbors(board, row, column);

    if (safeNeighborhood(board, row, column)) {
      neighbors.forEach(n => openField(board, n.row, n.column));

      return;
    }

    field.nearMines = neighbors.filter(n => n.mined).length;
  };

  const getFields = (board: BoardField[][]) =>
    board.reduce((a, b) => [...a, ...b]);

  const hasExplosion = (board: BoardField[][]) =>
    getFields(board).filter(field => field.exploded).length > 0;

  const pending = (field: BoardField) =>
    (field.mined && !field.flagged) ||
    (!field.mined && !field.opened && field.flagged);

  const won = (board: BoardField[][]) =>
    getFields(board).filter(pending).length === 0;

  const showMines = (board: BoardField[][]) =>
    getFields(board)
      .filter(field => field.mined)
      .forEach(field => (field.opened = true));

  return {
    create,
    cloneBoard,
    openField,
    hasExplosion,
    won,
    showMines,
  };
}
