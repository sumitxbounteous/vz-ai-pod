import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import newUiHtml from "../assets/new-ui/index.html?raw";

/*
  DEMO-FIRST MODE
  - Static UX HTML
  - React controls visibility
  - No backend
  - No AI wiring
*/

function IndexPage() {
  const [activeTab, setActiveTab] = useState<"contract" | "ai-summary">("contract");

  useEffect(() => {
    const contractSection = document.getElementById("contract-section");
    const aiSummarySection = document.getElementById("ai-summary-section");

    const contractTab = document.getElementById("contractTab");
    const aiSummaryTab = document.getElementById("aiSummaryTab");

    if (!contractSection || !aiSummarySection || !contractTab || !aiSummaryTab) {
      return;
    }

    if (activeTab === "contract") {
      contractSection.style.display = "block";
      aiSummarySection.style.display = "none";

      contractTab.classList.add("border-red-600", "text-gray-900");
      contractTab.classList.remove("border-transparent", "text-gray-600");

      aiSummaryTab.classList.remove("border-red-600", "text-gray-900");
      aiSummaryTab.classList.add("border-transparent", "text-gray-600");
    } else {
      contractSection.style.display = "none";
      aiSummarySection.style.display = "block";

      aiSummaryTab.classList.add("border-red-600", "text-gray-900");
      aiSummaryTab.classList.remove("border-transparent", "text-gray-600");

      contractTab.classList.remove("border-red-600", "text-gray-900");
      contractTab.classList.add("border-transparent", "text-gray-600");
    }
  }, [activeTab]);

  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      const tab = target.getAttribute("data-tab");
      if (tab === "contract" || tab === "ai-summary") {
        setActiveTab(tab);
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div
        id="new-ui-container"
        dangerouslySetInnerHTML={{ __html: newUiHtml }}
      />
    </div>
  );
}

/* ---------------- ROUTE ---------------- */

export const Route = createFileRoute("/")({
  component: IndexPage,
});
