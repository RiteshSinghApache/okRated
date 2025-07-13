import AuthHeadMeta from "@/components/AuthHeadMeta";
import SignupComponent from "@/components/SignupComponent";
import AuthFooterScripts from "@/components/AuthFooterScripts";

export default function SignInPage() {
  return (
    <>
      <AuthHeadMeta title="Signup Page" />
      <SignupComponent />
      <AuthFooterScripts />
    </>
  );
}