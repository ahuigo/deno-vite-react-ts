import { AntDesignOutlined, AppstoreAddOutlined, BorderOutlined, FolderOutlined, JavaScriptOutlined, MailOutlined, RadarChartOutlined } from "@ant-design/icons";

export default {
  antd: <AntDesignOutlined />,
  dom: <JavaScriptOutlined />,
  react: <AppstoreAddOutlined />,
  mapbox: <RadarChartOutlined />,
  default: <FolderOutlined />,
} as { [key: string]: JSX.Element; };