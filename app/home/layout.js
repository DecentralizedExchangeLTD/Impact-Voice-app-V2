"use client";
import "../globals.css";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { AuthService } from "../services/authService";

export default function ProtectedLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { logout } = usePrivy();

  const handleHamburger = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (link, title) => {
    setIsOpen(false);

    switch (true) {
      case title === "Logout":
        logout();
        AuthService.appwriteLogout();
        router.push(link);
        break;

      default:
        router.push(`${link}?title=` + title);
        break;
    }
  };

  const navLinks = [
    {
      title: "Your Voice",
      icon: "/yourvoice.svg",
      link: "/home",
    },
    {
      title: "Your Proposals",
      icon: "/yourproposals.svg",
      link: "/home",
    },
    {
      title: "Your Grants",
      icon: "/yourgrants.svg",
      link: "/home",
    },
    {
      title: "Awarded Grants",
      icon: "/awardedgrants.svg",
      link: "/home",
    },
    {
      title: "Donate",
      icon: "/donate.svg",
      link: "/home/dashboard",
    },
    {
      title: "My Cart",
      icon: "/yourcart.svg",
      link: "/home/dashboard",
    },
    {
      title: "Message",
      icon: "/messages.svg",
      link: "/home/dashboard",
    },
    {
      title: "Learn More",
      icon: "/learnmore.svg",
      link: "/home/dashboard",
    },
    {
      title: "Logout",
      icon: "/logout.svg",
      link: "/",
    },
  ];

  return (
    <section className="flex flex-col items-center lg:w-screen">
      <nav
        className={`w-full flex flex-col lg:w-screen lg:max-w-[1280px] z-10 fixed top-0 bg-[#ffffff90] backdrop-blur-md ${
          isOpen
            ? "bg-[#fafafa] backdrop-blur-xl rounded-b-3xl"
            : "bg-transparent backdrop-blur-xl"
        }`}
      >
        <div className="w-full h-16 flex flex-row items-center justify-between px-4">
          <div className="flex flex-row gap-3 items-center">
            <Image
              src="/logo.png"
              alt="impact stream greenpill africa logo"
              className="w-auto h-auto"
              width={35}
              height={35}
            />
            <div className="font-bold text-xl ">Impact Voice</div>
          </div>
          <div onClick={handleHamburger}>
            <Image
              src={isOpen ? "/close.svg" : "/hamburger.svg"}
              alt="hamburger"
              priority
              className="w-auto h-auto"
              width={30}
              height={30}
            />
          </div>
        </div>
        <div
          className={
            isOpen
              ? "flex flex-col gap-4 px-4 text-lg text-[#555] pb-4"
              : "hidden"
          }
        >
          {navLinks.map((item, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-3 py-1 w-full active:border-y active:border-black"
                onClick={() => handleNavigation(item.link, item.title)}
              >
                {" "}
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={25}
                  height={25}
                  className="w-auto h-auto"
                />{" "}
                {item.title}
              </div>
            );
          })}
        </div>
      </nav>
      {children}
    </section>
  );
}
