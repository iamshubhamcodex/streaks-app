"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GUEST_REDIRECT_URL, AUTH_REDIRECT_URL } from "@/lib/constants";

const channel = new BroadcastChannel("auth_channel");

export const emitLogin = () => {
  channel.postMessage("login");
};

export const emitLogout = () => {
  channel.postMessage("logout");
};

export const useAuthSync = () => {
  const router = useRouter();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "login") {
        router.push(AUTH_REDIRECT_URL);
      } else if (event.data === "logout") {
        router.push(GUEST_REDIRECT_URL);
      }
    };

    channel.addEventListener("message", handleMessage);

    return () => {
      channel.removeEventListener("message", handleMessage);
    };
  }, [router]);
};
