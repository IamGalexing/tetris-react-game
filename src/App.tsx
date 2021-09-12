import { StyledTetrisWrapper, StyledTetris } from "./App.styles";
import { useRef, useState } from "react";
import { createStage } from "./gameHelpers";

//components
import Stage from "./components/Stage/Stage";
import Display from "./components/Display/Dislplay";
import StartButton from "./components/StartButton/StartButton";

//custom hooks
import { useInterval } from "./hooks/useInterval";
import { usePlayer } from "./hooks/usePlayer";
import { useStage } from "./hooks/useStage";

const App: React.FC = () => {
  const [dropTime, setDropTime] = useState<null | number>(null);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const gameArea = useRef<HTMLDivElement>(null);

  const { player, updatePlayerPos, resetPlayer } = usePlayer();
  const { stage, setStage } = useStage(player, resetPlayer);

  const movePlayer = (dir: number) => {
    updatePlayerPos({ x: dir, y: 0, collided: false });
  };

  const keyUp = ({ code }: { code: string }): void => {
    // change the dropdown speed
    if (code === "ArrowDown") {
      setDropTime(1000);
    }
  };

  const handleStartGame = (): void => {
    //need to focus the window with the key events on start
    if (gameArea.current) gameArea.current.focus();
    // reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
  };

  const move = ({ code, repeat }: { code: string; repeat: boolean }): void => {
    if (code === "ArrowLeft") {
      movePlayer(-1);
    } else if (code === "ArrowRight") {
      movePlayer(1);
    } else if (code === "ArrowDown") {
      if (repeat) return;
      setDropTime(30);
    } else if (code === "ArrowUp") {
      //implement later
    }
  };

  const drop = (): void => {
    updatePlayerPos({ x: 0, y: 1, collided: false });
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
              <Display text='Score: ' />
              <Display text='Rows: ' />
              <Display text='Level: ' />
            </>
          )}
        </div>
        <Stage stage={stage} />
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default App;
