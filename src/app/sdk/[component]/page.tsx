import { notFound } from "next/navigation";
import { sdkNav } from "@/lib/sdk-nav";
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

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component } = await params;
  const navItem = sdkNav.find((item) => item.slug === component);

  if (!navItem) notFound();

  const Demo = demos[component];

  return (
    <div className="px-4 md:px-10 py-8 md:py-10 max-w-4xl">
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
