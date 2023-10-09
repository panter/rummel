import { Dropdown, Menu } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FilterShortcut, FullFilterProperty } from './Filter';

const NewFilter = styled.div`
  display: flex;
  min-width: 100px;
  cursor: pointer;
  ::before {
    content: ' ';
    display: inline;
  }
`;

const Base = styled.div``;

export const AddNewFilter: React.FC<{
  style?: {};
  className?: string;
  fullFilter: FullFilterProperty[];
  onNew: (p?: FullFilterProperty) => void;
  children?: React.ReactNode;
}> = ({ style, className, fullFilter, onNew, children }) => {
  const [visible, setVisible] = useState<boolean>();

  const shortcuts = fullFilter.reduce<FilterShortcut[]>((shorts, f) => {
    return [...shorts, ...(f.config.actions || [])];
  }, []);

  const filters = fullFilter.filter((f) => !f.config.show(f.data));
  const menu = filters.length ? (
    <Menu
      onClick={(e) => {
        setVisible(false);
        const filter = fullFilter.find(({ key }) => key === e.key);
        const shortcut = shortcuts.find(({ label }) => label === e.key);
        if (filter) {
          onNew({ ...filter });
        } else if (shortcut) {
          shortcut.action();
        }
      }}
    >
      {filters.map((f) => (
        <Menu.Item key={f.key}>{f.config.label}</Menu.Item>
      ))}
      {shortcuts.length ? <Menu.Divider /> : null}
      {shortcuts.map((f) => (
        <Menu.Item key={f.label}>{f.label}</Menu.Item>
      ))}
    </Menu>
  ) : (
    <div />
  );
  return filters.length ? (
    <Base className={className} style={style}>
      <Dropdown
        trigger={['click']}
        overlay={menu}
        onOpenChange={setVisible}
        open={visible}
      >
        <NewFilter>{children}&nbsp;</NewFilter>
      </Dropdown>
    </Base>
  ) : null;
};
