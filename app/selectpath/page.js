"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Path } from "../components/Path";
import { AuthService } from "../services/authService";
import { error } from "../components/Modals";
import { LoadingScreen } from "../components/LoadingScreen";

const paths = [
  {
    title: "Community",
    image: "/community.jpg",
  },
  {
    title: "Donor",
    image: "/donor.jpg",
  },
  {
    title: "Admin",
    image: "/admin.jpg",
  },
];

export default function PathPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  const selectPath = (title) => {
    switch (true) {
      case title === "Admin":
        return null;

      default:
        router.push("/pathform?selectedPath=" + title);
        break;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await AuthService.confirmAppwriteAuth();
        if (response.email) {
          const getUser = async () => {
            const emailAddress = await response.email;
            return emailAddress;
            // TODO: Fix this useless bug
            // const user = await AuthService.findUser(emailAddress);
            // console.log("user:", user);
            // extract the userType and skip to proposals
          };
          getUser();
        }
      } catch (e) {
        console.log("error:", e);
        error(
          "Authenticated Failed",
          "There was a problem verifying your profile",
          router.push("/")
        );
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
    <div className="w-full h-full px-4 py-10 flex flex-col items-center gap-10">
      <div className="w-full text-center">
        <h1 className="font-semibold text-xl mb-1">Choose your Path</h1>
        <p className="text-xs font-light">
          Kindly select your path to proceed further!
        </p>
      </div>
      <div className="w-full lg:w-screen lg:max-w-[1280px] rounded-3xl bg-white flex flex-col items-center justify-center gap-5 px-4 py-6">
        {paths.map((item, index) => {
          return (
            <Path
              handleClick={() => selectPath(item.title)}
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              image={item.image}
            />
          );
        })}
      </div>
      <p className="absolute bottom-0 pb-4 font-extralight text-xs">
        powered by <b>impact stream</b>
      </p>
    </div>
  );
}
