function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-black">{title}</h2>
      <div className="text-sm text-[#444] leading-relaxed flex flex-col gap-2">{children}</div>
    </section>
  );
}

function Principle({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 py-4 border-b border-[#ebebeb] last:border-0">
      <span className="text-xs font-mono text-[#aaa] w-5 shrink-0 pt-0.5">{number}</span>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-black">{title}</p>
        <p className="text-sm text-[#555] leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

export default function SdkWelcomeDemo() {
  return (
    <div className="max-w-4xl flex flex-col gap-12">

      {/* Purpose & Scope */}
      <Section title="Purpose & Scope">
        <p>
          This documentation defines the design guidelines for creating, extending, and customizing
          widgets in the Yalo Chat SDK. It is intended to be used by designers, engineers, sales
          teams, and AI agents to produce consistent, high-quality chat experiences across all
          deployments and platforms.
        </p>
        <p>
          <strong className="text-black">What is a widget?</strong> A widget is a self-contained,
          interactive UI component that lives inside the chat window. Widgets are sent by the agent
          or the conversational flow to collect information, display content, or guide the user
          through a task. They are not free-form messages — they have a defined structure, behavior,
          and set of configurable properties.
        </p>
        <p>
          <strong className="text-black">Scope:</strong> All widgets in the chat-sdk repository
          across Android, iOS, Flutter, and Web platforms.
        </p>
      </Section>

      {/* Plug and Play */}
      <Section title="Plug-and-Play Principle">
        <p>
          The SDK ships with a library of pre-built widgets. Implementations do not build widgets
          from scratch — they configure them.
        </p>
        <div className="bg-[#f8f8f8] border border-[#e5e5e5] rounded-xl p-5 flex flex-col gap-2 mt-1">
          <p className="text-sm text-[#333]">
            A widget is activated by sending a structured event with the widget type and its
            configuration — fields, labels, options, theme. The SDK handles rendering across
            Android, iOS, and Web.
          </p>
          <p className="text-sm font-medium text-black mt-1">
            Configuration → SDK → Renders everywhere.
          </p>
        </div>
      </Section>

      {/* Core UX Philosophy */}
      <Section title="Core UX Philosophy">
        <p className="mb-2">
          These principles are inherited from the Yalo Design System and adapted to the chat
          context. Every widget must follow all of them.
        </p>
        <div className="border border-[#e5e5e5] rounded-xl overflow-hidden">
          <Principle number="1" title="Progressive Disclosure">
            Show only what the user needs at each moment. Never front-load all information if the
            user doesn't need it yet. The Conversational Questions widget is the clearest expression
            of this — one question at a time.
          </Principle>
          <Principle number="2" title="Simplicity Above All">
            The chat window is a constrained space. Every element in a widget must earn its place.
            Each widget should answer one question: <em>what should the user do right now?</em>
          </Principle>
          <Principle number="3" title="Predict User Actions">
            Pre-fill fields when context is available. Show inline hints at decision points. Place
            the primary action where the user expects it — bottom of the widget.
          </Principle>
          <Principle number="4" title="Consistency Over Novelty">
            All widgets share the same visual language: spacing, border radius, typography, color
            roles. Do not introduce new visual patterns unless absolutely necessary.
          </Principle>
          <Principle number="5" title="Forgiveness & Recovery">
            Users make mistakes. Widgets must validate inline, show clear error messages, and never
            dead-end the user. If submission fails, the user must be able to correct and retry
            without losing their input.
          </Principle>
          <Principle number="6" title="Accessibility First">
            All widgets must be operable via keyboard and screen reader. Interactive elements must
            have visible focus states. Color must never be the only indicator of state. Minimum
            contrast: 4.5:1 for text, 3:1 for UI elements.
          </Principle>
          <Principle number="7" title="Performance Is UX">
            A widget that takes time to respond must communicate that wait. Use loading or skeleton
            states. Never leave the user wondering if their action registered. Use the Thinking
            widget whenever the expected wait exceeds 2 seconds.
          </Principle>
        </div>
      </Section>

    </div>
  );
}
