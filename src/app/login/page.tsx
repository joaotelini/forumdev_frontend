import AuthForm from "@/components/auth/AuthForm";
import AuthPage from "@/components/auth/AuthPage";

export default function LoginPage() {
  return (
    <AuthPage>
      <AuthForm mode="login" />
    </AuthPage>
  );
}
