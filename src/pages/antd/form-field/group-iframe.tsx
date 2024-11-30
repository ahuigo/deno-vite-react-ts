// title: Form Group16
import { ProForm, ProFormText } from "@ant-design/pro-components";

import { useState } from "react";

export default () => {
  const [urls, setUrls] = useState({ left: '', right: '' });

  const handleFormSubmit = async ({ left, right }: any) => {
    setUrls({ left, right });
  };

  return (
    <div className="">
      <div>
        <ProForm onFinish={handleFormSubmit} initialValues={{ left: 'url1', right: 'url2' }}>
          {/* 看起来只是水平一行排列 */}
          <ProForm.Group>
            <ProFormText name="left" label="Left URL" />
            <ProFormText name="right" label="Right URLa" />
          </ProForm.Group>
        </ProForm>
      </div>
      <div className="flex">
        <div className="flex-1"><iframe src={urls.left} /></div>
        <div className="flex-1"><iframe src={urls.right} /></div>
      </div>
    </div>
  );
};
