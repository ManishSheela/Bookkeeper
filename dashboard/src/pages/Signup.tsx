import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { register } from "@/services/UserService";
import toast from "react-hot-toast";

export default function LoginForm() {
	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const navigate = useNavigate();
	const mutation = useMutation({
		mutationFn: register,
		onSuccess: (response) => {
			localStorage.setItem("accessToken", response?.data?.accessToken);
			navigate(PATH_NAME.DASHBOARD, { replace: true });
		},
		onError: (err) => {
			toast.error(`Error : ${err?.response?.data?.message}`);
		},
	});

	const handleRegister = (e) => {
		e.stopPropagation();
		const name = nameRef.current.value;
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		if (!email || !password || !name)
			return toast.error("all fields are required!");
		mutation.mutate({ name, email, password });
	};
	return (
		<section className="flex justify-center items-center h-screen ">
			<Card className="mx-auto max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Sign Up</CardTitle>
					<CardDescription>
						Enter your information to create an account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="first-name">First name</Label>
							<Input
								ref={nameRef}
								id="first-name"
								placeholder="Manish"
								required
							/>
						</div>

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
							<Label htmlFor="password">Password</Label>
							<Input ref={passwordRef} id="password" type="password" />
						</div>
						<Button type="submit" className="w-full" onClick={handleRegister}>
							Create an account
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link to={`/${PATH_NAME.LOGIN}`} className="underline">
							Login
						</Link>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
