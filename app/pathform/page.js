"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Form, Input } from "antd";
import { AuthService } from "../services/authService";
import { useWallets } from "@privy-io/react-auth";

export default function PathPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPath = searchParams.get("selectedPath");
  const [name, setName] = useState();

  const [profileForm] = Form.useForm();

  const { ready, wallets } = useWallets();

  const onFinish = async (values) => {
    const wallet = ready && wallets[0];
    await wallet.switchChain(11155111);
    const formValues = await values;
    const provider = await wallet.getEthersProvider();

    const signer = await provider.getSigner();

    AuthService.completeUserProfile(
      formValues.fullName,
      formValues.location,
      formValues.country,
      formValues.phoneNumber,
      formValues.emailAddress,
      selectedPath,
      signer
    );
    // console.log(formValues);
  };
  const onFinishFailed = (errorInfo) => {
    profileForm.resetFields();
    console.log("Failed:", errorInfo);
  };

  const handleSkip = async (path) => {
    switch (true) {
      case path === "Community":
        router.push("/home?title=Your Proposals");
        break;
      case path === "Donor":
        router.push("/home/donations");
        break;

      default:
        router.push("/home/dashboard");
        break;
    }

    // note: import authservice and usewallet when using elsewhere
    // const wallet = ready && wallets[0];
    // await wallet.switchChain(11155111);
    // const provider = await wallet.getEthersProvider();

    // const data = await AuthService.getUserProfile(provider);
    // const firstKey = Object.keys(data)[0];
    // setName(data[firstKey]);
  };

  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen bg-[#fafafa] text-[#38C793]">
          Loading...
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
          <p className={!selectedPath ? "text-red-500" : ""}>
            {selectedPath ? selectedPath : "Invalid Selection"}
          </p>
          <p className="px-6"></p>
        </div>
        <div className="w-full">
          <h1 className="font-semibold text-xl mb-1">Complete your Profile</h1>
          <p className="text-xs font-light">This step is optional!</p>
        </div>
        <div className="w-full rounded-3xl bg-[#fafafa] flex flex-col gap-5 px-4 py-6">
          <Form
            layout="vertical"
            name="profile"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="w-full"
            form={profileForm}
            // size="large"
          >
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your given name!",
                },
              ]}
            >
              <Input placeholder="Enter Given name" />
            </Form.Item>{" "}
            <Form.Item
              label="Location"
              name="location"
              rules={[
                {
                  required: true,
                  message: "Please enter your City / State / Country",
                },
              ]}
            >
              <Input placeholder="City / State / Country" />
            </Form.Item>{" "}
            <Form.Item
              label="Country"
              name="country"
              rules={[
                {
                  required: true,
                  message: "Please enter your Country",
                },
              ]}
            >
              <Input placeholder="City / State / Country" />
            </Form.Item>{" "}
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Please input your Phone Number!",
                },
              ]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>{" "}
            <Form.Item
              label="Email Address"
              name="emailAddress"
              rules={[
                {
                  required: true,
                  message: "Please input your Email Address!",
                },
              ]}
            >
              <Input placeholder="Enter your email address" />
            </Form.Item>
            <Form.Item>
              <Button
                className="bg-[#38C793] w-full "
                size="large"
                type="primary"
                htmlType="submit"
              >
                Submit
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
    </Suspense>
  );
}
