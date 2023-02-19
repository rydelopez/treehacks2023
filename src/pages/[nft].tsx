import { useEffect, useState, useContext, Fragment } from "react";
import Navbar from "./components/Navbar";
import { useRouter } from "next/router";
import { TokenContext } from "./lib/TokenContext";
import { sendToken } from "./components/utils";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Send() {
	const router = useRouter();
	const { nft } = router.query;
	const { tokenData } = useContext(TokenContext);
	const [name, setName] = useState("");
	const [serialNum, setSerialNum] = useState("");
	const [destination, setDestination] = useState("");
	const [pk, setPk] = useState("");
	const [show, setShow] = useState(false);

	useEffect(() => {
		tokenData &&
			tokenData.map((obj: any) => {
				if (obj.collection_name === nft) {
					setName(obj.current_token_data.name);
					setSerialNum(obj.collection_name);
				}
			});
	}, [tokenData]);

	const handleSendToken = async (e: any) => {
		e.preventDefault();
		sendToken(name, pk, serialNum, destination);
		setShow(true);
		router.push("/");
	};

	return (
		<>
			<div className="flex flex-row gap-6 container h-screen font-poppins">
				<div className="flex">
					<Navbar />
				</div>
				<div className="mt-12 justify-center mx-auto">
					<section aria-labelledby="cart-heading">
						{tokenData &&
							tokenData.map(
								(obj: any) =>
									obj.collection_name === nft && (
										<div className="flex py-6">
											<div className="flex-shrink-0">
												<img
													src={obj.current_token_data.metadata_uri}
													className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
												/>
											</div>

											<div className="ml-4 flex flex-1 flex-col sm:ml-6">
												<div>
													<div className="flex justify-between">
														<h4 className="text-sm font-medium text-gray-700 hover:text-gray-800">
															{name}
														</h4>
													</div>
													<p className="mt-1 text-sm text-gray-500">
														Serial No: {serialNum}
													</p>
													<p className="mt-1 text-sm text-gray-500">
														Description: {obj.current_token_data.description}
													</p>
												</div>
											</div>
										</div>
									)
							)}
						<form method="post" onSubmit={handleSendToken}>
							<label className="-mt-px bg-white px-2 text-xs font-normal text-gray-900">
								Address to send to:
								<input
									name="dest"
									className="block w-full border-1 p-2 text-gray-900 border-2 rounded-lg focus:ring-0 sm:text-sm"
									value={destination}
									onChange={(e) => setDestination(e.target.value)}
								/>
							</label>
							<label className="-mt-px bg-white px-2 text-xs font-normal text-gray-900">
								Your private key:
								<input
									name="dest"
									className="block w-full border-1 p-2 text-gray-900 border-2 rounded-lg focus:ring-0 sm:text-sm"
									value={pk}
									onChange={(e) => setPk(e.target.value)}
								/>
							</label>
							<button
								type="submit"
								className="inline-flex items-center px-4 py-2 mt-4 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-mainBlue hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainBlue"
							>
								Send
							</button>
						</form>
					</section>
				</div>
			</div>
			<div
				aria-live="assertive"
				className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
			>
				<div className="flex w-full flex-col items-center space-y-4 sm:items-end">
					<Transition
						show={show}
						as={Fragment}
						enter="transform ease-out duration-300 transition"
						enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
						enterTo="translate-y-0 opacity-100 sm:translate-x-0"
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
							<div className="p-4 font-poppins">
								<div className="flex items-start">
									<div className="flex-shrink-0">
										<CheckCircleIcon
											className="h-6 w-6 text-green-400"
											aria-hidden="true"
										/>
									</div>
									<div className="ml-3 w-0 flex-1 pt-0.5">
										<p className="text-sm font-medium text-gray-900">
											Successfully sent!
										</p>
									</div>
									<div className="ml-4 flex flex-shrink-0">
										<button
											type="button"
											className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
											onClick={() => {
												setShow(false);
											}}
										>
											<span className="sr-only">Close</span>
											<XMarkIcon className="h-5 w-5" aria-hidden="true" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</>
	);
}
