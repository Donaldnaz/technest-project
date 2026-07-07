"use client";

import { useState, useTransition } from "react";
import { MessageCircle, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

import {
  askOrganizationAssistant,
  askPublicOrganizationAssistant,
} from "@/app/actions/assistant";
import { ASSISTANT_SUGGESTED_QUESTIONS } from "@/lib/ai/organization-knowledge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { landingCopy } from "@/lib/copy/landing";
import { patientAiCopy } from "@/lib/copy/patient/ai";
import { focusRingClassName } from "@/lib/landing/nav-link-styles";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type OrganizationAssistantProps = {
  variant?: "public" | "dashboard";
};

export function OrganizationAssistant({
  variant = "dashboard",
}: OrganizationAssistantProps) {
  const isPublic = variant === "public";
  const copy = isPublic ? landingCopy.assistant : patientAiCopy.assistant;
  const suggestedQuestions = isPublic
    ? ASSISTANT_SUGGESTED_QUESTIONS
    : patientAiCopy.suggestedQuestions;

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: copy.welcome,
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
      const ask = isPublic
        ? askPublicOrganizationAssistant
        : askOrganizationAssistant;

      const result = await ask({
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
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-20 right-4 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-2 ring-background transition-transform hover:scale-105 hover:bg-primary/90 md:bottom-8",
          focusRingClassName,
        )}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={copy.openAria}
      >
        <MessageCircle className="size-6 stroke-[2.5]" aria-hidden />
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
          role="dialog"
          aria-modal="true"
        >
          <SheetHeader className="border-b border-border/60 bg-gradient-to-br from-sage-50 to-oat-50 px-4 py-4 dark:from-sage-950/40 dark:to-charcoal-950/40">
            <div className="flex items-center gap-2 pr-8">
              <Sparkles
                className="size-4 text-sage-700 dark:text-sage-300"
                aria-hidden
              />
              <div>
                <SheetTitle className="font-heading text-sm">
                  {copy.title}
                </SheetTitle>
                <SheetDescription className="text-xs">
                  {copy.subtitle}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="flex max-h-[50vh] flex-1 flex-col gap-3 overflow-y-auto p-4 md:max-h-none">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "max-w-[90%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted/60 text-foreground",
                )}
              >
                {message.content}
              </div>
            ))}

            {pending && (
              <p className="text-xs text-muted-foreground">{copy.thinking}</p>
            )}

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    disabled={pending}
                    onClick={() => sendMessage(question)}
                    className={cn(
                      "rounded-full border border-border/60 bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-sage-300 hover:text-foreground",
                      focusRingClassName,
                    )}
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
              placeholder={copy.placeholder}
              disabled={pending}
              className="dashboard-form-control min-h-10 flex-1 rounded-lg px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={copy.inputAria}
            />
            <Button
              type="submit"
              size="icon"
              disabled={pending || !input.trim()}
              className="size-10 shrink-0 rounded-lg"
              aria-label={copy.sendAria}
            >
              <Send className="size-4" aria-hidden />
            </Button>
          </form>

          <p className="border-t border-border/40 px-3 py-2 text-[10px] leading-relaxed text-muted-foreground">
            {copy.disclaimer}
          </p>
        </SheetContent>
      </Sheet>
    </>
  );
}
