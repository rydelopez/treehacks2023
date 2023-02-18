import Navbar from "./components/Navbar";

export default function Receive() {
	return (
		<>
			<div className="flex flex-row gap-6 container h-screen">
				<div className="flex">
					<Navbar />
				</div>
				<div>
					<h1>Receive Token</h1>
				</div>
			</div>
		</>
	);
}
