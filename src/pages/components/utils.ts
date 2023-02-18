import { AptosClient, TokenClient, AptosAccount } from "aptos";

/**
 * Reference:
 *
 * Aptos Devnet API Docs: https://fullnode.devnet.aptoslabs.com/v1/spec#/operations/get_account
 *
 */
const admin_address = "0x76c6703811ecfc91ca761600b782ae3cd1a9845c3ca940f14225a491d64213e7"

const hexString = "0xcdf5f74f8504b15f1b08209b1ba5c67fe12d2a11d613d984458d16f37ac43d0a"

var bytes = new Uint8Array(Math.ceil(hexString.length / 2));
for (var i = 0; i < bytes.length; i++) bytes[i] = parseInt(hexString.substr(i * 2, 2), 16);
const admin_pk = bytes;

const defaultNetworks = {
    nodeUrl: 'https://fullnode.devnet.aptoslabs.com'
}

function getAptosClient() {
    return new AptosClient(defaultNetworks.nodeUrl)
}

export async function getAccountResources(address) {
    const aptosClient = getAptosClient();
    const accountResources = await aptosClient.getAccountResources(address);
    return accountResources;
}

export function createToken(address, name, SerialNum, description, img) {
    const aptosClient = getAptosClient();
    const tokenClient = new TokenClient(getAptosClient());
    const adminAccount = new AptosAccount(admin_pk, admin_address);
    tokenClient.createCollection(adminAccount, name, description, img, 1);
    const hash = tokenClient.createToken(adminAccount, name, SerialNum, description, 1, img, 1);
}

export function sendToken(address, name, SerialNum, dest) {
	const tokenClient = new TokenClient(getAptosClient());
	tokenClient.offerToken(address, dest, admin_address, name, SerialNum, 1);
}
