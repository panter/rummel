import { Button } from 'antd';
import { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { useLogout } from '../../auth/hooks/useLogout';

const Logo = '/zirkular-logo.png';

const Base = styled.div`
  padding: 12px;
`;

const LogoBase = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
`;

const LogoutButton = styled(Button)`
  position: absolute;
  right: 12px;
  top: 12px;
`;

const HeaderLogo = () => (
  <Link href="/">
    <LogoBase>
      <Image src={Logo} width={210} height={32} alt="Logo" />
    </LogoBase>
  </Link>
);

export type HeaderProps = {
  style?: CSSProperties;
  className?: string;
};

export const Header: React.FC<HeaderProps> = ({ style, className }) => {
  const { logout } = useLogout();

  const handleOnClickLogout = async () => {
    await logout();

    window.location.reload();
  };

  return (
    <Base>
      <HeaderLogo />
      <LogoutButton onClick={handleOnClickLogout}>Logout</LogoutButton>
    </Base>
  );
};
