import { SdkLayoutClient } from "@/components/sdk/sdk-layout-client";

export default function SdkLayout({ children }: { children: React.ReactNode }) {
  return <SdkLayoutClient>{children}</SdkLayoutClient>;
}
