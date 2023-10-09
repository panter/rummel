import { RefObject } from 'react';
import { keyframes, styled } from 'styled-components';
import { BREAKPOINTS, mediaQueries } from '../../core/mediaQuery';
import { useIsInViewport } from '../../ui/core/hooks/useIsInViewport';

const fadeIn = keyframes`
  from {
    opacity: 0;
    bottom: -30px;
  }
  to {
    opacity: 1;
    bottom: 0;
  }
`;

const fadeOut = keyframes`
  from {
    position: fixed;
    bottom: 0;
  }
  to {
    bottom: -20px;
    position: block;
  }
`;

const Base = styled.div<{ $isInViewport: boolean }>`
  animation: ${fadeOut} 0.2s ease-in-out;
  bottom: -30px;
  &.stick {
    animation: ${fadeIn} 0.2s ease-in-out;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    position: fixed;
    bottom: 0;
    padding: 12px 24px;
    background-color: white;
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);

    z-index: 1000;

    ${mediaQueries.sm`
      max-width: ${BREAKPOINTS.sm}px;
      width: ${BREAKPOINTS.sm}px;
      min-width: ${BREAKPOINTS.sm}px;
    `}

    ${mediaQueries.md`
      max-width: ${BREAKPOINTS.md}px;
      width: ${BREAKPOINTS.md}px;
      min-width: ${BREAKPOINTS.md}px;
    `}
  }
`;

type StickyFooterProps = {
  children: React.ReactNode;
  stickRef: RefObject<any>;
  stick?: boolean;
};

export const StickyFooter: React.FC<StickyFooterProps> = ({
  children,
  stickRef,
  stick,
}) => {
  const isInViewport = useIsInViewport(stickRef);

  return (
    <Base
      $isInViewport={stick ? isInViewport : true}
      className={isInViewport ? '' : 'stick'}
    >
      {children}
    </Base>
  );
};
