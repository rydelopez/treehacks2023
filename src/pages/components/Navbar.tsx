import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../lib/AuthContext";
import { useRouter } from "next/router";
import { usersRef } from "../lib/firebase";
import { getDocs, query, where, limit } from "firebase/firestore";
import Image from "next/image";
import { TokenContext } from "../lib/TokenContext";

import {
	HomeIcon,
	CloudArrowDownIcon,
	Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

const logo = require("../../../public/APTOSCERT.png");

const navigation = [
	{ name: "Home", icon: HomeIcon, href: "/" },
	{
		name: "Receive",
		icon: CloudArrowDownIcon,
		href: "/receive",
	},
	{
		name: "Create",
		icon: Square3Stack3DIcon,
		href: "/create",
	}
];

export default function Navbar() {
	const { user, logout } = useAuth();
	const router = useRouter();
	const [name, setName] = useState("");
	// const [loading, setLoading] = useState(true);
	const { account } = useContext(TokenContext);

	const getName = async () => {
		const q = query(usersRef, where("email", "==", user.email), limit(1));
		const docSnap = await getDocs(q);
		return docSnap.docs[0].data().name;
	};

	useEffect(() => {
		getName().then((name) => {
			setName(name);
		});
		// if (
		// 	account?.address ===
		// 	"0x76c6703811ecfc91ca761600b782ae3cd1a9845c3ca940f14225a491d64213e7"
		// ) {
		// 	navigation[2] = {
		// 		name: "Create",
		// 		icon: Square3Stack3DIcon,
		// 		href: "/create",
		// 	};
		// }
		// setLoading(false);
	}, []);

	// useEffect(() => {
	// 	console.log(loading);
	// }, [loading]);

	return (
		<div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white font-poppins w-64">
			<div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
				<div className="flex flex-shrink-0 items-center px-4">
					<Image src={logo} alt="Aptoscert" className="h-16 w-auto" />
				</div>
				<nav
					className="mt-5 flex-1 space-y-1 bg-white px-2"
					aria-label="Sidebar"
				>
					{navigation.map((item) => (
							<a
								key={item.name}
								href={item.href}
								className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-normal rounded-md"
							>
								<item.icon
									className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
									aria-hidden="true"
								/>
								<span className="flex-1">{item.name}</span>
							</a>
						))}
					<div className="px-2 py-2">
						<WalletSelector />
					</div>
					<a
						className="group flex items-center px-2 py-2 text-sm font-normal text-mainBlack hover:text-mainBlue cursor-pointer"
						onClick={() => {
							logout();
							router.push("/login");
						}}
					>
						<span className="truncate">Log out</span>
					</a>
				</nav>
			</div>
			<div className="flex flex-shrink-0 border-t border-gray-200 p-4">
				<a href="#" className="group block w-full flex-shrink-0">
					<div className="flex items-center">
						<div className="ml-3">
							<p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
								Hi, {name}
							</p>
							<p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
								View profile
							</p>
						</div>
					</div>
				</a>
			</div>
		</div>
	);
}
