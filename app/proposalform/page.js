"use client";
import { useRouter } from "next/navigation";
import { Button, Form, Input } from "antd";

export default function ProposalForm() {
  const router = useRouter();

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-full h-full p-4 flex flex-col items-center gap-5">
      <div className="flex flex-row items-center justify-between w-full h-14 font-bold text-2xl">
        <p
          className="bg-gradient-to-r from-white to-transparent rounded-l-3xl py-1 px-2"
          onClick={() => router.back()}
        >
          &lt;-
        </p>
        <p>New Proposal</p>
        <p className="px-6"></p>
      </div>
      <div className="w-full">
        <h1 className="font-semibold text-sm mb-1">
          Don't know how to write a proposal?
        </h1>
        <p
          onClick={() => router.push("/proposaltemplate")}
          className="text-sm text-blue-600"
        >
          View our template
        </p>
      </div>
      <div className="w-full rounded-3xl bg-white flex flex-col gap-5 px-4 py-6">
        <Form
          layout="vertical"
          name="proposal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="w-full"
          size="large"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please name your proposal!",
              },
            ]}
          >
            <Input placeholder="Enter proposal title" />
          </Form.Item>{" "}
          <Form.Item
            label="Summary"
            name="summary"
            rules={[
              {
                required: true,
                message: "Enter a description",
              },
            ]}
          >
            <Input placeholder="Briefly describe your proposal" />
          </Form.Item>{" "}
          <Form.Item
            label="Problem"
            name="problem"
            rules={[
              {
                required: true,
                message: "Field can't be empty!",
              },
            ]}
          >
            <Input placeholder="What problems will your proposal address" />
          </Form.Item>{" "}
          <Form.Item
            label="Solution"
            name="solution"
            rules={[
              {
                required: true,
                message: "Field can't be empty!",
              },
            ]}
          >
            <Input placeholder="State your proposed solution" />
          </Form.Item>{" "}
          <Form.Item
            label="Specifications"
            name="phone"
            rules={[
              {
                required: true,
                message: "Field cannot be empty!",
              },
            ]}
          >
            <Input placeholder="Enter solution tools and goals" />
          </Form.Item>{" "}
          <Form.Item
            label="Collaborators"
            name="collaborators"
            rules={[
              {
                required: true,
                message: "Please input your collaborators!",
              },
            ]}
          >
            <Input placeholder="Team members" />
          </Form.Item>
          <Form.Item>
            <Button
              className="bg-[#38C793] w-full "
              size="large"
              type="primary"
              htmlType="submit"
            >
              Submit Proposal
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="w-full flex flex-col items-center pb-4">
        <p className="text-center w-5/6 text-xs font-light">
          Your information will not be shared with the public and will only be
          used for identification purposes and to contact you if necessary.
        </p>
      </div>
      <p className="pb-4 font-extralight text-xs">
        powered by <b>impact stream</b>
      </p>
    </div>
  );
}
