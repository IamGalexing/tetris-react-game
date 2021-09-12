import { StyledTetrisWrapper, StyledTetris } from "./App.styles";
import { useRef, useState } from "react";
import { createStage, isColliding } from "./gameHelpers";

//components
import Stage from "./components/Stage/Stage";
import Display from "./components/Display/Dislplay";
import StartButton from "./components/StartButton/StartButton";

//custom hooks
import { useInterval } from "./hooks/useInterval";
import { usePlayer } from "./hooks/usePlayer";
import { useStage } from "./hooks/useStage";
import { useGameStatus } from "./hooks/useGameStatus";

const App: React.FC = () => {
  const [dropTime, setDropTime] = useState<null | number>(null);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const gameArea = useRef<HTMLDivElement>(null);

  const { player, updatePlayerPos, resetPlayer, playerRotate } = usePlayer();
  const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
  const { score, setScore, rows, setRows, level, setLevel } =
    useGameStatus(rowsCleared);

  const movePlayer = (dir: number) => {
    if (!isColliding(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  const keyUp = ({ code }: { code: string }): void => {
    // change the dropdown speed
    if (!gameOver && code === "ArrowDown") {
      setDropTime(1000 / level + 200);
    }
  };

  const handleStartGame = (): void => {
    //need to focus the window with the key events on start
    if (gameArea.current) gameArea.current.focus();
    // reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(1);
    setRows(0);
    setGameOver(false);
  };

  const move = ({ code, repeat }: { code: string; repeat: boolean }): void => {
    if (!gameOver) {
      if (code === "ArrowLeft") {
        movePlayer(-1);
      } else if (code === "ArrowRight") {
        movePlayer(1);
      } else if (code === "ArrowDown") {
        if (repeat) return;
        setDropTime(30);
      } else if (code === "ArrowUp" || code === "Space") {
        playerRotate(stage);
      }
    }
  };

  const drop = (): void => {
    if (!gameOver) {
      if (rows > level * 10) {
        setLevel((prev) => prev + 1);
        //also increase speed
        setDropTime(1000 / level + 200);
      }
    }
    //increase level when player has cleared 10 rows

    if (!isColliding(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      //game over!
      if (player.pos.y < 1) {
        console.log("Game over!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role='button'
      tabIndex={0}
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
      ref={gameArea}
    >
      <StyledTetris>
        <div className='display'>
          {gameOver ? (
            <>
              <Display gameOver={gameOver} text='Game over!' />
              <StartButton callback={handleStartGame} />
            </>
          ) : (
            <>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </>
          )}
        </div>
        <Stage stage={stage} />
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default App;
