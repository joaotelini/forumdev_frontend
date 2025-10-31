import AuthForm from "@/components/AuthForm";
export default function SignupPage() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <AuthForm mode="signup" />
    </main>
  );
}
