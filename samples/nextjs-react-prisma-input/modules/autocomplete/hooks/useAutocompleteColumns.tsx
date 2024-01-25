import { EditOutlined } from '@ant-design/icons';
import { Button, Space, TableColumnType } from 'antd';
import { FragmentType, graphql, useFragment } from '../../../@generated';
import { AutocompleteFragment as AutocompleteFragmentType } from '../../../@generated/graphql';
import { AutocompleteFragment } from '../resource';

export const useAutocompleteColumns = (props: {
  refresh: () => void;
  dataFragment?: FragmentType<typeof AutocompleteFragment>[];
  onEdit?: (d: AutocompleteFragmentType) => void;
}) => {
  const { onEdit } = props;
  const data = useFragment(AutocompleteFragment, props.dataFragment);

  const columns: TableColumnType<AutocompleteFragmentType>[] = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      sorter: true,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      sorter: true,
    },
  ];

  if (onEdit) {
    columns.push({
      title: 'Action',
      key: 'action',
      render: (_, data) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => onEdit(data)} />
        </Space>
      ),
    });
  }

  return { columns, data };
};
