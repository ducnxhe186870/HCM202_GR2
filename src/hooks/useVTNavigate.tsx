import { useCallback } from "react";
import { useNavigate } from "react-router";

type GoOptions = {
  replace?: boolean;
  scroll?: "instant" | "auto" | "smooth";
};

export function useVTNavigate() {
  const navigate = useNavigate();

  const go = useCallback(
    (to: string, options?: GoOptions) => {
      const { replace = false, scroll = "instant" } = options ?? {};

      const doNav = () => navigate(to, { replace });

      // Helper to scroll to top using chosen behavior
      const scrollToTop = () => {
        if (scroll === "instant") {
          // instant -> immediate jump
          window.scrollTo(0, 0);
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: scroll });
        }
      };

      if (typeof document !== "undefined" && "startViewTransition" in document) {
        // Start view transition and scroll to top after it finishes.
        const vt = document.startViewTransition(doNav);

        // vt may be undefined on some implementations — guard defensively
        if (vt && vt.finished && typeof vt.finished.then === "function") {
          vt.finished
            .then(() => {
              // after transition snapshot is finished, jump to top
              scrollToTop();
            })
            .catch(() => {
              // in case of any error, still attempt to scroll
              scrollToTop();
            });
        } else {
          // fallback: if there's no finished promise, just scroll a tick later
          // (allow the navigation to render)
          setTimeout(scrollToTop, 0);
        }
      } else {
        // no View Transition API — do normal navigation then scroll
        doNav();
        // navigation is usually synchronous in SPA route change; ensure render happened
        // by scheduling scroll on next macrotask so routes get a chance to update DOM
        setTimeout(scrollToTop, 0);
      }
    },
    [navigate]
  );

  return go;
}
