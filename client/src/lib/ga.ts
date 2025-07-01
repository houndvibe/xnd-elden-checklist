import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-P7RR7ZCKT5";

export function initGA() {
  ReactGA.initialize(MEASUREMENT_ID);
}

export function trackPage(path: string) {
  ReactGA.send({ hitType: "pageview", page: path });
}

export function trackEvent(
  action: string,
  category?: string,
  params?: {
    label: string;
    value: 1 | 0;
    state: "enabled" | "disabled";
  }
) {
  ReactGA.event({
    category: category || "General",
    action,
    ...params,
  });
}
