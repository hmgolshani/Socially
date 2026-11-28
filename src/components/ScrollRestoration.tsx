import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router";


const STORAGE_KEY = "socially-scroll-positions";

function getPositions(): Record<string, number> {
  try {
    return JSON.parse(
      sessionStorage.getItem(STORAGE_KEY) || "{}"
    );
  } catch {
    return {};
  }
}

const positions = getPositions();

export default function ScrollRestoration() {
  const { key } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useLayoutEffect(() => {
    const target =
      navigationType === "POP" ? positions[key] ?? 0 : 0;

    let restoring = true;

    const savePosition = () => {
      if (!restoring) {
        positions[key] = window.scrollY;
      }
    };

    const persistPositions = () => {
      savePosition();

      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(positions)
        );
      } catch {
        // Storage unavailable
      }
    };

    const restorePosition = () => {
      if (!restoring) return;

      window.scrollTo({
        top: target,
        behavior: "instant",
      });

      if (Math.abs(window.scrollY - target) <= 1) {
        restoring = false;
      }
    };

    const stopRestoring = () => {
      restoring = false;
      savePosition();
    };

    restorePosition();

    const observer = new ResizeObserver(restorePosition);
    observer.observe(document.body);

    const timeout = window.setTimeout(stopRestoring, 5000);

    window.addEventListener("scroll", savePosition, {
      passive: true,
    });

    window.addEventListener("wheel", stopRestoring, {
      passive: true,
    });

    window.addEventListener("touchstart", stopRestoring, {
      passive: true,
    });

    window.addEventListener("keydown", stopRestoring);
    window.addEventListener("pagehide", persistPositions);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);

      window.removeEventListener("scroll", savePosition);
      window.removeEventListener("wheel", stopRestoring);
      window.removeEventListener("touchstart", stopRestoring);
      window.removeEventListener("keydown", stopRestoring);
      window.removeEventListener("pagehide", persistPositions);
    };
  }, [key, navigationType]);

  return null;
}