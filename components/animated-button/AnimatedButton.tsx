import { css } from 'styled-components';
import styled from 'styled-components';
const kinds = {
  plusToCheck: 'a',
  outlineHeartToFilledHeart: 'P',
};

interface StyledButtonProps {
  readonly isFavourited: boolean;
  color?: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  background: none;
  outline: none;
  border: none;
  font-family: 'Anicons Regular', sans-serif;
  cursor: pointer;
  color: ${(props) => props.color || 'inherit'};
  > .icon {
    font-variation-settings: ${(props) =>
      props.isFavourited ? "'TIME' 100" : "'TIME' 1"};
    transition: font-variation-settings 0.4s ease;
  }
  &:focus-visible {
    border: solid 1px hotpink;
    border-radius: 5px;
  }
`;

interface AnimatedButtonProps {
  kind: keyof typeof kinds;
  onClick?: () => void;
  ariaLabel?: string;
  buttonColor?: string;
  isToggled?: boolean | null;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = (
  props,
) => {
  const handleClick = () => {
    props?.onClick?.();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <StyledButton
        onClick={handleClick}
        isFavourited={props.isToggled || false}
        aria-label={props.ariaLabel}
        color={props.buttonColor}
      >
        <div className="icon">{kinds[props.kind]}</div>
      </StyledButton>
    </div>
  );
};
