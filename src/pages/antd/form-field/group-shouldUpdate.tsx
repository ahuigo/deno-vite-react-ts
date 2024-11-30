import {
  Form,
  Button,
  message,
  Row,
  Col,
  Card,
} from 'antd';

import {
  FooterToolbar,
  ProForm,
  ProFormList,
  ProFormText,
  ProFormDependency,
} from "@ant-design/pro-components";
interface FstMeta {

}
function initMetaList(): FstMeta {
  return { headers: [{ user: "" }] };
}

interface Props {
  fst_id: number;
}

export default function index(props: Props) {
  const { fst_id } = props;
  const [form] = Form.useForm();
  // onFinish
  const onFinish = async (data: FstMeta) => {
    try {
      await {};
    } catch {
      message.error("error");
    }
  };
  return (
    <Card>
      <ProForm<FstMeta>
        className="my-4"
        labelCol={{
          flex: "10rem",
        }}
        layout="horizontal"
        onFinish={onFinish}
        request={async () => {
          if (fst_id) {
            return [];
          } else {
            return initMetaList();
          }
        }}
        form={form}
        submitter={{
          render: (_, dom) => (
            <FooterToolbar>
              <Button
                type="primary"
                onClick={async () => {
                  const data = form.getFieldsValue() as FstMeta[];
                  return true;
                }}
              >
                TEST
              </Button>
              {dom}
            </FooterToolbar>
          ),
        }}
      >
        <Row>
          <Col span={24}>
            <ProFormText name="id" disabled hidden />
          </Col>
          <Col span={24}>
            <ProFormText
              name="key"
              label={<span className="font-bold font-mono">Key</span>}
            />
          </Col>
          <Col span={24}>
            <ProFormList
              label={<span className="font-bold font-mono uppercase">headers</span>}
              name="headers"
              alwaysShowItemLabel
              copyIconProps={false}
              itemRender={(dom) => (
                <Row>
                  <Col span={22}> {dom.listDom} </Col>
                  <Col span={2}> {dom.action} </Col>
                </Row>
              )}
            >
              <Row>
                <Col span={12}>
                  <ProFormText name="user" placeholder={"user"} />
                </Col>
                <Col span={12}>
                  <ProFormDependency name={['user']}>
                    {({ user }, form) => {
                      console.log(user);
                      if (!user) { return null; } // 正常联动
                      return (
                        <ProFormText name="password" placeholder={user} />
                      );
                    }}
                  </ProFormDependency>
                </Col>
              </Row>
            </ProFormList>
          </Col>
        </Row>
      </ProForm>
    </Card>
  );
}
