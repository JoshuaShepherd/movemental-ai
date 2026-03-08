"use client";

import { useState , useEffect } from "react";
import {
  ChatSupportMinimal,
  ChatWarmGreeting,
  ChatPanelSidebar,
  ChatWidgetPopup,
  ChatHeroOverlay,
  ChatAssistantFriendly,
  ChatDarkSidebar,
  ChatSplitTemplates,
  ChatTeamChannels,
  ChatSuggestionChips,
  ChatTemplateSwitcher,
} from "@/components/layouts/movement-leader";
import type { ChatVariant } from "@/components/layouts/movement-leader";
import { useTemplateVariant } from "@/app/templates/template-variant-context";

const templateComponents: Record<ChatVariant, React.ComponentType> = {
  "chat-support-minimal": ChatSupportMinimal,
  "chat-warm-greeting": ChatWarmGreeting,
  "chat-panel-sidebar": ChatPanelSidebar,
  "chat-widget-popup": ChatWidgetPopup,
  "chat-hero-overlay": ChatHeroOverlay,
  "chat-assistant-friendly": ChatAssistantFriendly,
  "chat-dark-sidebar": ChatDarkSidebar,
  "chat-split-templates": ChatSplitTemplates,
  "chat-team-channels": ChatTeamChannels,
  "chat-suggestion-chips": ChatSuggestionChips,
};

export default function ChatTemplatePage() {
  const [activeTemplate, setActiveTemplate] =
    useState<ChatVariant>("chat-warm-greeting");
  const ActiveComponent = templateComponents[activeTemplate];

  const { setVariant } = useTemplateVariant();
  useEffect(() => { setVariant(activeTemplate); }, [activeTemplate, setVariant]);

  return (
    <>
      <div className="sticky top-14 z-40 bg-background border-b">
        <ChatTemplateSwitcher
          activeTemplate={activeTemplate}
          onTemplateChange={setActiveTemplate}
        />
      </div>
      <ActiveComponent />
    </>
  );
}
