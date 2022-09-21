import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "./constants.js";
import { Circles } from "react-loader-spinner";

function App() {
	const [haveMetamask, sethaveMetamask] = useState(true);
	const [accountAddress, setAccountAddress] = useState("");
	const [accountBalance, setAccountBalance] = useState("");
	const [isConnected, setIsConnected] = useState(false);
	const [decimals, setDecimals] = useState(9);
	const [total, setTotal] = useState(0);
	const [totalContributers, setTotalContributers] = useState(0);
	const [number, setNumber] = useState(0);
	const [loading, setLoading] = useState(false);

	const { ethereum } = window;
	const provider = new ethers.providers.Web3Provider(window.ethereum);

	useEffect(() => {
		const { ethereum } = window;
		const checkMetamaskAvailability = async () => {
			if (!ethereum) {
				sethaveMetamask(false);
			}
			sethaveMetamask(true);
		};
		checkMetamaskAvailability();
	}, []);

	async function getDecimal() {
		if (typeof window.ethereum !== "undefined") {
			const signer = provider.getSigner();
			const contract = new ethers.Contract(contractAddress, abi, signer);
			try {
				const dec = await contract.decimals();
				console.log(dec, "dec");
				setDecimals(dec);
			} catch (error) {
				console.log(error);
			}
		} else {
			alert("Please install MetaMask");
		}
	}

	async function getTotal() {
		if (typeof window.ethereum !== "undefined") {
			const signer = provider.getSigner();
			const contract = new ethers.Contract(contractAddress, abi, signer);
			try {
				const total = await contract.viewTotal();
				console.log(total / 10 ** decimals, "total");
				setTotal(total / 10 ** decimals);
			} catch (error) {
				console.log(error);
			}
		} else {
			alert("Please install MetaMask");
		}
	}

	async function getTotalContributors() {
		if (typeof window.ethereum !== "undefined") {
			const signer = provider.getSigner();
			const contract = new ethers.Contract(contractAddress, abi, signer);
			try {
				const total = await contract.getTotalContributers();
				console.log(parseInt(total), "total");
				setTotalContributers(parseInt(total));
			} catch (error) {
				console.log(error);
			}
		} else {
			alert("Please install MetaMask");
		}
	}

	const connectWallet = async () => {
		try {
			if (!ethereum) {
				sethaveMetamask(false);
			}
			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});
			let balance = await provider.getBalance(accounts[0]);
			let bal = ethers.utils.formatEther(balance);
			setAccountAddress(accounts[0]);
			setAccountBalance(bal);
			setIsConnected(true);
			getDecimal();
			getTotal();
			getTotalContributors();
		} catch (error) {
			setIsConnected(false);
		}
	};

	const submitFunction = async () => {
		console.log("submit function called", number * 10 ** decimals);
		// setNumber(0);

		if (typeof window.ethereum !== "undefined") {
			const signer = provider.getSigner();
			const contract = new ethers.Contract(contractAddress, abi, signer);
			setLoading(true);
			try {
				const transactionResponse = await contract.addNumber(
					number * 10 ** decimals
				);
				console.log(transactionResponse);
				await listenForTransactionMine(transactionResponse, provider);
				setLoading(false);
				setNumber(0);
				getTotal();
				getTotalContributors();
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		} else {
			alert("Please install MetaMask");
		}
	};

	function listenForTransactionMine(transactionResponse, provider) {
		console.log(`Mining ${transactionResponse.hash}`);
		return new Promise((resolve, reject) => {
			provider.once(transactionResponse.hash, (transactionReceipt) => {
				console.log(
					`Completed with ${transactionReceipt.confirmations} confirmations. `
				);
				resolve();
			});
		});
	}

	return (
		<div className="App">
			<header className="App-header">
				{haveMetamask ? (
					<div className="App-header">
						{isConnected ? (
							<>
								<div className="card">
									<div className="card-row">
										<h3>Wallet Address:</h3>
										<p>
											{accountAddress.slice(0, 4)}...
											{accountAddress.slice(38, 42)}
										</p>
									</div>
									<div className="card-row">
										<h3>Total Till Now:</h3>
										<p>{total}</p>
									</div>
									<div className="card-row">
										<h3>Total Contributers:</h3>
										<p>{totalContributers}</p>
									</div>
								</div>
								{loading ? (
									<>
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<p className="loader">Minting Transaction</p>
											<Circles
												height="80"
												width="80"
												color="#4fa94d"
												ariaLabel="circles-loading"
												wrapperStyle={{}}
												wrapperClass=""
												visible={true}
											/>
										</div>
									</>
								) : (
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											justifyContent: "center",
											width: 500,
											height: 300,
										}}
									>
										<input
											style={{ width: "70%", height: " 15%" }}
											value={number}
											onChange={(e) => {
												setNumber(e.target.value);
											}}
											type="number"
										/>

										<button
											style={{ marginTop: 20 }}
											className="btn"
											onClick={submitFunction}
										>
											Submit
										</button>
									</div>
								)}
							</>
						) : (
							<div style={{ margin: 20 }} className="loader">
								Please
							</div>
						)}
						{isConnected ? (
							<>
								<p className="info">🎉 Connected Successfully</p>
							</>
						) : (
							<button className="btn" onClick={connectWallet}>
								Connect
							</button>
						)}
					</div>
				) : (
					<p>Please Install MataMask</p>
				)}
			</header>
		</div>
	);
}

export default App;
