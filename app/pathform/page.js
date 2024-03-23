"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Form, Input } from "antd";
import { AuthService } from "../services/authService";
import { useWallets } from "@privy-io/react-auth";

export default function PathPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPath = searchParams.get("selectedPath");

  const { ready, wallets } = useWallets();

  const onFinish = async (values) => {
    const wallet = ready && wallets[0];
    const formValues = await values;
    const provider = await wallet.getEthereumProvider();

    const address = wallet.address;
    const message = `Complete profile form for ${selectedPath}, is the message I am signing`;
    const signature = await provider.request({
      method: "personal_sign",
      params: [message, address],
    });

    console.log("my connected wallet is:", wallet);
    console.log("my provider is:", provider);
    console.log("my form values are:", formValues);
    console.log("my message is:", message);
    console.log("my signature is:", signature);

    AuthService.completeUserProfile(
      formValues.givenname,
      formValues.familyname,
      formValues.location,
      formValues.lga,
      formValues.phone,
      formValues.email,
      signature
    );
    // console.log(formValues);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleSkip = (path) => {
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
  };

  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen bg-[#fafafa] text-[#333]">
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
          <p className={!selectedPath && "text-red-500"}>
            {selectedPath ? selectedPath : "Invalid Selection"}
          </p>
          <p className="px-6"></p>
        </div>
        <div className="w-full">
          <h1 className="font-semibold text-xl mb-1">Complete your Profile</h1>
          <p className="text-xs font-light">This step is optional!</p>
        </div>
        <div className="w-full rounded-3xl bg-white flex flex-col gap-5 px-4 py-6">
          <Form
            layout="vertical"
            name="profile"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="w-full"
            size="large"
          >
            <Form.Item
              label="Given Name"
              name="givenname"
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
              label="Family Name"
              name="familyname"
              rules={[
                {
                  required: true,
                  message: "Please input your family name!",
                },
              ]}
            >
              <Input placeholder="Enter Family name" />
            </Form.Item>{" "}
            <Form.Item
              label="Location"
              name="location"
              rules={[
                {
                  required: true,
                  message: "Please input your city/state/country!",
                },
              ]}
            >
              <Input placeholder="Enter your city/state/country" />
            </Form.Item>{" "}
            <Form.Item
              label="Local Government"
              name="lga"
              rules={[
                {
                  required: true,
                  message: "Please input your Local Government!",
                },
              ]}
            >
              <Input placeholder="Enter your Local Government" />
            </Form.Item>{" "}
            <Form.Item
              label="Phone Number"
              name="phone"
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
              name="email"
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
            <Form.Item>
              <Button
                className="border-2 border-[#38C793] w-full text-[#38c793]"
                size="large"
                type="default"
                htmlType="button"
                onClick={() => handleSkip(selectedPath)}
              >
                Skip this step
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
