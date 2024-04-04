// api resources
import { Client, Databases, Account, ID, Query } from "appwrite";
import { abi } from "./abi";
export const easContractABI = abi;
export const appID = process.env.NEXT_PUBLIC_PRIVY_AUTH;
export const easContractAddress = process.env.NEXT_PUBLIC_EAS_CONTRACT;
export const profileSchemaUID = process.env.NEXT_PUBLIC_PROFILE_SCHEMA_UID;
export const adminWallet = process.env.NEXT_PUBLIC_WALLET_RECIPIENT;
export const proposalSchemaUID = process.env.NEXT_PUBLIC_PROPOSAL_SCHEMA_UID;
export const bundlerUrl = process.env.NEXT_PUBLIC_BUNDLER_URL;
export const biconomyPaymasterKey =
  process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_API_KEY;
export const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
export const biconomyPrivateKey = process.env.NEXT_PUBLIC_BICONOMY_PRIVATE_KEY;
export const appwriteDB = process.env.NEXT_PUBLIC_IMPACT_VOICE_DB;
export const usersCollection =
  process.env.NEXT_PUBLIC_IMPACT_VOICE_USERS_COLLECTION;
export const proposalsCollection =
  process.env.NEXT_PUBLIC_IMPACT_PROPOSALS_COLLECTION;

const appwriteProject = process.env.NEXT_PUBLIC_APPWRITE_ID;

const baseUrl = "https://cloud.appwrite.io/v1";

const client = new Client();
client.setEndpoint(baseUrl).setProject(appwriteProject);

export const accountClient = new Account(client);
export const databasesClient = new Databases(client);
export const generateID = ID.unique();
export const queryParam = Query;
