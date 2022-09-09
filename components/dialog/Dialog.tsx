import {
  DialogOverlay as ReachDialog,
  DialogOverlayProps,
} from '@reach/dialog';
import { VisuallyHidden } from '@reach/visually-hidden';
import styled from 'styled-components';

interface DialogProps extends DialogOverlayProps {}

const StyledReachDialog = styled(ReachDialog)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsla(0, 0%, 0%, 0);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
`;

// const StyledBorderCard = styled(BorderCard)`
//   box-shadow: 0px 1px 15px 0px #00000040;
//   display: flex;
// `;

export const Dialog = (props: DialogProps) => {
  return (
    <StyledReachDialog
      onDismiss={props.onDismiss}
      isOpen={props.isOpen}
    >
      <BorderCard subTitle="Hello there">
        <button className="close-button" onClick={props.onDismiss}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>
      </BorderCard>
    </StyledReachDialog>
  );
};
