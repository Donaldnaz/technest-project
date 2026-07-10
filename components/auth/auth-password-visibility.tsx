"use client";

import { useEffect, type RefObject } from "react";

const TOGGLE_ATTR = "data-icare-password-toggle";
const FIELD_ATTR = "data-icare-password-field";
const VISIBLE_ATTR = "data-icare-password-visible";

const EYE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`;

const EYE_OFF_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>`;

type AuthPasswordVisibilityProps = {
  containerRef: RefObject<HTMLElement | null>;
};

function isPasswordField(input: HTMLInputElement) {
  if (input.getAttribute(FIELD_ATTR) === "true") return true;
  if (input.type === "password") return true;
  return false;
}

function isMarkedVisible(input: HTMLInputElement) {
  return input.getAttribute(VISIBLE_ATTR) === "true";
}

function applyVisibility(input: HTMLInputElement, visible: boolean) {
  input.setAttribute(VISIBLE_ATTR, visible ? "true" : "false");
  const nextType = visible ? "text" : "password";
  if (input.type !== nextType) {
    input.type = nextType;
  }
}

function syncToggleButton(button: HTMLButtonElement, visible: boolean) {
  const label = visible ? "Hide password" : "Show password";
  const pressed = visible ? "true" : "false";
  if (
    button.getAttribute("aria-label") === label &&
    button.getAttribute("aria-pressed") === pressed
  ) {
    return;
  }

  button.setAttribute("aria-label", label);
  button.setAttribute("aria-pressed", pressed);
  button.innerHTML = visible ? EYE_OFF_SVG : EYE_SVG;
}

const TOGGLE_CLASS_NAME =
  "icare-password-toggle absolute inset-y-0 right-0.5 z-10 inline-flex w-11 shrink-0 items-center justify-center rounded-lg border-0 bg-transparent text-muted-foreground shadow-none transition-colors hover:bg-transparent hover:text-foreground";

const TOGGLE_INLINE_STYLE: Partial<CSSStyleDeclaration> = {
  position: "absolute",
  top: "0",
  right: "0.125rem",
  bottom: "0",
  left: "auto",
  zIndex: "10",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2.75rem",
  height: "auto",
  minWidth: "2.75rem",
  minHeight: "0",
  margin: "0",
  padding: "0",
  border: "0",
  borderRadius: "0.5rem",
  background: "transparent",
  boxShadow: "none",
  transform: "none",
  lineHeight: "0",
  cursor: "pointer",
};

function applyToggleLayout(button: HTMLButtonElement) {
  button.className = TOGGLE_CLASS_NAME;
  Object.assign(button.style, TOGGLE_INLINE_STYLE);
}

function enhancePasswordInput(input: HTMLInputElement) {
  const wrapper = input.closest(".relative");
  if (!wrapper) return;

  if (wrapper instanceof HTMLElement) {
    wrapper.style.position = "relative";
    wrapper.style.width = "100%";
    wrapper.style.display = "block";
  }

  const existingToggle = wrapper.querySelector<HTMLButtonElement>(
    `button[${TOGGLE_ATTR}]`,
  );
  if (existingToggle) {
    const visible = isMarkedVisible(input);
    applyVisibility(input, visible);
    syncToggleButton(existingToggle, visible);
    input.classList.add("hide-password-toggle", "pr-11");
    input.classList.remove("pr-10");
    applyToggleLayout(existingToggle);
    return;
  }

  // Neon / better-auth-ui already mounts an eye toggle on sign-up.
  if (wrapper.querySelector('button[type="button"]')) return;

  input.setAttribute(FIELD_ATTR, "true");
  input.classList.add("hide-password-toggle", "pr-11");
  input.classList.remove("pr-10");

  const visible = isMarkedVisible(input);
  applyVisibility(input, visible);

  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute(TOGGLE_ATTR, "true");
  applyToggleLayout(button);
  syncToggleButton(button, visible);

  button.addEventListener("click", (event) => {
    event.preventDefault();
    const nextVisible = !isMarkedVisible(input);
    applyVisibility(input, nextVisible);
    syncToggleButton(button, nextVisible);
  });

  wrapper.appendChild(button);
}

function ensureHidePasswordToggleStyles() {
  if (document.getElementById("icare-hide-password-toggle-style")) return;

  const style = document.createElement("style");
  style.id = "icare-hide-password-toggle-style";
  style.textContent = `
    .hide-password-toggle::-ms-reveal,
    .hide-password-toggle::-ms-clear {
      visibility: hidden;
      pointer-events: none;
      display: none;
    }
  `;
  document.head.appendChild(style);
}

function enhanceContainer(container: HTMLElement) {
  ensureHidePasswordToggleStyles();

  const inputs = container.querySelectorAll<HTMLInputElement>(
    `input[type="password"], input[${FIELD_ATTR}="true"]`,
  );

  for (const input of inputs) {
    if (!isPasswordField(input)) continue;
    enhancePasswordInput(input);
  }
}

export function AuthPasswordVisibility({
  containerRef,
}: AuthPasswordVisibilityProps) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scheduled = false;

    const runEnhance = () => {
      scheduled = false;
      enhanceContainer(container);
    };

    const scheduleEnhance = () => {
      if (scheduled) return;
      scheduled = true;
      queueMicrotask(runEnhance);
    };

    runEnhance();

    const observer = new MutationObserver(scheduleEnhance);
    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["type"],
    });

    return () => observer.disconnect();
  }, [containerRef]);

  return null;
}
