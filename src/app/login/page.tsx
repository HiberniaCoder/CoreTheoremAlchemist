
import { login } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrainCircuit, ChromeIcon } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage({ searchParams }: { searchParams: { message: string } }) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  const handleGoogleLogin = async () => {
    "use server"
    const supabase = createClient();
    const origin = process.env.NODE_ENV === 'production' 
      ? 'https://your-production-url.com' // IMPORTANT: Replace with your production URL
      : 'http://localhost:9002'; // Make sure this matches your local dev port

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect('/login?message=Could not authenticate with Google');
    }
    
    return redirect(data.url);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <BrainCircuit className="h-8 w-8 text-primary" />
          <span className="font-bold font-headline text-2xl">
            ClarityBoard
          </span>
        </div>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Sign in to access your dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              required
            />
          </div>
          {searchParams.message && <p className="text-destructive text-sm">{searchParams.message}</p>}
          <Button formAction={login} className="w-full">
            Sign In
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <form>
          <Button variant="outline" className="w-full" formAction={handleGoogleLogin}>
            <ChromeIcon className="mr-2 h-4 w-4" />
            Google
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
