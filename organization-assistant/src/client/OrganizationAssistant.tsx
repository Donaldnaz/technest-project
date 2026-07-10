"use client";

import { useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";

import { useIsClient } from "./use-is-client";

import { assistantCopy } from "../copy";
import { ASSISTANT_SUGGESTED_QUESTIONS } from "../knowledge";
import type { ActionResult, AssistantMessage } from "../types";
import { cn } from "../utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function toAssistantMessages(messages: ChatMessage[]): AssistantMessage[] {
  return messages
    .filter((message) => message.id !== "welcome")
    .map(({ role, content }) => ({ role, content }));
}

export type OrganizationAssistantProps = {
  /** Server action or API handler that returns the assistant reply. */
  askAssistant: (input: {
    messages: AssistantMessage[];
  }) => Promise<ActionResult<{ reply: string }>>;
  /** Optional error handler (e.g. toast). Defaults to console.error. */
  onError?: (message: string) => void;
  /**
   * Raise the FAB above a fixed mobile bottom nav (dashboard only).
   * Marketing/auth should leave this false so the FAB sits at bottom-6.
   */
  clearBottomNav?: boolean;
};

export function OrganizationAssistant({
  askAssistant,
  onError = (message) => console.error(message),
  clearBottomNav = false,
}: OrganizationAssistantProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: assistantCopy.welcome,
    },
  ]);
  const [pending, startTransition] = useTransition();
  const mounted = useIsClient();

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");

    startTransition(async () => {
      const result = await askAssistant({
        messages: toAssistantMessages(nextMessages),
      });

      if (!result.success) {
        onError(result.error);
        return;
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: result.data.reply,
        },
      ]);
    });
  }

  const assistantOverlay =
    open && mounted ? (
      <>
        {/* Mobile backdrop — tap to close; sits above bottom nav (z-50) */}
        <button
          type="button"
          className="fixed inset-0 z-[60] bg-black/20 supports-backdrop-filter:backdrop-blur-xs lg:hidden"
          aria-label="Close iCare assistant"
          onClick={() => setOpen(false)}
        />

        <div
          className={cn(
            "fixed flex flex-col overflow-hidden border border-border/60 bg-card shadow-2xl",
            // Mobile: full-width bottom sheet over the fixed bottom nav
            "inset-x-0 bottom-0 z-[60] max-h-[min(92dvh,40rem)] rounded-t-3xl pb-safe",
            // Desktop: floating panel
            "lg:inset-x-auto lg:bottom-24 lg:right-4 lg:z-50 lg:max-h-none lg:w-[min(100vw-2rem,24rem)] lg:rounded-3xl lg:pb-0",
          )}
          role="dialog"
          aria-label={assistantCopy.title}
        >
          <header className="shrink-0 border-b border-border/60 bg-gradient-to-br from-sage-50 to-oat-50 px-4 py-3 dark:from-sage-950/40 dark:to-charcoal-950/40">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <Sparkles
                  className="size-4 shrink-0 text-sage-700 dark:text-sage-300"
                  aria-hidden
                />
                <div className="min-w-0">
                  <p className="font-heading text-sm font-semibold">
                    {assistantCopy.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {assistantCopy.subtitle}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="touch-target inline-flex size-11 shrink-0 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground lg:size-9"
                aria-label="Close iCare assistant"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
          </header>

          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4 max-lg:max-h-[58dvh] lg:max-h-80">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted/60 text-foreground",
                )}
              >
                {message.content}
              </div>
            ))}

            {pending && (
              <p className="text-xs text-muted-foreground">
                {assistantCopy.thinking}
              </p>
            )}

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {ASSISTANT_SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    disabled={pending}
                    onClick={() => sendMessage(question)}
                    className="min-h-11 rounded-full border border-border/60 bg-background px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-sage-300 hover:text-foreground lg:min-h-0 lg:py-1"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="flex shrink-0 gap-2 border-t border-border/60 bg-card p-3"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={assistantCopy.placeholder}
              disabled={pending}
              className="dashboard-form-control min-h-11 flex-1 rounded-xl px-3 text-sm lg:min-h-10"
              aria-label={assistantCopy.inputAria}
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-sage-700 text-white hover:bg-sage-800 disabled:opacity-50 lg:size-10"
              aria-label={assistantCopy.sendAria}
            >
              <Send className="size-4" aria-hidden />
            </button>
          </form>

          <p className="shrink-0 border-t border-border/40 bg-card px-3 py-2 text-[10px] leading-relaxed text-muted-foreground">
            {assistantCopy.disclaimer}
          </p>
        </div>
      </>
    ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "fixed right-4 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-2 ring-background transition-transform hover:scale-105 hover:bg-primary/90",
          clearBottomNav
            ? "max-lg:bottom-[var(--mobile-bottom-nav-offset,6rem)] lg:bottom-6"
            : "bottom-6",
          open && "scale-95 max-lg:pointer-events-none max-lg:opacity-0",
        )}
        aria-expanded={open}
        aria-label={
          open ? "Close iCare assistant" : assistantCopy.openAria
        }
      >
        {open ? (
          <X className="size-6 stroke-[2.5]" aria-hidden />
        ) : (
          <MessageCircle className="size-6 stroke-[2.5]" aria-hidden />
        )}
      </button>

      {assistantOverlay
        ? createPortal(assistantOverlay, document.body)
        : null}
    </>
  );
}
