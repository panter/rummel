import {
  EditOutlined,
  PictureOutlined,
  PlusOutlined,
  PullRequestOutlined,
} from '@ant-design/icons';
import { Button, Space, Table, TableColumnType } from 'antd';
import {
  ProjectPhase,
  ProjectsQuery,
  ProjectState,
  SortOrder,
} from '../../../../@generated/graphql';
import {
  gotoCreateNewProject,
  gotoProject,
  gotoProjectImages,
  gotoProjectSearchRequests,
} from '../../../../lib/locations';

import { capitalize } from 'lodash';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { graphql } from '../../../../@generated';
import { ImageInList } from '../../../core/components/ImageInList';
import { Filter } from '../../../filter/components/Filter';
import { FilterPanel } from '../../../filter/components/FilterComponents';
import { usePrismaManyTable } from '../../../table/hooks/usePrismaManyTable';
import { useFilteredProject } from '../../hooks/useFilteredProject';

export const ManyProjectQuery = graphql(/* GraphQL */ `
  query projects(
    $where: ProjectWhereInput
    $orderBy: [ProjectOrderByInput!]
    $take: Int
    $skip: Int
  ) {
    projects(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      name
      shortName
      state
      phase
      mainImageId {
        id
        url
      }
      somehowImportantContactWithoutName {
        id
        firstLine
        firstName
        lastName
        canton
      }
    }
    projectsCount(where: $where)
  }
`);

const useProjectColumns = (props: {
  refresh: () => void;
  projectsQuery?: ProjectsQuery;
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const data = props.projectsQuery?.projects;

  const columns: TableColumnType<ProjectsQuery['projects'][0]>[] = [
    {
      title: t('common:resources.Project.fields.mainImage'),
      key: 'mainImage',
      dataIndex: 'mainImage',
      sorter: false,
      width: 150,
      render: (_, { mainImageId, name }) => (
        <ImageInList
          style={{ maxHeight: '80px' }}
          src={mainImageId?.url || '/images/materials-depot-placeholder.png'}
          alt={name}
        />
      ),
    },
    {
      title: t('common:resources.Project.fields.shortName'),
      key: 'shortName',
      dataIndex: 'shortName',
      sorter: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: t('common:common.status'),
      dataIndex: 'state',
      key: 'state',
      sorter: true,
      render: (state: ProjectState) =>
        // @ts-ignore
        t(`common:enums:ProjectState.${capitalize(state)}`),
    },
    {
      title: t('common:resources.Project.fields.phase'),
      dataIndex: 'phase',
      key: 'phase',
      sorter: true,
      render: (phase: ProjectPhase) =>
        // @ts-ignore
        t(`common:enums:ProjectPhase.${capitalize(phase)}`),
    },
    {
      title: t('common:resources.Contact.fields.bautraegerschaft'),
      key: 'somehowImportantContactWithoutName.firstLine',
      render: (_, { somehowImportantContactWithoutName }) =>
        somehowImportantContactWithoutName?.firstLine,
    },
    {
      title: t('common:resources.Contact.fields.canton'),
      key: 'somehowImportantContactWithoutName.canton',
      render: (_, { somehowImportantContactWithoutName }) =>
        somehowImportantContactWithoutName?.canton,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, { id }) => (
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Space size="middle">
            <Link {...gotoProjectImages(id)}>
              <Button icon={<PictureOutlined />} />
            </Link>
            <Link {...gotoProjectSearchRequests(id)}>
              <Button icon={<PullRequestOutlined />} />
            </Link>
            <Link {...gotoProject(id)}>
              <Button icon={<EditOutlined />} />
            </Link>
          </Space>
        </div>
      ),
    },
  ];

  return { columns, data };
};

export type ProjectsTableProps = {};

export const ProjectsTable: React.FC<ProjectsTableProps> = () => {
  const tableOptions = usePrismaManyTable(
    ManyProjectQuery,
    (data) => data.projectsCount,
    {
      take: 100,
      orderBy: [{ updatedAt: SortOrder.Desc }],
    },
  );

  const { filter, filterConfig, setFilter } = useFilteredProject({
    setWhere: tableOptions.setWhere,
    initialFilter: {
      state: [ProjectState.Active, ProjectState.Draft],
    },
  });
  const { columns, data } = useProjectColumns({
    refresh: tableOptions.queryResult.refetch,
    projectsQuery: tableOptions.queryResult.data,
  });

  return (
    <div>
      <FilterPanel>
        <Filter
          filterConfig={filterConfig}
          filter={filter}
          onChange={setFilter}
        />
        <Link {...gotoCreateNewProject()}>
          <Button icon={<PlusOutlined />} />
        </Link>
      </FilterPanel>
      <Table<any>
        columns={columns}
        dataSource={data || []}
        rowKey="id"
        pagination={tableOptions.pagination}
        onChange={tableOptions.handleTableChange}
      />
    </div>
  );
};
