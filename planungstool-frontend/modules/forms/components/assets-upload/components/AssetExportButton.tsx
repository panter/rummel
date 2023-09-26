import Link from 'next/link';
import { PublicRuntimeConfig } from '../../../../../lib/config';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';

type AssetExportButtonProps = {
  style?: React.CSSProperties;
  className?: string;
  apiHref: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  label: string | ReactElement;
};

export const Base = styled.div``;

export const AssetExportRowDivider = styled(Divider)`
  .ant-divider-inner-text {
    display: flex;
    flex-direction: row;

    ${Base} {
      margin-left: 12px;
    }
  }
`;

export const AssetExportButton: React.FC<AssetExportButtonProps> = ({
  style,
  className,
  apiHref,
  onClick,
  label,
}) => {
  return (
    <Base>
      <Link
        style={style}
        className={className}
        download
        onClick={onClick}
        target="_blank"
        href={`${PublicRuntimeConfig.getOrThrow('GRAPHQL_ENDPOINT')}${apiHref}`}
      >
        {label}
      </Link>
    </Base>
  );
};
