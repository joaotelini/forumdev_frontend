import AuthForm from "@/components/auth/AuthForm";
import AuthPage from "@/components/auth/AuthPage";

export default function SignupPage() {
  return (
    <AuthPage>
      <AuthForm mode="signup" />
    </AuthPage>
  );
}
