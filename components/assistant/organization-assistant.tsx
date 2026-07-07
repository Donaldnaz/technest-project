"use client";

import { useState, useTransition } from "react";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

import { askOrganizationAssistant } from "@/app/actions/assistant";
import { ASSISTANT_SUGGESTED_QUESTIONS } from "@/lib/ai/organization-knowledge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function OrganizationAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I can answer questions about iCare and how this upload portal works. What would you like to know?",
    },
  ]);
  const [pending, startTransition] = useTransition();

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
      const result = await askOrganizationAssistant({
        messages: nextMessages.map(({ role, content }) => ({ role, content })),
      });

      if (!result.success) {
        toast.error(result.error);
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

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "fixed bottom-20 right-4 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-2 ring-background transition-transform hover:scale-105 hover:bg-primary/90 md:bottom-8",
          open && "scale-95",
        )}
        aria-expanded={open}
        aria-label={open ? "Close iCare assistant" : "Open iCare assistant"}
      >
        {open ? (
          <X className="size-6 stroke-[2.5]" aria-hidden />
        ) : (
          <MessageCircle className="size-6 stroke-[2.5]" aria-hidden />
        )}
      </button>

      {open && (
        <div
          className="fixed bottom-36 right-4 z-50 flex w-[min(100vw-2rem,24rem)] flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl md:bottom-24"
          role="dialog"
          aria-label="iCare assistant"
        >
          <header className="border-b border-border/60 bg-gradient-to-br from-sage-50 to-oat-50 px-4 py-3 dark:from-sage-950/40 dark:to-charcoal-950/40">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-sage-700 dark:text-sage-300" aria-hidden />
              <div>
                <p className="font-heading text-sm font-semibold">iCare assistant</p>
                <p className="text-xs text-muted-foreground">
                  Answers about iCare & this portal
                </p>
              </div>
            </div>
          </header>

          <div className="flex max-h-80 flex-1 flex-col gap-3 overflow-y-auto p-4">
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
              <p className="text-xs text-muted-foreground">Thinking…</p>
            )}

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {ASSISTANT_SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    disabled={pending}
                    onClick={() => sendMessage(question)}
                    className="rounded-full border border-border/60 bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-sage-300 hover:text-foreground"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="flex gap-2 border-t border-border/60 p-3"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about iCare…"
              disabled={pending}
              className="dashboard-form-control min-h-10 flex-1 rounded-xl px-3 text-sm"
              aria-label="Message to iCare assistant"
            />
            <Button
              type="submit"
              size="icon"
              disabled={pending || !input.trim()}
              className="size-10 shrink-0 rounded-xl bg-sage-700 hover:bg-sage-800"
              aria-label="Send message"
            >
              <Send className="size-4" aria-hidden />
            </Button>
          </form>

          <p className="border-t border-border/40 px-3 py-2 text-[10px] leading-relaxed text-muted-foreground">
            General platform help only — not medical advice. Answers use iCare
            website information.
          </p>
        </div>
      )}
    </>
  );
}
