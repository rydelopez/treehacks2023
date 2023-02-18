import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";

export default function App({ Component, pageProps }: AppProps) {
	const wallets = [new PetraWallet()];

	return (
		<AptosWalletAdapterProvider autoConnect plugins={wallets}>
			<Component {...pageProps} />;
		</AptosWalletAdapterProvider>
	);
}
