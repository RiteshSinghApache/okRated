import AuthHeadMeta from "@/components/AuthHeadMeta";
import ThankYouComponent from "@/components/ThankYouComponent";
import AuthFooterScripts from "@/components/AuthFooterScripts";

export default function ThankYouPage() {
  return (
    <>
      <AuthHeadMeta title="Thank You" />
      <ThankYouComponent />
      <AuthFooterScripts />
    </>
  );
}
