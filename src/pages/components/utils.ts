import { AptosClient, TokenClient, AptosAccount, HexString } from "aptos";
import { Wallet } from "@aptos-labs/wallet-adapter-core";

/**
 * Reference:
 *
 * Aptos Devnet API Docs: https://fullnode.devnet.aptoslabs.com/v1/spec#/operations/get_account
 *
 */
const admin_address =
	"0x76c6703811ecfc91ca761600b782ae3cd1a9845c3ca940f14225a491d64213e7";

const hexString =
	"0xcdf5f74f8504b15f1b08209b1ba5c67fe12d2a11d613d984458d16f37ac43d0a";

const admin_pk = new HexString(
	"0xcdf5f74f8504b15f1b08209b1ba5c67fe12d2a11d613d984458d16f37ac43d0a"
).toUint8Array();

const defaultNetworks = {
	nodeUrl: "https://fullnode.testnet.aptoslabs.com",
};

function getAptosClient() {
	return new AptosClient(defaultNetworks.nodeUrl);
}

export async function getAccountResources(address) {
	const aptosClient = getAptosClient();
	const accountResources = await aptosClient.getAccountResources(address);
	return accountResources;
}

export async function createToken(address, name, SerialNum, description, img) {
	const aptosClient = getAptosClient();
	const tokenClient = new TokenClient(getAptosClient());
	const adminAccount = new AptosAccount(admin_pk);
	await aptosClient.waitForTransaction(
		await tokenClient.createCollection(
			adminAccount,
			SerialNum,
			description,
			img,
			1
		),
		{ checkSuccess: true }
	);

	await aptosClient.waitForTransaction(
		await tokenClient.createToken(
			adminAccount,
			SerialNum,
			name,
			description,
			1,
			img,
			1
		),
		{ checkSuccess: true }
	);

	await aptosClient.waitForTransaction(
		await tokenClient.offerToken(
			adminAccount,
			address,
			admin_address,
			SerialNum,
			name,
			1
		),
		{ checkSuccess: true }
	);

	const collectionData = await tokenClient.getCollectionData(
		adminAccount.address(),
		SerialNum
	);
	console.log(`new collection: ${JSON.stringify(collectionData, null, 4)}`);
}

export async function sendToken(name, key, SerialNum, dest) {
	const tokenClient = new TokenClient(getAptosClient());
	const pk = new HexString(key).toUint8Array();
	const userAccount = new AptosAccount(pk);
	tokenClient.offerToken(userAccount, dest, admin_address, SerialNum, name, 1);
}

// https://cloud.hasura.io/public/graphiql?endpoint=https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql
/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function fetchGraphQL(operationsDoc, operationName, variables) {
	const result = await fetch(
		"https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql",
		{
			method: "POST",
			body: JSON.stringify({
				query: operationsDoc,
				variables: variables,
				operationName: operationName,
			}),
		}
	);

	return await result.json();
}

const operationsDoc = `
query MyQuery($address: String!) {
    current_token_ownerships(
      where: {owner_address: {_eq: $address}, amount: {_gt: "0"}, creator_address: {_eq: "0x76c6703811ecfc91ca761600b782ae3cd1a9845c3ca940f14225a491d64213e7"}}
    ) {
      name
      amount
      collection_name
      current_token_data {
        metadata_uri
        description
        name
      }
    }
  }
  `;

function fetchMyQuery(address) {
	return fetchGraphQL(operationsDoc, "MyQuery", { address: address });
}

export async function startFetchMyQuery(address) {
	const { errors, data } = await fetchMyQuery(address);

	if (errors) {
		// handle those errors like a pro
		console.error(errors);
	}

	// do something great with this precious data
	// console.log(data);
	return data;
}
