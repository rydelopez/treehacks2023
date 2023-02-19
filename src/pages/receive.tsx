import Navbar from "./components/Navbar";
import { TokenContext } from "./lib/TokenContext";
import { useContext, useState } from "react";

export default function Receive() {
	const { account } = useContext(TokenContext);
	const [copied, setCopied] = useState(false);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(account?.address).then(
			() => {
				setCopied(true);
				setTimeout(() => {
					setCopied(false);
				}, 2000);
			},
			(err) => console.log(err)
		);
	};

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	return (
		<>
			<div className="flex flex-row gap-6 container h-screen">
				<div className="flex">
					<Navbar />
				</div>
				<div className="mx-auto max-w-2xl py-12 px-4 sm:px-6 lg:px-0 font-poppins">
					<h1 className="text-center text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
						Receive an NFT
					</h1>
					<p className="py-4">Your Address: {account?.address}</p>
					<button
						type="button"
						className={classNames(
							copied ? "bg-darkBlue" : "bg-mainBlue",
							"flex justify-center items-center mx-auto px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkBlue"
						)}
						onClick={copyToClipboard}
					>
						{copied ? "Copied" : "Copy to clipboard"}
					</button>
				</div>
			</div>
		</>
	);
}
