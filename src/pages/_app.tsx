import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AuthContextProvider } from "./lib/AuthContext";
import { useRouter } from "next/router";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App({ Component, pageProps }: AppProps) {
	const wallets = [new PetraWallet()];
	const noAuthRequired = ["/login", "/signup"];
	const router = useRouter();

	return (
		<AuthContextProvider>
			<AptosWalletAdapterProvider autoConnect plugins={wallets}>
				{noAuthRequired.includes(router.pathname) ? (
					<Component {...pageProps} />
				) : (
					<ProtectedRoute>
						<Component {...pageProps} />
					</ProtectedRoute>
				)}
			</AptosWalletAdapterProvider>
		</AuthContextProvider>
	);
}
