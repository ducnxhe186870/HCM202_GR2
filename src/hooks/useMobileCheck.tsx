// useAlertOnMobile.tsx
import { useEffect } from "react";

function isMobileDevice(widthThreshold = 820) {
  if (typeof navigator === "undefined" || typeof window === "undefined") return false;

  // 1) Classic UA check
  const ua = navigator.userAgent || "";
  const mobileRegex = /Mobi|Android|iPhone|iPod|Opera Mini|IEMobile|Windows Phone/i;
  if (mobileRegex.test(ua)) return true;

  // 2) Touch + width heuristic (helps iPadOS which may present as Mac)
  if ("maxTouchPoints" in navigator && navigator.maxTouchPoints > 1) {
    return window.innerWidth <= widthThreshold;
  }

  // 3) Fallback to width
  return window.innerWidth <= widthThreshold;
}

/**
 * useAlertOnMobile
 * ----------------
 * Runs once on mount. Detects whether the visitor is using a mobile
 * device (phone) and, if so, triggers a browser `alert` with a
 * configurable message.
 *
 * Detection strategy (in order):
 * 1. User-Agent regex for common mobile tokens
 * 2. maxTouchPoints + viewport width heuristic (helps detect iPad/tablet)
 * 3. Fallback to viewport width check
 *
 * Options:
 *  - message: string to show in the alert (default provided)
 *  - widthThreshold: numeric px breakpoint below which a touch device
 *    is considered a mobile phone (default 820)
 *
 * Returns: nothing. Side-effect only.
 *
 * Usage:
 *   import { useAlertOnMobile } from "./useAlertOnMobile";
 *   export default function App() {
 *     useAlertOnMobile(); // runs once on mount
 *     return <MainApp />;
 *   }
 */
export function useAlertOnMobile({ message = "Trang web này không được thiết kế để xem trên điện thoại", widthThreshold = 820 } = {}) {
  useEffect(() => {
    try {
      if (isMobileDevice(widthThreshold)) {
        alert(message);
      }
    } catch (err) {
      // don't break the app on detection errors
      console.error("useAlertOnMobile detection failed:", err);
    }
  }, []);
}

/*
Optional examples:

// 1) Default usage in your top-level component
import { useAlertOnMobile } from './useAlertOnMobile';
export default function App() {
  useAlertOnMobile();
  return <MainApp />;
}

// 2) Custom message and breakpoint
useAlertOnMobile({ message: 'Optimized for desktop. Mobile layout is unsupported.', widthThreshold: 760 });

Notes:
- This hook uses `alert()` because you requested a simple browser alert. For a better UX
  consider rendering a dismissible modal or a sticky banner instead.
- If you use server-side rendering (Next.js), the hook is safe because it checks for
  `navigator`/`window` existence and returns false during SSR.
*/