import { CloseCircleFilled, EllipsisOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { Input, Space, type InputRef, type TableColumnsType, type TableColumnType, Button } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';




// doc: https://procomponents.ant.design/en-US/components/table?tab=api&current=1&pageSize=5#search-form-customization
export const waitTime = async (time: number = 100) => {
  await new Promise((resolve) => { setTimeout(resolve, time); });
};

type Issue = {
  id: number;
  title: string;
};
const data = [
  {
    "id": 624748504,
    "title": "[BUG]yarn install命令 antd2.4.5会报错",
  },
  {
    "id": 624691229,
    "title": "[BUG]无法创建工程npm create umi",
  },
] as Issue[];
type DataIndex = keyof Issue;




export default () => {
  const actionRef = useRef<ActionType>();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const columns: ProColumns<Issue>[] = [
    {
      title: '标题',
      key: 'title',
      dataIndex: 'title',
      // copyable: true,
      ellipsis: true, // 超长自动收缩
      filtered: false, // 是否处于筛选状态
      filters: true, // 是否显示过滤器
      filterSearch: true,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search ${'title'}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys as string[], confirm, 'title')}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys as string[], confirm, 'title')}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText((selectedKeys as string[])[0]);
                setSearchedColumn('title');
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record['title']
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      // ...getColumnSearchProps('title'),
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
  ];

  return (
    <div>
      <Button onClick={() => { actionRef.current?.reload(); }}>force request</Button>
      <ProTable<Issue>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        // dataSource={data} // 避免request和dataSource同时存在
        request={async (params, sort, filter) => {
          console.log(params, sort, filter);
          await waitTime(300);
          const data = [
            {
              "id": 624748504,
              "title": "🐛 [BUG]yarn install命令 antd2.4.5会报错",
            },
            {
              "id": 624691229,
              "title": "🐛 [BUG]无法创建工程npm create umi",
            },
          ];
          console.log("api request");

          return Promise.resolve({
            data: data, total: 20
          }) as Promise<{
            data: Issue[]; total: number;
          }>;
        }}
        rowKey="id"
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log({ page }),
        }}
      /></div>
  );
};