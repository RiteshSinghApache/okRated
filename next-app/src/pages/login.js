// pages/login.js
import AuthHeadMeta from "@/components/AuthHeadMeta";
import LoginComponent from "@/components/LoginComponent";
import AuthFooterScripts from "@/components/AuthFooterScripts";

export default function LoginPage() {
  return (
    <>
      <AuthHeadMeta title="Login Page" />
      <LoginComponent />
      <AuthFooterScripts />
    </>
  );
}
