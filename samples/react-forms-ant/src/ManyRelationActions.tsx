import { Button, Divider, Space } from 'antd';
import styled from 'styled-components';

const ManyRelationActionsBase = styled.div`
  display: flex;
  flex-direction: row;
`;

type ManyRelationActionsProps = {
  className?: string;
  style?: React.CSSProperties;
  dividerTitle?: string;
  append: () => void;
  remove?: () => void;
};

export const ManyRelationActions: React.FC<ManyRelationActionsProps> = ({
  style,
  className,
  dividerTitle,
  append,
  remove,
}) => {
  return (
    <ManyRelationActionsBase style={style} className={className}>
      {
        <div style={{ width: '100%', paddingRight: '24px' }}>
          <Divider orientation="left" orientationMargin={0}>
            {dividerTitle}
          </Divider>
        </div>
      }
      <Space size={'small'}>
        {!remove ? <Button onClick={() => append()}>+</Button> : null}
        {remove ? <Button onClick={() => remove()}>-</Button> : null}
      </Space>
    </ManyRelationActionsBase>
  );
};
