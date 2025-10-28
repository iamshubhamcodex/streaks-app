import { useNavigationStore } from "@/store/useNavigationStore";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

/**
 * Hook that shows a "Do you want to leave?" popup when the user
 * tries to close or reload the tab, similar to Postman.
 *
 * Returns a function `setExitable` to enable/disable the confirmation.
 */
export default function useConfirmBeforeLeave() {
  const router = useRouter();
  const pathname = usePathname();
  const lastPath = useRef(pathname);
  const {isExitable, setIsExitable} = useNavigationStore()

  const setExitable = useCallback((value: boolean) => {
    setIsExitable(value);
  }, [setIsExitable]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isExitable) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isExitable, router]);
  useEffect(() => {
    if (!isExitable && pathname !== lastPath.current) {
      const confirmLeave = window.confirm("You have unsaved changes. Leave anyway?");
      if (!confirmLeave) {
        // Revert back
        router.push(lastPath.current);
      } else {
        lastPath.current = pathname;
      }
    } else {
      lastPath.current = pathname;
    }
  }, [pathname, isExitable, router]);

  return { isExitable, setExitable };
}
