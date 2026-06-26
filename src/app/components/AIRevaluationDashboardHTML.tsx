"use client";

import { useMemo, useState } from "react";

type BastionPreviewTab = "bank-indexes" | "decompositions";

const BASTION_PREVIEW_TABS: {
  value: BastionPreviewTab;
  label: string;
  src: string;
  title: string;
}[] = [
  {
    value: "bank-indexes",
    label: "Bank Indexes",
    src: "/bastion-bank-indexes.html",
    title: "BASTION Bank Indexes HTML Preview",
  },
  {
    value: "decompositions",
    label: "BASTION Decompositions",
    src: "/bastion-decompositions.html",
    title: "BASTION Decompositions HTML Preview",
  },
];

export default function AIRevaluationDashboardHTML() {
  const [activeTab, setActiveTab] = useState<BastionPreviewTab>("bank-indexes");

  const activePreview = useMemo(
    () =>
      BASTION_PREVIEW_TABS.find((tab) => tab.value === activeTab) ??
      BASTION_PREVIEW_TABS[0],
    [activeTab],
  );

  return (
    <div className="w-full">
      <div className="mb-5 flex gap-9 overflow-x-auto border-b border-gray-200">
        {BASTION_PREVIEW_TABS.map((tab) => {
          const isActive = tab.value === activeTab;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`whitespace-nowrap pb-2 text-[12px] font-medium transition-colors ${
                isActive
                  ? "border-b-2 border-blue-950 text-blue-950"
                  : "border-b-2 border-transparent text-[#545454] hover:text-blue-950"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <iframe
        key={activePreview.src}
        title={activePreview.title}
        src={activePreview.src}
        className="h-[1120px] w-full bg-white"
        style={{ border: 0, borderRadius: 0, boxShadow: "none" }}
      />
    </div>
  );
}
