import { createStage } from "../gameHelpers";
import type { Player } from "./usePlayer";
import type { STAGE, STAGECELL } from "../components/Stage/Stage";
import { useEffect, useState } from "react";

export const useStage = (player: Player, resetPlayer: () => void) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    if (!player.pos) return;

    setRowsCleared(0);

    const sweepRows = (newStage: STAGE): STAGE => {
      return newStage.reduce((acc, row) => {
        // if we don't find a 0 it means that the row is full and should be cleared
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);

          //create an empty row at beginning of the array to push Tetrominus down instead or returning the cleared row
          acc.unshift(
            new Array(newStage[0].length).fill([0, "clear"]) as STAGECELL[]
          );
          return acc;
        }

        acc.push(row);
        return acc;
      }, [] as STAGE);
    };

    const updateStage = (prevStage: STAGE): STAGE => {
      // first flush the stage
      // if it says 'clear' but don`t have a 0 that means it is a player`s move // and we have to clear
      const newStage = prevStage.map(
        (row) =>
          row.map((cell) =>
            cell[1] === "clear" ? [0, "clear"] : cell
          ) as STAGECELL[]
      );

      // then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });

      if (player.collided) {
        resetPlayer();

        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player.collided, player.pos?.x, player.pos?.y, player.tetromino]);

  return { stage, setStage, rowsCleared };
};
