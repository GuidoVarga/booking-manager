import { useEffect, useState } from "react";
import { BREAKPOINTS } from "../config/breakpoints";

type Device = "mobile" | "tablet" | "desktop";

export function useDevice(): {
  device: Device;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
} {
  const [device, setDevice] = useState<Device>("desktop");

  useEffect(() => {
    const getDevice = (): Device => {
      if (window.matchMedia(`(max-width: ${BREAKPOINTS.mobile}px)`).matches) return "mobile";
      if (window.matchMedia(`(max-width: ${BREAKPOINTS.tablet}px)`).matches) return "tablet";
      return "desktop";
    };

    const update = () => setDevice(getDevice());
    update();

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return {
    device,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
  };
}