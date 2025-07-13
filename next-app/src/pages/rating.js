// pages/rating.js
import AuthHeadMeta from "@/components/AuthHeadMeta";
import RatingComponent from "@/components/RatingComponent";
import AuthFooterScripts from "@/components/AuthFooterScripts";

export default function RatingPage() {
  return (
    <>
      <AuthHeadMeta title="Rating Page" />
      <RatingComponent />
      <AuthFooterScripts />
    </>
  );
}
