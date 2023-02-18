import React, { useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { useRouter } from "next/router";
import { usersRef } from "../lib/firebase";
import { getDocs, query, where, limit } from "firebase/firestore";

import { HomeIcon, CloudArrowDownIcon } from "@heroicons/react/24/outline";

const navigation = [
	{ name: "Home", icon: HomeIcon, href: "/", current: true },
	{
		name: "Receive",
		icon: CloudArrowDownIcon,
		href: "/receive",
		current: false,
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	const { user, logout } = useAuth();
	const router = useRouter();

	const getName = async () => {
		const q = query(usersRef, where("email", "==", user.email), limit(1));
		const docSnap = await getDocs(q);
		return docSnap.docs[0].data().name;
	};

	return (
		<div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white font-poppins w-64">
			<div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
				<div className="flex flex-shrink-0 items-center px-4">
					<img
						className="h-8 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="Your Company"
					/>
				</div>
				<nav
					className="mt-5 flex-1 space-y-1 bg-white px-2"
					aria-label="Sidebar"
				>
					{navigation.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className={classNames(
								item.current
									? "bg-gray-100 text-gray-900 hover:text-gray-900 hover:bg-gray-100"
									: "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
								"group flex items-center px-2 py-2 text-sm font-normal rounded-md"
							)}
						>
							<item.icon
								className={classNames(
									item.current
										? "text-gray-500"
										: "text-gray-400 group-hover:text-gray-500",
									"mr-3 flex-shrink-0 h-6 w-6"
								)}
								aria-hidden="true"
								onClick={() => {
									navigation.forEach((opt) => {
										if (opt.name !== item.name) {
											opt.current = false;
										}
									});
								}}
							/>
							<span className="flex-1">{item.name}</span>
						</a>
					))}
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
						<div>
							{/* <img
								className="inline-block h-9 w-9 rounded-full"
								src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
								alt=""
							/> */}
						</div>
						<div className="ml-3">
							<p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
								Hi, {/* {getName()} */}
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
