import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { PATH_NAME } from "@/util/pathName";
import { login } from "@/services/UserService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

export default function LoginForm() {
	const navigate = useNavigate();
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const mutation = useMutation({
		mutationFn: login,
		onSuccess: (response) => {
			localStorage.setItem("accessToken", response?.data?.accessToken);
			navigate(PATH_NAME.DASHBOARD, { replace: true });
		},
		onError: (err) => {
			toast.error(`Error : ${err?.response?.data?.message}`);
		},
	});
	const handleLogin = (e: { stopPropagation: () => void }) => {
		e.stopPropagation();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		if (!email || !password) return toast.error("All fields are required!");
		mutation.mutate({ email, password });
	};
	return (
		<section className="flex justify-center items-center h-screen ">
			<Card className="mx-auto max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								ref={emailRef}
								id="email"
								type="email"
								placeholder="manish@example.com"
								required
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<Link
									to={""}
									className="ml-auto inline-block text-sm underline"
								>
									Forgot your password?
								</Link>
							</div>
							<Input ref={passwordRef} id="password" type="password" required />
						</div>
						<Button
							type="submit"
							className="w-full"
							onClick={handleLogin}
							disabled={mutation.isPending}
						>
							{mutation.isPending && <LoaderCircle className="animate-spin" />}{" "}
							<span className="ml-3">Login</span>
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link to={`/${PATH_NAME.SIGNUP}`} className="underline">
							Sign up
						</Link>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
