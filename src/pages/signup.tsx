import { useAuth } from "./lib/AuthContext";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { usernamesRef, db } from "./lib/firebase";
import debounce from "lodash.debounce";
import { nanoid } from "nanoid";

export default function Signup() {
	const { user, signup } = useAuth();
	const [formValue, setFormValue] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);
	const batch = writeBatch(db);

	const router = useRouter();
	const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
	});

	useEffect(() => {
		checkUsername(formValue);
	}, [formValue]);

	const onChange = (e) => {
		// Force form value typed in form to match correct format
		const val = e.target.value.toLowerCase();
		const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

		// Only set form value if length is < 3 OR it passes regex
		if (val.length < 3) {
			setFormValue(val);
			setIsValid(false);
			setLoading(false);
		}

		if (re.test(val)) {
			setFormValue(val);
			setIsValid(false);
			setLoading(true);
		}
		setData({ ...data, name: e.target.value });
	};

	const checkUsername = useCallback(
		debounce(async (username) => {
			if (username.length >= 3) {
				const ref = doc(usernamesRef, username);
				const exists = (await getDoc(ref)).exists();
				setIsValid(!exists);
				setLoading(false);
			}
		}, 500),
		[]
	);

	const handleSignup = async (e: any) => {
		e.preventDefault();
		try {
			const uid = nanoid();
			batch.set(doc(db, "users", uid), {
				name: data.name,
				email: data.email,
				password: data.password,
			});
			batch.set(doc(db, "usernames", formValue), { uid });
			await batch.commit();
			await signup(data.email, data.password);
			router.push("/");
		} catch (err) {
			console.log(err);
		}
		console.log(data);
	};

	function UsernameMessage({ username, isValid, loading }) {
		if (loading) {
			return <p>Checking...</p>;
		} else if (isValid) {
			return <p className="">{username} is available!</p>;
		} else if (username.length < 3 && username.length > 0) {
			return <p className="">That username is too short!</p>;
		} else if (username && !isValid) {
			return <p className="">That username is taken!</p>;
		} else {
			return <p></p>;
		}
	}

	return (
		<>
			<div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 font-poppins">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					{/* <img
						className="mx-auto h-12 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="Your Company"
					/> */}
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
						Create your account
					</h2>
				</div>

				<div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form className="space-y-6" action="#" method="POST">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Full Name
								</label>
								<div className="mt-1">
									<input
										id="name"
										name="name"
										type="name"
										autoComplete="name"
										required
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-mainBlue focus:outline-none focus:ring-mainBlue sm:text-sm"
										onChange={(e) => setData({ ...data, name: e.target.value })}
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Username
								</label>
								<div className="mt-1">
									<input
										id="username"
										name="username"
										type="username"
										autoComplete="username"
										value={formValue}
										required
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-mainBlue focus:outline-none focus:ring-mainBlue sm:text-sm"
										onChange={onChange}
									/>
									<UsernameMessage
										username={formValue}
										isValid={isValid}
										loading={loading}
									/>
								</div>
							</div>

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

							<div>
								<button
									type="submit"
									className="flex w-full justify-center rounded-md border border-transparent bg-mainBlue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-darkBlue focus:ring-offset-2"
									onClick={handleSignup}
									disabled={!isValid}
								>
									Create Account
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
