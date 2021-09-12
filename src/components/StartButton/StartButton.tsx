import { StyledStartButton } from "./StartButton.styles";

type Props = {
  callback: () => void;
};

const StartButton: React.FC<Props> = ({ callback }) => (
  <StyledStartButton onClick={callback}>Start game</StyledStartButton>
);

export default StartButton;
