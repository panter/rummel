import { Col, Divider, Row, RowProps, Typography } from 'antd';
import { isArray } from 'lodash';
import { Children } from 'react';
import { styled } from 'styled-components';
import { Spacer } from '../../../ui/core/components/Spacer';

export const FormLayout = styled.div`
  display: flex;
  width: 100%;
`;

export const FormRow: React.FC<{
  title?: string;
  align?: RowProps['align'];
  gutter?: 'small' | 'middle';
  children: React.ReactNode;
}> = ({ title, align, gutter = 'middle', children }) => (
  <>
    {title ? (
      <>
        <Row
          align={align}
          style={{ width: '100%' }}
          gutter={gutter === 'small' ? 12 : 24}
        >
          <Divider style={{ width: '100%', margin: '12px 0' }} />
          <FormCol>
            <Typography.Title style={{ marginBottom: 16 }} level={4}>
              {title}
            </Typography.Title>
          </FormCol>
          {gutter === 'middle' ? <Spacer s={4} /> : null}
        </Row>
      </>
    ) : null}
    <Row align={align} gutter={gutter === 'small' ? 12 : 24}>
      {children}
      {gutter === 'middle' ? <Spacer s={4} /> : null}
    </Row>
  </>
);

export const FormCol: React.FC<{
  title?: string;
  fullWidth?: boolean;
  columns?: number;
  children: React.ReactNode;
}> = ({ title, fullWidth, children, columns }) => (
  <Col
    xs={columns || 24}
    md={fullWidth ? 24 : columns || 12}
    style={{ width: '100%' }}
  >
    {title ? (
      <Typography.Title style={{ marginBottom: 16 }} level={4}>
        {title}
      </Typography.Title>
    ) : null}
    {children}
  </Col>
);

type HorizontalFormColProps = {
  xs?: number;
  md?: number;
  textAlign?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
};

export const HorizontalFormCol: React.FC<HorizontalFormColProps> = ({
  xs,
  md,
  textAlign = 'left',
  children,
}) => (
  <Col md={md} xs={xs} style={{ textAlign }}>
    {children}
  </Col>
);

export const InputsRow: React.FC<{
  md?: number | number[];
  xs?: number | number[];
  children: React.ReactNode;
}> = ({ children, md, xs }) => {
  const columns = Children.toArray(children);

  const colProps = (index: number): HorizontalFormColProps => ({
    xs: isArray(xs) ? xs[index] || xs[xs.length - 1] : xs,
    md: isArray(md) ? md[index] || md[md.length - 1] : md,
  });
  return (
    <FormRow gutter="small">
      {Children.map(columns, (child, index) => (
        <HorizontalFormCol {...colProps(index)}>{child}</HorizontalFormCol>
      ))}
    </FormRow>
  );
};
