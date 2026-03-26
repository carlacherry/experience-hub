import { notFound } from "next/navigation";
import { sdkNav, chatShellNav, overviewNav } from "@/lib/sdk-nav";
import { ThemeSwitcher } from "@/components/sdk/theme-switcher";
import dynamic from "next/dynamic";

const demos: Record<string, React.ComponentType> = {
  "product-card-horizontal": dynamic(() => import("@/components/demos/product-card-horizontal-demo")),
  "product-card-vertical": dynamic(() => import("@/components/demos/product-card-vertical-demo")),
  "product-list": dynamic(() => import("@/components/demos/product-list-demo")),
  "product-carousel": dynamic(() => import("@/components/demos/product-carousel-demo")),
  "suggestions": dynamic(() => import("@/components/demos/suggestion-carousel-demo")),
  "promo-card": dynamic(() => import("@/components/demos/promo-card-demo")),
};

const ChatShellDemo = dynamic(() => import("@/components/demos/chat-shell-demo"));
const ChatCustomizationDemo = dynamic(() => import("@/components/demos/chat-customization-demo"));
const SdkWelcomeDemo = dynamic(() => import("@/components/demos/sdk-welcome-demo"));
const SdkDesignWidgetsDemo = dynamic(() => import("@/components/demos/sdk-design-widgets-demo"));

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component } = await params;

  // Overview pages — no theme switcher
  const overviewItem = overviewNav.find((item) => item.slug === component);
  if (overviewItem) {
    const Demo = component === "welcome" ? SdkWelcomeDemo : SdkDesignWidgetsDemo;
    return (
      <div className="px-4 md:px-10 py-8 md:py-10">
        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-black tracking-tight">{overviewItem.name}</h1>
            <p className="text-base text-[#666] mt-2 max-w-xl">{overviewItem.description}</p>
          </div>
          {component === "welcome" && (
            <div className="flex gap-2 shrink-0 mt-1">
              <a
                href="https://github.com/yalochat/chat-sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium bg-black text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                chat-sdk
              </a>
              <a
                href="/WIDGET_DESIGN_GUIDELINES.md"
                download
                className="inline-flex items-center gap-2 text-sm font-medium text-[#333] bg-white border border-[#e5e5e5] px-4 py-2 rounded-lg hover:bg-[#f5f5f5] transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Guidelines
              </a>
            </div>
          )}
        </div>
        <div className="border-t border-[#e5e5e5] pt-8 md:pt-10">
          <Demo />
        </div>
      </div>
    );
  }

  // Chat shell pages — no theme switcher
  const chatShellItem = chatShellNav.find((item) => item.slug === component);
  if (chatShellItem) {
    const Demo = component === "chat-shell" ? ChatShellDemo : ChatCustomizationDemo;
    return (
      <div className="px-4 md:px-10 py-8 md:py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-black tracking-tight">{chatShellItem.name}</h1>
          <p className="text-base text-[#666] mt-2 max-w-xl">{chatShellItem.description}</p>
        </div>
        <div className="border-t border-[#e5e5e5] pt-8 md:pt-10">
          <Demo />
        </div>
      </div>
    );
  }

  const navItem = sdkNav.find((item) => item.slug === component);
  if (!navItem) notFound();

  const Demo = demos[component];

  return (
    <div className="px-4 md:px-10 py-8 md:py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-black tracking-tight">{navItem.name}</h1>
        <p className="text-base text-[#666] mt-2 max-w-xl">{navItem.description}</p>
        {navItem.subDescription && (
          <p className="text-base text-[#666] mt-1 max-w-xl">{navItem.subDescription}</p>
        )}
      </div>

      <div className="border-t border-[#e5e5e5] pt-8 md:pt-10">
        <p className="text-xs font-semibold text-[#989898] uppercase tracking-widest mb-6 md:mb-8">
          Live Demo
        </p>
        <div className="overflow-x-auto pb-4">
          <ThemeSwitcher>
            <Demo />
          </ThemeSwitcher>
        </div>
      </div>
    </div>
  );
}
