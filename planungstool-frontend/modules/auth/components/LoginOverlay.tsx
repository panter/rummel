import { CSSProperties } from 'react';
import { LoginForm } from './LoginForm';
import { Spacer } from '../../ui/core/components/Spacer';
import styled from 'styled-components';
import { useIsAuthenticatedPoller } from '../hooks/useIsAuthenticatedPoller';
import { useTranslation } from 'react-i18next';

const Base = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Jost', sans-serif;
  background: linear-gradient(
    135deg,
    rgba(210, 70, 50, 0.1),
    rgba(254, 209, 177, 0.1)
  );
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  width: 100%;
  text-align: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 500px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  padding: 42px;
`;

export type LoginOverlayProps = {
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

export const LoginOverlay: React.FC<LoginOverlayProps> = ({
  style,
  className,
  children,
}) => {
  const { t } = useTranslation();
  const { isAuthenticated, loading } = useIsAuthenticatedPoller();

  if (loading) return null;
  if (isAuthenticated) return children;

  return (
    <Base style={style} className={className}>
      <Box>
        <Title>{t('common:auth.loginForm.popupHeader')}</Title>
        <Spacer s={8} />
        <LoginForm />
      </Box>
    </Base>
  );
};
