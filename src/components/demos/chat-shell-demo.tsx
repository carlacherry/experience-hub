"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Zone = "header" | "messages" | "quick-replies" | "composer" | null;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Tag({ type }: { type: "yes" | "no" | "optional" | "auto" }) {
  const map = {
    yes:      { icon: <Check size={11} strokeWidth={2.5} />, label: "Yes",      className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    no:       { icon: null,                                   label: "No",       className: "bg-[#f3f3f3] text-[#666] border-[#e5e5e5]" },
    optional: { icon: null,                                   label: "Optional", className: "bg-[#f3f3f3] text-[#666] border-[#e5e5e5]" },
    auto:     { icon: null,                                   label: "Auto",     className: "bg-[#f3f3f3] text-[#666] border-[#e5e5e5]" },
  };
  const { icon, label, className } = map[type];
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border ${className}`}>
      {icon}{label}
    </span>
  );
}

function Swatch({ color }: { color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="inline-block w-3 h-3 rounded-full border border-black/10 shrink-0" style={{ background: color }} />
      <span>{color}</span>
    </span>
  );
}

function SectionLabel({ children, description }: { children: React.ReactNode; description?: string }) {
  return (
    <div className="mb-5">
      <p className="text-xl font-semibold text-black">{children}</p>
      {description && <p className="text-sm text-[#666] mt-1">{description}</p>}
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: (React.ReactNode)[][] }) {
  return (
    <div>
      <table className="w-full text-sm border-collapse md:table-fixed">
        <colgroup>
          <col className="w-44" />
          <col className="w-32" />
          <col className="w-28" />
          <col />
        </colgroup>
        <thead>
          <tr className="border-b-2 border-[#e5e5e5]">
            {headers.map((h, i) => (
              <th
                key={h}
                className={`text-left text-xs font-semibold text-[#989898] uppercase tracking-wider pb-2.5 pr-4 last:pr-0 ${i === headers.length - 1 ? "hidden md:table-cell" : ""}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#ebebeb] last:border-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`py-2.5 pr-4 last:pr-0 align-middle text-[#333] leading-relaxed ${j === row.length - 1 ? "hidden md:table-cell" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Anatomy diagram ──────────────────────────────────────────────────────────

const ZONES: { id: Zone; label: string; top: string; height: string; color: string; activeColor: string; border: string; activeBorder: string }[] = [
  { id: "header",        label: "1", top: "0%",   height: "13%", color: "#f5f5f5", activeColor: "#dbeafe", border: "#d4d4d4", activeBorder: "#3b82f6" },
  { id: "messages",      label: "2", top: "13%",  height: "52%", color: "#f0f0f0", activeColor: "#bbf7d0", border: "#c8c8c8", activeBorder: "#22c55e" },
  { id: "quick-replies", label: "3", top: "65%",  height: "13%", color: "#ebebeb", activeColor: "#fef08a", border: "#c0c0c0", activeBorder: "#eab308" },
  { id: "composer",      label: "4", top: "78%",  height: "22%", color: "#e5e5e5", activeColor: "#e9d5ff", border: "#b8b8b8", activeBorder: "#a855f7" },
];

function AnatomyDiagram({ activeZone }: { activeZone: Zone }) {
  const headerActive   = activeZone === "header";
  const messagesActive = activeZone === "messages";
  const qrActive       = activeZone === "quick-replies";
  const composerActive = activeZone === "composer";

  return (
    <div className="flex flex-col gap-5">
      {/* Phone */}
      <div className="relative w-full aspect-[9/16] rounded-[20px] border-2 border-[#d1d5db] bg-white shadow-md overflow-hidden">
        {ZONES.map((z) => {
          const isActive = activeZone === z.id;
          return (
            <div
              key={z.id}
              className="absolute left-0 right-0 flex items-center justify-end pr-2 transition-all duration-300"
              style={{
                top: z.top,
                height: z.height,
                background: isActive ? z.activeColor : z.color,
                borderBottom: `1px dashed ${isActive ? z.activeBorder : z.border}`,
              }}
            >
              <span
                className="w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center text-white shrink-0 transition-all duration-300"
                style={{ background: isActive ? z.activeBorder : z.border }}
              >
                {z.label}
              </span>
            </div>
          );
        })}

        {/* Header content */}
        <div className="absolute top-0 left-0 right-0 flex items-center gap-2 px-3 py-2.5" style={{ height: "13%" }}>
          <div className="w-4 h-4 rounded-full shrink-0 transition-colors duration-300" style={{ background: headerActive ? "#93c5fd" : "#c8c8c8" }} />
          <div className="flex flex-col gap-0.5 flex-1">
            <div className="h-1.5 w-16 rounded-full transition-colors duration-300" style={{ background: headerActive ? "#93c5fd" : "#c8c8c8" }} />
            <div className="h-1 w-10 rounded-full transition-colors duration-300" style={{ background: headerActive ? "#bfdbfe" : "#e0e0e0" }} />
          </div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded transition-colors duration-300" style={{ background: headerActive ? "#bfdbfe" : "#e0e0e0" }} />
            <div className="w-3 h-3 rounded transition-colors duration-300" style={{ background: headerActive ? "#bfdbfe" : "#e0e0e0" }} />
          </div>
        </div>

        {/* Messages content */}
        <div className="absolute left-0 right-0 flex flex-col gap-2 px-3 py-2" style={{ top: "13%", height: "52%" }}>
          <div className="self-start h-3.5 w-28 rounded-lg rounded-bl-none opacity-70 transition-colors duration-300" style={{ background: messagesActive ? "#86efac" : "#c8c8c8" }} />
          <div className="self-end h-3.5 w-20 rounded-lg rounded-br-none opacity-70 transition-colors duration-300" style={{ background: messagesActive ? "#d1fae5" : "#e0e0e0" }} />
          <div className="self-start h-3.5 w-24 rounded-lg rounded-bl-none opacity-70 transition-colors duration-300" style={{ background: messagesActive ? "#86efac" : "#c8c8c8" }} />
          <div className="self-start w-full h-12 rounded-lg border transition-colors duration-300" style={{ background: "white", borderColor: messagesActive ? "#bbf7d0" : "#e0e0e0" }} />
          <div className="self-end h-3.5 w-16 rounded-lg rounded-br-none opacity-70 transition-colors duration-300" style={{ background: messagesActive ? "#d1fae5" : "#e0e0e0" }} />
        </div>

        {/* Quick replies content */}
        <div className="absolute left-0 right-0 flex gap-1.5 justify-center items-center px-3" style={{ top: "65%", height: "13%" }}>
          <div className="h-5 w-20 rounded-full opacity-60 transition-colors duration-300" style={{ background: qrActive ? "#fde047" : "#c8c8c8" }} />
          <div className="h-5 w-16 rounded-full opacity-60 transition-colors duration-300" style={{ background: qrActive ? "#fde047" : "#c8c8c8" }} />
        </div>

        {/* Composer content */}
        <div className="absolute left-0 right-0 flex items-center gap-1.5 px-3" style={{ top: "78%", height: "22%" }}>
          <div className="flex-1 h-7 rounded-full border transition-colors duration-300" style={{ background: "white", borderColor: composerActive ? "#d8b4fe" : "#d4d4d4" }} />
          <div className="w-7 h-7 rounded-full opacity-70 transition-colors duration-300" style={{ background: composerActive ? "#a855f7" : "#aaaaaa" }} />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2">
        {ZONES.map((z) => {
          const isActive = activeZone === z.id;
          const labels: Record<string, string> = {
            header: "Header",
            messages: "Messages",
            "quick-replies": "Quick Replies",
            composer: "Composer",
          };
          return (
            <div
              key={z.id}
              className="flex items-center gap-2.5 transition-opacity duration-300"
              style={{ opacity: activeZone === null || isActive ? 1 : 0.35 }}
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 transition-all duration-300"
                style={{ background: isActive ? z.activeBorder : z.border }}
              >
                {z.label}
              </span>
              <span className={`text-xs transition-colors duration-300 ${isActive ? "text-black font-semibold" : "text-[#666]"}`}>
                {labels[z.id!]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const SECTIONS: { zone: Zone; label: string; description?: string; content: React.ReactNode }[] = [
  {
    zone: "header",
    label: "Header",
    description: "Agent branding, identity, and primary navigation actions.",
    content: (
      <Table
        headers={["Element", "Configurable", "Hideable", "Notes"]}
        rows={[
          [
            <code key="k" className="text-xs bg-[#f3f3f3] px-1.5 py-0.5 rounded">background</code>,
            <Tag key="c" type="yes" />, <Tag key="h" type="no" />,
            <span key="n" className="text-xs text-[#666] inline-flex items-center gap-1 flex-wrap">Default <Swatch color="#f1f5fc" /> via <code className="bg-[#f3f3f3] px-1 rounded">--yalo-chat-header-background</code></span>,
          ],
          [
            "Agent avatar",
            <Tag key="c" type="yes" />, <Tag key="h" type="optional" />,
            <span key="n" className="text-xs text-[#666]">Circular. Flutter: <code className="bg-[#f3f3f3] px-1 rounded">chatIconImage</code>. Web: <code className="bg-[#f3f3f3] px-1 rounded">image</code></span>,
          ],
          [
            "Agent name",
            <Tag key="c" type="yes" />, <Tag key="h" type="no" />,
            <span key="n" className="text-xs text-[#666]">Required. Set via <code className="bg-[#f3f3f3] px-1 rounded">channelName</code></span>,
          ],
          [
            "Connected status",
            <Tag key="c" type="yes" />, <Tag key="h" type="optional" />,
            <span key="n" className="text-xs text-[#666]">Reactive to connection state. E.g. "Online"</span>,
          ],
          [
            "Close / back button",
            <Tag key="c" type="yes" />, <Tag key="h" type="no" />,
            <span key="n" className="text-xs text-[#666]">Always present. Color via <code className="bg-[#f3f3f3] px-1 rounded">--yalo-chat-close-btn-color</code></span>,
          ],
          [
            "Cart icon",
            <Tag key="c" type="yes" />, <Tag key="h" type="optional" />,
            <span key="n" className="text-xs text-[#666]">Flutter: <code className="bg-[#f3f3f3] px-1 rounded">onCartPressed</code>. Shows badge with item count.</span>,
          ],
          [
            "Shop / filters icon",
            <Tag key="c" type="yes" />, <Tag key="h" type="optional" />,
            <span key="n" className="text-xs text-[#666]">Flutter: <code className="bg-[#f3f3f3] px-1 rounded">onShopPressed</code></span>,
          ],
        ]}
      />
    ),
  },
  {
    zone: "messages",
    label: "Messages",
    description: "Main conversation area. Renders text bubbles, agent messages, and inline widgets.",
    content: (
      <Table
        headers={["Element", "Configurable", "Hideable", "Notes"]}
        rows={[
          [
            "User bubble",
            <Tag key="c" type="yes" />, <Tag key="h" type="no" />,
            <span key="n" className="text-xs text-[#666] inline-flex items-center gap-1 flex-wrap">Right-aligned, max 75%. Default <Swatch color="#F9FAFC" />. Flutter: <code className="bg-[#f3f3f3] px-1 rounded">userMessageColor</code></span>,
          ],
          [
            "Agent message",
            <Tag key="c" type="yes" />, <Tag key="h" type="no" />,
            <span key="n" className="text-xs text-[#666]">Left-aligned, no bubble. Renders HTML/markdown. Flutter: <code className="bg-[#f3f3f3] px-1 rounded">assistantMessageTextStyle</code></span>,
          ],
          [
            "Typing indicator",
            <Tag key="c" type="no" />, <Tag key="h" type="no" />,
            <span key="n" className="text-xs text-[#666]">3-dot animated loader. Handled automatically by the SDK.</span>,
          ],
          [
            "In-chat widgets",
            <Tag key="c" type="yes" />, <Tag key="h" type="optional" />,
            <span key="n" className="text-xs text-[#666]">ProductCarousel, ProductList, PromoCard, Suggestions. Rendered inline as agent messages.</span>,
          ],
        ]}
      />
    ),
  },
  {
    zone: "quick-replies",
    label: "Quick replies",
    description: "Contextual suggestion chips shown above the composer. Collapse automatically on scroll.",
    content: (
      <Table
        headers={["Element", "Configurable", "Hideable", "Notes"]}
        rows={[
          [
            "Chips",
            <Tag key="c" type="yes" />, <Tag key="h" type="optional" />,
            <span key="n" className="text-xs text-[#666]">Flutter: <code className="bg-[#f3f3f3] px-1 rounded">quickReplyColor</code> / <code className="bg-[#f3f3f3] px-1 rounded">quickReplyBorderColor</code> / <code className="bg-[#f3f3f3] px-1 rounded">quickReplyStyle</code></span>,
          ],
          [
            "Scroll behavior",
            <Tag key="c" type="no" />, <Tag key="h" type="no" />,
            <span key="n" className="text-xs text-[#666]">Collapse automatically when the user scrolls up or focuses the input.</span>,
          ],
          [
            "Chip count",
            <Tag key="c" type="yes" />, <Tag key="h" type="no" />,
            <span key="n" className="text-xs text-[#666]">Controlled by the flow. The demo shows a max of 2 at a time.</span>,
          ],
        ]}
      />
    ),
  },
  {
    zone: "composer",
    label: "Composer",
    description: "Text input with voice, attachment, and send controls.",
    content: (
      <Table
        headers={["Element", "Configurable", "Hideable", "Notes"]}
        rows={[
          [
            "Text field",
            <Tag key="c" type="yes" />, <Tag key="h" type="no" />,
            <span key="n" className="text-xs text-[#666] inline-flex items-center gap-1 flex-wrap">Border 1px solid <Swatch color="#e8e8e8" />, rounded. Auto-resize up to 3 lines (web).</span>,
          ],
          [
            "Placeholder",
            <Tag key="c" type="yes" />, <Tag key="h" type="no" />,
            <span key="n" className="text-xs text-[#666]">Flutter: <code className="bg-[#f3f3f3] px-1 rounded">hintTextStyle</code></span>,
          ],
          [
            "Send button",
            <Tag key="c" type="yes" />, <Tag key="h" type="no" />,
            <span key="n" className="text-xs text-[#666] inline-flex items-center gap-1 flex-wrap">Circular, default <Swatch color="#2207F1" />. Flutter: <code className="bg-[#f3f3f3] px-1 rounded">sendButtonColor</code> / <code className="bg-[#f3f3f3] px-1 rounded">sendButtonIcon</code></span>,
          ],
          [
            "Mic / voice note",
            <Tag key="c" type="yes" />, <Tag key="h" type="optional" />,
            <span key="n" className="text-xs text-[#666]">Shown when input is empty. Icon: <code className="bg-[#f3f3f3] px-1 rounded">recordAudioIcon</code></span>,
          ],
          [
            "Camera / attachment",
            <Tag key="c" type="yes" />, <Tag key="h" type="optional" />,
            <span key="n" className="text-xs text-[#666]">Flutter: <code className="bg-[#f3f3f3] px-1 rounded">showAttachmentButton</code> (default true). Hidden during audio recording.</span>,
          ],
        ]}
      />
    ),
  },
];

export default function ChatShellDemo() {
  const [activeZone, setActiveZone] = useState<Zone>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    function onScroll() {
      const els = sectionRefs.current.filter(Boolean) as HTMLElement[];
      if (els.length === 0) return;

      const triggerY = window.innerHeight * 0.35;
      const scrollTop = window.scrollY ?? document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // Near bottom of page → activate last zone
      if (scrollTop + clientHeight >= scrollHeight - 80) {
        setActiveZone((els[els.length - 1].dataset.zone as Zone) ?? null);
        return;
      }

      // Section that contains the trigger line
      for (let i = els.length - 1; i >= 0; i--) {
        const rect = els[i].getBoundingClientRect();
        if (rect.top <= triggerY && rect.bottom >= triggerY) {
          setActiveZone((els[i].dataset.zone as Zone) ?? null);
          return;
        }
      }

      // Fallback: last section whose top crossed the trigger
      for (let i = els.length - 1; i >= 0; i--) {
        const rect = els[i].getBoundingClientRect();
        if (rect.top <= triggerY) {
          setActiveZone((els[i].dataset.zone as Zone) ?? null);
          return;
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex gap-10 items-start">

      {/* Left — sticky anatomy */}
      <div className="sticky top-10 w-[360px] shrink-0 hidden lg:block pr-6">
        <AnatomyDiagram activeZone={activeZone} />
      </div>

      {/* Right — scrollable sections */}
      <div className="flex-1 min-w-0 flex flex-col gap-10 md:gap-14 pb-48">
        {SECTIONS.map(({ zone, label, description, content }, i) => (
          <section
            key={label}
            ref={(el) => { sectionRefs.current[i] = el; }}
            data-zone={zone ?? ""}
          >
            <SectionLabel description={description}>{label}</SectionLabel>
            {content}
          </section>
        ))}
      </div>

    </div>
  );
}
