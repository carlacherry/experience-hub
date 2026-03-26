function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold text-black">{title}</h2>
        {description && <p className="text-sm text-[#555] mt-1 leading-relaxed">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function CheckGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-semibold text-[#989898] uppercase tracking-widest mb-2">{title}</p>
      {items.map((item) => (
        <label key={item} className="flex items-start gap-3 py-1.5 group cursor-pointer">
          <span className="mt-0.5 w-4 h-4 rounded border border-[#d4d4d4] bg-white shrink-0 group-hover:border-black transition-colors" />
          <span className="text-sm text-[#333] leading-relaxed">{item}</span>
        </label>
      ))}
    </div>
  );
}

export default function SdkDesignWidgetsDemo() {
  return (
    <div className="max-w-2xl flex flex-col gap-14">

      {/* White-label by Design */}
      <Section
        title="White-label by Design"
        description="Every deployment of the SDK can look and feel like a completely different product. The SDK provides the structure; the brand provides the identity."
      >
        <div className="grid grid-cols-3 gap-3">
          {[
            { layer: "Structure", owner: "SDK", description: "Layout, spacing, interaction behavior, states, and accessibility. Not customizable. This is what makes all widgets feel consistent.", muted: false },
            { layer: "Theme", owner: "Configurable per deployment", description: "Primary color, border radius, font family, and button style. Applied via a theme config at the SDK level — one theme covers all widgets.", muted: false },
            { layer: "Copy", owner: "Configurable per widget", description: "Titles, labels, placeholder text, button labels, and error messages.", muted: false },
          ].map(({ layer, owner, description }) => (
            <div key={layer} className="flex flex-col gap-2 border border-[#e5e5e5] rounded-xl p-4">
              <p className="text-base font-semibold text-black">{layer}</p>
              <p className="text-xs text-[#888] font-medium">{owner}</p>
              <p className="text-xs text-[#555] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-2">
          <p className="text-sm font-semibold text-black mb-3">Configurable per deployment</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              ["Primary color", "Buttons, active states, highlights"],
              ["Border radius", "All cards and input fields"],
              ["Font family", "All text within widgets"],
              ["Button style", "Filled or outlined"],
              ["Agent avatar & name", "Shown in the chat header"],
            ].map(([prop, desc]) => (
              <div key={prop} className="flex gap-3 py-2 border-b border-[#f3f3f3]">
                <span className="font-medium text-black w-36 shrink-0">{prop}</span>
                <span className="text-[#666]">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 bg-[#fafafa] border border-[#e5e5e5] rounded-xl p-4">
          <p className="text-sm font-semibold text-black mb-2">Not configurable (enforced by the SDK)</p>
          <ul className="flex flex-col gap-1.5">
            {[
              "Layout and spacing of widget zones (header, content, action, footer)",
              "Interaction behavior (validation logic, navigation patterns, step progression)",
              "Accessibility properties (focus states, contrast requirements, touch target sizes)",
              "State behavior (error, loading, disabled)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[#555]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ccc] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Widget Anatomy */}
      <Section
        title="Widget Anatomy"
        description="All widgets share a common structure. This ensures visual consistency and predictable behavior across all widget types."
      >
        <div className="border border-[#e5e5e5] rounded-xl overflow-hidden text-sm">
          {[
            { zone: "Header", note: "Optional for display widgets. Required for input widgets.", optional: true },
            { zone: "Content Area", note: "Primary content — fields, cards, image.", optional: false },
            { zone: "Action Zone", note: "Primary button (Submit / Continue). Full width, always bottom-aligned.", optional: false },
            { zone: "Footer", note: "Reserved for legal or attribution copy only.", optional: true },
          ].map(({ zone, note, optional }) => (
            <div key={zone} className="flex items-start gap-4 px-5 py-4 border-b border-[#ebebeb] last:border-0">
              <div className="flex items-center gap-2 w-36 shrink-0">
                <span className="font-semibold text-black">{zone}</span>
                {optional && (
                  <span className="text-[10px] font-medium text-[#999] bg-[#f3f3f3] border border-[#e5e5e5] px-1.5 py-0.5 rounded-full">
                    optional
                  </span>
                )}
              </div>
              <p className="text-[#555] leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#888]">Maximum widget height: 80% of the visible chat window. Taller content scrolls within the widget.</p>
      </Section>

      {/* Checklist */}
      <Section
        title="Creating a New Widget"
        description="A widget should only be created if the required experience cannot be achieved through configuration of an existing widget. Use this checklist to validate any new widget proposal."
      >
        <div className="flex flex-col gap-8 border border-[#e5e5e5] rounded-xl p-6">
          <CheckGroup
            title="Definition"
            items={[
              "Does a clear, specific use case exist that no current widget covers?",
              "Is this use case likely to recur across multiple deployments (not a one-off)?",
              "Has the widget been given a clear, descriptive name?",
              "Is the widget's purpose describable in one sentence?",
            ]}
          />
          <CheckGroup
            title="Structure"
            items={[
              "Does the widget follow the standard anatomy (Header / Content / Action Zone / Footer)?",
              "Has a maximum content size been defined to prevent overflow?",
              "Does the widget support all relevant states: empty, filled, loading, error, disabled, read-only (post-submit)?",
            ]}
          />
          <CheckGroup
            title="Input & Interaction"
            items={[
              "Are the supported input types listed (if applicable)?",
              "Are validation rules defined (required fields, formats, character limits)?",
              "Is the post-submit behavior defined (collapse, summary, next step)?",
            ]}
          />
          <CheckGroup
            title="Decision Rules"
            items={[
              'Have the "use when" conditions been written?',
              'Have the "do not use when" conditions been written?',
              "Has the widget been added to the Decision Tree?",
            ]}
          />
          <CheckGroup
            title="Copy"
            items={[
              "Are all user-facing strings listed (title, labels, placeholders, button, errors)?",
              "Has the copy been reviewed against the Copy Guidelines?",
              "Are translations available for all target deployment languages?",
            ]}
          />
          <CheckGroup
            title="Theming"
            items={[
              "Are any additional themeable properties identified beyond the global theme?",
              "Are the non-customizable properties documented?",
            ]}
          />
          <CheckGroup
            title="Accessibility"
            items={[
              "Do all interactive elements have visible focus states?",
              "Is color paired with another indicator (icon, text, pattern) for all state changes?",
              "Are all touch targets a minimum of 44×44px?",
            ]}
          />
        </div>
      </Section>

    </div>
  );
}
