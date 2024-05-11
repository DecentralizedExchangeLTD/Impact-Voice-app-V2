import React from "react";
import { Modal } from "antd";

export const info = (title, content, handleOk) => {
  Modal.info({
    title: title,
    // can build a ReactNode as content. In that case, content: content
    // Usage - info('Title', <div>hello</div>, ()=>console.log('info'))
    content: (
      <div>
        <p>{content}</p>
      </div>
    ),
    onOk: handleOk,
    centered,
  });
};

export const success = (title, content, handleOk) => {
  Modal.success({
    title: title,
    content: content,
    onOk: handleOk,
    centered,
  });
};

export const error = (title, content, handleOk) => {
  Modal.error({
    title: title,
    content: content,
    onOk: handleOk,
    centered,
  });
};

export const warning = (title, content, handleOk) => {
  Modal.warning({
    title: title,
    content: content,
    onOk: handleOk,
    centered,
  });
};
