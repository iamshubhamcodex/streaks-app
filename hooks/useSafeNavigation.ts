"use client"

import { useNavigationStore } from "@/store/useNavigationStore";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useSafeNavigation() {
  const router = useRouter();
  const { isExitable, setIsExitable } = useNavigationStore();

  const safePush = useCallback(
    (href: string) => {
      if (isExitable) {
        router.push(href);
      } else {
        const confirmLeave = window.confirm(
          "You have unsaved changes. Leave anyway?"
        );
        if (confirmLeave) {
          setIsExitable(true);
          router.push(href);
        }
      }
    },
    [isExitable, router, setIsExitable]
  );
  const safeBack = useCallback(
    (exitable?: boolean) => {
      if (isExitable || exitable) {
        router.back();
      } else {
        const confirmLeave = window.confirm(
          "You have unsaved changes. Leave anyway?"
        );
        if (confirmLeave) {
          setIsExitable(true);
          router.back();
        }
      }
    },
    [isExitable, router, setIsExitable]
  );

  return { safePush, safeBack };
}
