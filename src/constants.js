export const contractAddress = "0x23AE4993aD9faCaB9A515A1918Db04f07bfc541D";
export const abi = [
	{
		inputs: [
			{
				internalType: "int256",
				name: "x",
				type: "int256",
			},
			{
				internalType: "int256",
				name: "y",
				type: "int256",
			},
		],
		name: "add",
		outputs: [
			{
				internalType: "int256",
				name: "",
				type: "int256",
			},
		],
		stateMutability: "pure",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "int256",
				name: "number",
				type: "int256",
			},
		],
		name: "addNumber",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "addingAddress",
				type: "address",
			},
		],
		name: "getAddressToAmountAdded",
		outputs: [
			{
				internalType: "int256[]",
				name: "",
				type: "int256[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getTotalContributers",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "viewTotal",
		outputs: [
			{
				internalType: "int256",
				name: "",
				type: "int256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];
