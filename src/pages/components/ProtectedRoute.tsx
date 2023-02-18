import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../lib/AuthContext";

export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push("/login");
		}
	}, [router, user]);

	return <>{user ? children : null}</>;
}
