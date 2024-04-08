"use client";
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Form, Input } from "antd";
import { LoadingScreen } from "../components/LoadingScreen";
import { AuthService } from "../services/authService";
import { useWallets } from "@privy-io/react-auth";
import { success, error } from "../components/Modals";

export default function PathPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPath = searchParams.get("selectedPath");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [profileForm] = Form.useForm();
  const { ready, wallets } = useWallets();
  const wallet = ready && wallets[0];

  const onFinish = async () => {
    setLoading(true);
    // await wallet.switchChain(11155111);
    const provider = await wallet.getEthersProvider();
    const formValues = await profileForm.validateFields();

    const signer = provider.getSigner();

    try {
      const profileAttestationUID = await AuthService.completeUserProfile(
        formValues.fullName,
        formValues.location,
        formValues.country,
        formValues.phoneNumber,
        formValues.emailAddress,
        selectedPath,
        signer,
        provider
      );

      if (!profileAttestationUID) {
        error(
          "Profile Creation failed",
          "There was a problem creating your profile, please try again!",
          () => router.push("/")
        );
        return;
      }

      if (profileAttestationUID) {
        const signUpResponse = await AuthService.createAppwriteAccount(
          formValues.emailAddress,
          "cookandeat",
          formValues.fullName
        );

        console.log("appwrite acct signup:", signUpResponse);

        if (signUpResponse?.email === formValues.emailAddress) {
          const signInResponse = await AuthService.loginAppwriteAccount(
            formValues.emailAddress,
            "cookandeat"
          );

          if (signInResponse?.userId) {
            const appwriteResponse = await AuthService.signUp(
              formValues.fullName,
              formValues.location,
              formValues.country,
              formValues.phoneNumber,
              formValues.emailAddress,
              selectedPath,
              profileAttestationUID
            );
            console.log("appwrite res:", appwriteResponse);

            appwriteResponse &&
              success(
                "Profile Created",
                "Your profile has been created successfully",
                () => handleSkip(selectedPath)
              );
          }

          console.log("signin res:", signInResponse);
          return signInResponse;
        }

        return signUpResponse;
      }
    } catch (e) {
      console.log("Error completing profile:", e);
    } finally {
      setLoading(false);
    }
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
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await AuthService.confirmAppwriteAuth();
        if (!response?.$id) {
          error(
            "Authenticated Failed",
            "There was a problem verifying your profile",
            () => null
          );
        }
        if (response?.$id) {
          handleSkip(selectedPath);
        }
      } catch (e) {
        console.log("error:", e);
      } finally {
        setPageLoading(false);
      }
    };
    checkAuth();

    return () => {
      checkAuth();
    };
  }, []);

  if (pageLoading) {
    return <LoadingScreen />;
  }

  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex flex-col items-center bg-[#fafafa] text-[#38C793]">
          Loading...
        </div>
      }
    >
      <div className="w-full h-full p-4 flex flex-col items-center gap-5">
        <div className="flex flex-row items-center justify-between w-full  lg:w-screen lg:max-w-[1280px] h-14 font-bold text-2xl">
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
        <div className="w-full lg:w-screen lg:max-w-[1280px]">
          <h1 className="font-semibold text-xl mb-1">Complete your Profile</h1>
          <p className="text-xs font-light">This step is optional!</p>
        </div>
        <div className="w-full lg:w-screen lg:max-w-[1280px] rounded-3xl bg-[#4cc0951f] flex flex-col items-center gap-5 px-4 py-6">
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
              <Input variant="filled" placeholder="Enter Given name" />
            </Form.Item>{" "}
            <Form.Item
              label="Location"
              name="location"
              rules={[
                {
                  required: true,
                  message: "Please enter your City / State",
                },
              ]}
            >
              <Input variant="filled" placeholder="City / State" />
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
              <Input variant="filled" placeholder="City / State / Country" />
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
              <Input variant="filled" placeholder="Enter your phone number" />
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
              <Input variant="filled" placeholder="Enter your email address" />
            </Form.Item>
            <Form.Item>
              <Button
                className="bg-[#4cc095] w-full "
                size="large"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

        <p className="pb-4 font-extralight text-xs">
          powered by <b>impact stream</b>
        </p>
      </div>
    </Suspense>
  );
}
