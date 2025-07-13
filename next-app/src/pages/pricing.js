// pages/pricing.js
import AuthHeadMeta from "@/components/AuthHeadMeta";
import PricingComponent from "@/components/PricingComponent";
import AuthFooterScripts from "@/components/AuthFooterScripts";

export default function PricingPage() {
  return (
    <>
      <AuthHeadMeta title="Pricing Page" />
      <PricingComponent />
      <AuthFooterScripts />
    </>
  );
}
