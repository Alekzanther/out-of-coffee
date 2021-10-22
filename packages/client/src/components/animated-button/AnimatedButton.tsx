import styled from '@emotion/styled';
import { useToggle } from './hooks';
const kinds = {
  plusToCheck: 'a',
  outlineHeartToFilledHeart: 'P',
};

interface StyledButtonProps {
  readonly isFavourited: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  background: none;
  outline: none;
  border: none;
  font-family: 'Anicons Regular', sans-serif;
  cursor: pointer;

  > .icon {
    font-variation-settings: ${(props) =>
      props.isFavourited ? "'TIME' 100" : "'TIME' 1"};

    transition: font-variation-settings 0.4s ease;
  }
`;

interface AnimatedButtonProps {
  kind: keyof typeof kinds;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = (
  props,
) => {
  const [isToggled, toggle] = useToggle(false);

  if (props.kind === 'outlineHeartToFilledHeart' && isToggled) {
    console.log('now');
  }

  return (
    <div>
      <StyledButton onClick={toggle} isFavourited={isToggled}>
        <div className="icon">{kinds[props.kind]}</div>
      </StyledButton>
    </div>
  );
};
