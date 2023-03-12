import { useEffect, useState, useContext, Fragment } from "react";
import Navbar from "./components/Navbar";
import { useRouter } from "next/router";
import { TokenContext } from "./lib/TokenContext";
import { createToken } from "./components/utils";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Create() {
	const router = useRouter();
	const { nft } = router.query;
	const { account, tokenData } = useContext(TokenContext);
	const [name, setName] = useState("");
	const [serialNum, setSerialNum] = useState("");
	const [image, setImage] = useState("");
	const [pk, setPk] = useState("");
	const [description, setDescription] = useState("");
	const [show, setShow] = useState(false);

	// useEffect(() => {
	// 	if (
	// 		account?.address !==
	// 		"0x76c6703811ecfc91ca761600b782ae3cd1a9845c3ca940f14225a491d64213e7"
	// 	) {
	// 		router.push("/");
	// 	}
	// }, []);

	useEffect(() => {
		tokenData &&
			tokenData.map((obj: any) => {
				if (obj.collection_name === nft) {
					setName(obj.current_token_data.name);
					setSerialNum(obj.collection_name);
				}
			});
	}, [tokenData]);

	const handleCreateToken = async (e: any) => {
		e.preventDefault();
		createToken(pk, name, serialNum, description, image);
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
					<h1 className="text-center text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl py-4">
						Create an NFT
					</h1>
					<section aria-labelledby="cart-heading">
						<form method="post" onSubmit={handleCreateToken}>
							<label className="-mt-px bg-white px-2 text-xs font-normal text-gray-900">
								Name of item:
								<input
									name="dest"
									className="block w-full border-1 p-2 text-gray-900 border-2 rounded-lg focus:ring-0 sm:text-sm"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</label>
							<label className="-mt-px bg-white px-2 text-xs font-normal text-gray-900">
								Serial Number:
								<input
									name="dest"
									className="block w-full border-1 p-2 text-gray-900 border-2 rounded-lg focus:ring-0 sm:text-sm"
									value={serialNum}
									onChange={(e) => setSerialNum(e.target.value)}
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
							<label className="-mt-px bg-white px-2 text-xs font-normal text-gray-900">
								Description:
								<input
									name="dest"
									className="block w-full border-1 p-2 text-gray-900 border-2 rounded-lg focus:ring-0 sm:text-sm"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</label>
							<label className="-mt-px bg-white px-2 text-xs font-normal text-gray-900">
								Image:
								<input
									name="dest"
									className="block w-full border-1 p-2 text-gray-900 border-2 rounded-lg focus:ring-0 sm:text-sm"
									value={image}
									onChange={(e) => setImage(e.target.value)}
								/>
							</label>
							<button
								type="submit"
								className="inline-flex items-center px-4 py-2 mt-4 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-mainBlue hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainBlue"
							>
								Create
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
											Successfully created!
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
