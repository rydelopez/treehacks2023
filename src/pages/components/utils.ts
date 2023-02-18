import { AptosClient, TokenClient, AptosAccount, HexString} from "aptos";
import { Wallet } from "@aptos-labs/wallet-adapter-core";

/**
 * Reference:
 *
 * Aptos Devnet API Docs: https://fullnode.devnet.aptoslabs.com/v1/spec#/operations/get_account
 *
 */
const admin_address = "0x76c6703811ecfc91ca761600b782ae3cd1a9845c3ca940f14225a491d64213e7"

const hexString = "0xcdf5f74f8504b15f1b08209b1ba5c67fe12d2a11d613d984458d16f37ac43d0a"

const admin_pk = new HexString("0xcdf5f74f8504b15f1b08209b1ba5c67fe12d2a11d613d984458d16f37ac43d0a").toUint8Array();


const aptosAccount = new AptosAccount()


const defaultNetworks = {
    nodeUrl: 'https://fullnode.testnet.aptoslabs.com'
}

function getAptosClient() {
    return new AptosClient(defaultNetworks.nodeUrl)
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
		await tokenClient.createCollection(adminAccount, SerialNum, description, img, 1), {checkSuccess: true},
	);
	console.log(
		"collection:" + tokenClient.getCollectionData(address, SerialNum)
	);

	const hash = await tokenClient.createToken(adminAccount, SerialNum, name, description, 1, img, 1);
	await aptosClient.waitForTransaction(
		hash, {checkSuccess: true},
	);
	console.log(
		"minting hash: " , hash
	);

	const offerHash = await tokenClient.offerToken(adminAccount, address, admin_address, SerialNum, name, 1);
	await aptosClient.waitForTransaction(
	offerHash, {checkSuccess: true},
	);

	console.log('offerHash ', offerHash)
	const collectionData = await tokenClient.getCollectionData(adminAccount.address(), SerialNum);
	console.log(`new collection: ${JSON.stringify(collectionData, null, 4)}`); 
	
}

export async function sendToken(address, name, SerialNum, dest) {
	const tokenClient = new TokenClient(getAptosClient());
	tokenClient.offerToken(address, dest, admin_address, SerialNum, name, 1);
}

const url = 'https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql'
const query = `
query MyQuery {
  current_token_ownerships(where: {
    owner_address: {
      _eq: "0x76c6703811ecfc91ca761600b782ae3cd1a9845c3ca940f14225a491d64213e7"
    },
    amount: {
      _gt: 0
    }
  }) {
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
`

// https://cloud.hasura.io/public/graphiql?endpoint=https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql
export async function getTokenData(address) {
	fetch(url, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  'Accept': 'application/json',
		},
		body: JSON.stringify({
		  query
		})
	  }).then(r => r.json()).then(data => { return data })
}

