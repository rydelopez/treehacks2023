import { useRouter } from "next/router";
import { useAuth } from "./lib/AuthContext";
import { useState } from "react";

export default function Login() {
	const router = useRouter();
	const { user, login } = useAuth();
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const handleLogin = async (e: any) => {
		e.preventDefault();
		try {
			await login(data.email, data.password);
			router.push("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 font-poppins">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form className="space-y-6" action="#" method="POST">
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700"
								>
									Email address
								</label>
								<div className="mt-1">
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-mainBlue focus:outline-none focus:ring-mainBlue sm:text-sm"
										onChange={(e) =>
											setData({ ...data, email: e.target.value })
										}
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700"
								>
									Password
								</label>
								<div className="mt-1">
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										required
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-mainBlue focus:outline-none focus:ring-mainBlue sm:text-sm"
										onChange={(e) =>
											setData({ ...data, password: e.target.value })
										}
									/>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="text-sm">
									<a
										href="/signup"
										className="font-medium text-mainBlue hover:text-darkBlue"
									>
										Create an Account
									</a>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="flex w-full justify-center rounded-md border border-transparent bg-mainBlue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-darkBlue focus:ring-offset-2"
									onClick={handleLogin}
								>
									Sign in
								</button>
							</div>
						</form>

						{/* <div className="mt-6">
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-gray-300" />
								</div>
								<div className="relative flex justify-center text-sm">
									<span className="bg-white px-2 text-gray-500">Or</span>
								</div>
							</div>

							<div className="mt-6">
								<button
									type="button"
									className="font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 w-full justify-center border border-gray-300 bg-white text-gray-500 shadow-sm hover:bg-gray-50"
								>
									<svg
										className="w-4 h-4 mr-2 -ml-1"
										aria-hidden="true"
										focusable="false"
										data-prefix="fab"
										data-icon="google"
										role="img"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 488 512"
									>
										<path
											fill="currentColor"
											d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
										></path>
									</svg>
									Sign in with Google
								</button>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
}
