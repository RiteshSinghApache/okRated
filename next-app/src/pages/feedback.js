// pages/login.js
import AuthHeadMeta from "@/components/AuthHeadMeta";
import FeedbackFormComponent from "@/components/FeedbackFormComponent";
import AuthFooterScripts from "@/components/AuthFooterScripts";

export default function FeedbackPage() {
  return (
    <>
      <AuthHeadMeta title="Feedback Form Page" />
      <FeedbackFormComponent />
      <AuthFooterScripts />
    </>
  );
}
