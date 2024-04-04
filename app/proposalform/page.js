"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Form, Input, Select, InputNumber, Space, Card } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import { ProposalService } from "../services/proposalService";
import { useWallets } from "@privy-io/react-auth";
import { success, error } from "../components/Modals";

const { TextArea } = Input;
const MAX_COUNT = 3;

const users = [
  {
    label: "Community",
    title: "community",
    options: [
      {
        value: "Ava Swift",
        label: "Ava Swift",
      },
      {
        value: "Cole Reed",
        label: "Cole Reed",
      },
    ],
  },
  {
    label: "Donor",
    title: "donor",
    options: [
      {
        value: "Mia Blake",
        label: "Mia Blake",
      },
      {
        value: "Jake Stone",
        label: "Jake Stone",
      },
      {
        value: "Lily Lane",
        label: "Lily Lane",
      },
    ],
  },
  {
    label: "Admin",
    title: "admin",
    options: [
      {
        value: "Izzy",
        label: "izzy",
      },
    ],
  },
];

export default function ProposalForm() {
  const [value, setValue] = useState(["Ava Swift"]);
  const [loading, setLoading] = useState(false);
  const [proposalForm] = Form.useForm();
  const router = useRouter();
  const { ready, wallets } = useWallets();

  const onFinish = async () => {
    setLoading(true);
    const formValues = await proposalForm.validateFields();
    const wallet = ready && wallets[0];
    await wallet.switchChain(11155111);
    const provider = await wallet.getEthersProvider();
    const signer = await provider.getSigner();

    if (
      formValues.hasOwnProperty("budget") &&
      typeof formValues.budget === "number"
    ) {
      formValues.budget = formValues.budget
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    if (formValues.hasOwnProperty("steps")) {
      formValues.steps = formValues.steps.map((step) => step.description);
    }

    if (formValues.hasOwnProperty("milestones")) {
      formValues.milestones = formValues.milestones.map(
        (milestone) =>
          `description: ${milestone.description} BREAKPOINT timeline: ${milestone.timeline} BREAKPOINT budget: ${milestone.budget}`
      );
    }

    try {
      const proposalUID = await ProposalService.createNewProposal(
        formValues.title,
        formValues.summary,
        formValues.problem,
        formValues.solution,
        formValues.specifications,
        formValues.steps,
        formValues.collaborators,
        formValues.timeline,
        formValues.budget,
        formValues.location,
        formValues.milestones,
        provider,
        signer
      );

      if (proposalUID) {
        const appwriteResponse = await ProposalService.makeProposal(
          formValues.title,
          formValues.summary,
          formValues.problem,
          formValues.solution,
          formValues.specifications,
          formValues.steps,
          formValues.collaborators,
          formValues.timeline,
          formValues.budget,
          formValues.location,
          formValues.milestones,
          proposalUID
        );
        console.log("appwrite res:", appwriteResponse);
        appwriteResponse &&
          success(
            "Proposal Created",
            "You have successfully created a proposal",
            () => router.push("/home?title=Your Proposals")
          );
      }
    } catch (e) {
      e &&
        error(
          "Proposal Creation failed",
          "There was a problem creating your proposal, please try again!",
          () => null
        );
      console.log("Error submiting proposal:", e);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const suffix = (
    <>
      <span>
        {value.length} / {MAX_COUNT}
      </span>
      <DownOutlined />
    </>
  );

  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          Loading..
        </div>
      }
    >
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
            Don&apos;t know how to write a proposal?
          </h1>
          <p
            onClick={() => router.push("/proposaltemplate")}
            className="text-sm text-blue-600"
          >
            View our template
          </p>
        </div>
        <div className="w-full rounded-3xl bg-[#4cc0951f] flex flex-col gap-5 px-4 py-6">
          <Form
            // size="large"
            layout="vertical"
            name="proposal"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="w-full"
            form={proposalForm}
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
              <Input
                variant="filled"
                count={{
                  show: true,
                  max: 75,
                }}
                placeholder="Enter proposal title"
              />
            </Form.Item>{" "}
            <Form.Item
              label="Summary"
              name="summary"
              rules={[
                {
                  required: true,
                  message: "Enter a brief description",
                },
              ]}
            >
              <TextArea
                variant="filled"
                placeholder="Briefly describe your proposal"
                autoSize={{
                  minRows: 2,
                  maxRows: 5,
                }}
              />
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
              <TextArea
                variant="filled"
                placeholder="What problems will your proposal address"
                autoSize={{
                  minRows: 2,
                  maxRows: 5,
                }}
              />
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
              <TextArea
                variant="filled"
                placeholder="State your proposed solution"
                autoSize={{
                  minRows: 2,
                  maxRows: 5,
                }}
              />
            </Form.Item>{" "}
            <Form.Item
              label="Specifications"
              name="specifications"
              rules={[
                {
                  required: true,
                  message: "Field cannot be empty!",
                },
              ]}
            >
              <TextArea
                variant="filled"
                placeholder="Enter tools needed for accomplishment"
                autoSize={{
                  minRows: 2,
                  maxRows: 5,
                }}
              />
            </Form.Item>{" "}
            <Form.Item
              label="Steps to implement"
              name="steps"
              rules={[
                {
                  required: true,
                  message: "Field cannot be empty!",
                },
              ]}
            >
              <Form.List name="steps">
                {(fields, { add, remove }) => (
                  <div
                    style={{
                      display: "flex",
                      rowGap: 16,
                      flexDirection: "column",
                    }}
                  >
                    {fields.map((field) => (
                      <Card
                        className="bg-[#4cc0951f]"
                        size="small"
                        title={`Step ${field.name + 1}`}
                        key={field.key}
                        extra={
                          <CloseOutlined
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        }
                      >
                        <Form.Item
                          label="Step Description"
                          name={[field.name, "description"]}
                          rules={[
                            {
                              required: true,
                              message: "Enter a step description!",
                            },
                          ]}
                        >
                          <TextArea
                            variant="filled"
                            placeholder="Enter steps to be implemented"
                            autoSize={{
                              minRows: 2,
                              maxRows: 5,
                            }}
                          />
                        </Form.Item>
                      </Card>
                    ))}

                    <Button
                      className="w-1/2 rounded-full"
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => add()}
                    >
                      Add Step
                    </Button>
                  </div>
                )}
              </Form.List>
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
              <Select
                variant="filled"
                mode="multiple"
                maxCount={MAX_COUNT}
                value={value}
                onChange={setValue}
                suffixIcon={suffix}
                placeholder="Team members"
                options={users}
              />
            </Form.Item>
            <Form.Item
              label="Timeline"
              name="timeline"
              rules={[
                {
                  required: true,
                  message: "Please input your timeline!",
                },
              ]}
            >
              <Input
                variant="filled"
                count={{
                  show: true,
                  max: 15,
                }}
                placeholder="One year? Two years? or three?"
              />
            </Form.Item>
            <Form.Item
              label="Total Budget"
              name="budget"
              rules={[
                {
                  required: true,
                  message: "Please input your budget!",
                },
              ]}
            >
              <InputNumber
                variant="filled"
                max={99999999}
                className="w-full"
                addonBefore="$"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>{" "}
            <Form.Item
              label="Project Location"
              name="location"
              rules={[
                {
                  required: true,
                  message: "Please input your project site!",
                },
              ]}
            >
              <Input
                variant="filled"
                count={{
                  show: true,
                  max: 50,
                }}
                placeholder="Project location"
              />
            </Form.Item>
            <Form.Item
              label="Milestones"
              name="milestones"
              rules={[
                {
                  required: true,
                  message: "Please input your milestones!",
                },
              ]}
            >
              <Form.List name="milestones">
                {(fields, { add, remove }) => (
                  <div
                    style={{
                      display: "flex",
                      rowGap: 16,
                      flexDirection: "column",
                    }}
                  >
                    {fields.map((field) => (
                      <Card
                        className="bg-[#4cc0951f]"
                        size="small"
                        title={`Milestone ${field.name + 1}`}
                        key={field.key}
                        extra={
                          <CloseOutlined
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        }
                      >
                        <Form.Item
                          name={[field.name, "description"]}
                          rules={[
                            {
                              required: true,
                              message: "Enter a milestone details!",
                            },
                          ]}
                        >
                          <Input
                            variant="filled"
                            placeholder="Milestone detail"
                          />
                        </Form.Item>
                        <Space>
                          <Form.Item
                            name={[field.name, "timeline"]}
                            rules={[
                              {
                                required: true,
                                message: "Enter a timeline!",
                              },
                            ]}
                          >
                            <Input variant="filled" placeholder="timeline" />
                          </Form.Item>
                          <Form.Item
                            name={[field.name, "budget"]}
                            rules={[
                              {
                                required: true,
                                message: "Enter a budget percentage!",
                              },
                            ]}
                          >
                            <InputNumber
                              variant="filled"
                              max={99999999}
                              className="w-full"
                              addonBefore="$"
                              placeholder="budget"
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                            />
                          </Form.Item>
                        </Space>
                      </Card>
                    ))}

                    <Button
                      className="w-1/2 rounded-full"
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => add()}
                    >
                      Add Milestone
                    </Button>
                  </div>
                )}
              </Form.List>
            </Form.Item>
            <Form.Item>
              <Button
                loading={loading}
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
          {/* <p className="text-center w-5/6 text-xs font-light">
            Your information will not be shared with the public and will only be
            used for identification purposes and to contact you if necessary.
          </p> */}
        </div>
        <p className="pb-4 font-extralight text-xs">
          powered by <b>impact stream</b>
        </p>
      </div>
    </Suspense>
  );
}
