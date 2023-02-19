import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AuthContextProvider } from "./lib/AuthContext";
import { useRouter } from "next/router";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import { TokenContext } from "./lib/TokenContext";
import { startFetchMyQuery } from "./components/utils";

declare global {
	interface Window {
		MyNamespace: any;
	}
}

export default function App({ Component, pageProps }: AppProps) {
	const wallets = [new PetraWallet()];
	const noAuthRequired = ["/login", "/signup"];
	const router = useRouter();
	const [account, setAccount] = useState<any>(undefined);
	const [tokenData, setTokenData] = useState<any>([]);

	useEffect(() => {
		if (typeof window !== undefined) {
			// @ts-ignore
			window.aptos.account().then((data) => setAccount(data));
		}
	}, []);

	useEffect(() => {
		const data = startFetchMyQuery(account?.address).then(
			(obj) => (console.log(obj), setTokenData(obj?.current_token_ownerships))
		);
		// console.log("tokendata");
		// console.log(tokenData);
	}, [account]);

	return (
		<TokenContext.Provider value={{ account, tokenData }}>
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
		</TokenContext.Provider>
	);
}
