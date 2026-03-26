function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-[#989898] uppercase tracking-widest mb-5">
      {children}
    </p>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: (React.ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-[#e5e5e5]">
            {headers.map((h) => (
              <th key={h} className="text-left text-xs font-semibold text-[#989898] uppercase tracking-wider pb-3 pr-8 last:pr-0">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#f3f3f3] last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="py-3 pr-8 last:pr-0 align-top text-[#333] leading-relaxed">
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

function Swatch({ color }: { color: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="inline-block w-3 h-3 rounded-full border border-black/10 shrink-0"
        style={{ background: color }}
      />
      <span className="text-sm text-[#333]">{color}</span>
    </span>
  );
}

export default function ChatCustomizationDemo() {
  return (
    <div className="max-w-2xl flex flex-col gap-14">

      {/* Web */}
      <section>
        <SectionLabel>Web — CSS Custom Properties</SectionLabel>
        <Table
          headers={["Variable", "Applies to", "Default"]}
          rows={[
            [
              <code key="k" className="text-xs bg-[#f3f3f3] px-1.5 py-0.5 rounded">--yalo-chat-header-background</code>,
              "Header background",
              <Swatch key="s" color="#f1f5fc" />,
            ],
            [
              <code key="k" className="text-xs bg-[#f3f3f3] px-1.5 py-0.5 rounded">--yalo-chat-header-color</code>,
              "Header text",
              <Swatch key="s" color="#010101" />,
            ],
            [
              <code key="k" className="text-xs bg-[#f3f3f3] px-1.5 py-0.5 rounded">--yalo-chat-close-btn-color</code>,
              "Close / back button",
              <Swatch key="s" color="#010101" />,
            ],
          ]}
        />
      </section>

      {/* Flutter */}
      <section>
        <SectionLabel>Flutter — ChatTheme</SectionLabel>
        <Table
          headers={["Prop", "Type", "Zone", "Default"]}
          rows={[
            ["backgroundColor",            "Color",         "Messages",      <Swatch key="s" color="#ffffff" />],
            ["appBarBackgroundColor",       "Color",         "Header",        <span key="s" className="text-xs text-[#999]">theme primary</span>],
            ["userMessageColor",            "Color",         "Messages",      <Swatch key="s" color="#F9FAFC" />],
            ["inputTextFieldColor",         "Color",         "Composer",      <Swatch key="s" color="#ffffff" />],
            ["inputTextFieldBorderColor",   "Color",         "Composer",      <Swatch key="s" color="#e8e8e8" />],
            ["sendButtonColor",             "Color",         "Composer",      <Swatch key="s" color="#2207F1" />],
            ["sendButtonForegroundColor",   "Color",         "Composer",      <Swatch key="s" color="#ffffff" />],
            ["sendButtonIcon",              "Widget",        "Composer",      <span key="s" className="text-xs text-[#999]">send icon</span>],
            ["recordAudioIcon",             "Widget",        "Composer",      <span key="s" className="text-xs text-[#999]">mic icon</span>],
            ["chatIconImage",               "ImageProvider", "Header",        <span key="s" className="text-xs text-[#999]">null (hidden)</span>],
            ["quickReplyColor",             "Color",         "Quick Replies", <Swatch key="s" color="#F9FAFC" />],
            ["quickReplyBorderColor",       "Color",         "Quick Replies", <Swatch key="s" color="#ECEDEF" />],
            ["quickReplyStyle",             "TextStyle",     "Quick Replies", <span key="s" className="text-xs text-[#999]">14px, medium</span>],
            ["userMessageTextStyle",        "TextStyle",     "Messages",      <span key="s" className="text-xs text-[#999]">14px, regular</span>],
            ["assistantMessageTextStyle",   "TextStyle",     "Messages",      <span key="s" className="text-xs text-[#999]">14px, regular</span>],
            ["hintTextStyle",               "TextStyle",     "Composer",      <span key="s" className="text-xs text-[#999]">14px, #7c8086</span>],
          ]}
        />
      </section>

    </div>
  );
}
