import React from 'react';
import Rectangle from 'react-rectangle';
import styled from 'styled-components';

const Base = styled(Rectangle)`
  margin-bottom: 24px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  margin: auto;
  object-fit: contain;
`;

export interface ImageInListProps {
  style?: React.CSSProperties;
  className?: string;
  src: string;
  alt: string;
}

const ImageInListComponent: React.FC<ImageInListProps> = ({
  style,
  className,
  src,
  alt,
}) => {
  return (
    <Base style={style} className={className} aspectRatio={16 / 10}>
      {src ? <Image src={src} loading="lazy" alt={alt} /> : null}
    </Base>
  );
};

export const ImageInList = React.memo(ImageInListComponent);
