import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import {
  easContractAddress,
  profileSchemaUID,
  adminWallet,
  bundlerUrl,
  biconomyPaymasterKey,
  biconomyPrivateKey,
  easContractABI,
  rpcUrl,
  databasesClient,
  generateID,
  appwriteDB,
  usersCollection,
  accountClient,
  queryParam,
} from "./api";
import { ethers } from "ethers";
import { createSmartAccountClient } from "@biconomy/account";

export class AuthService {
  // create user profile on appwrite
  static async createAppwriteAccount(emailAddress, password, fullName) {
    const response = await accountClient.create(
      generateID,
      emailAddress,
      password,
      fullName
    );
    return response;
  }

  // login user with appwrite
  static async loginAppwriteAccount(emailAddress, password) {
    const response = accountClient.createEmailPasswordSession(
      emailAddress,
      password
    );

    return response;
  }

  // confirm logged in user
  static async confirmAppwriteAuth() {
    const response = await accountClient.get();
    return response;
  }

  // list all users
  static async listUsers() {
    const response = await databasesClient.listDocuments(
      appwriteDB,
      usersCollection
      // queryParam.limit(99)
    );
    return response;
  }

  // send profile attestation to appwrite
  static async signUp(
    fullName,
    location,
    country,
    phoneNumber,
    emailAddress,
    userType,
    profileAttestationUID
  ) {
    const response = await databasesClient.createDocument(
      appwriteDB,
      usersCollection,
      generateID,
      {
        fullName,
        location,
        country,
        phoneNumber,
        emailAddress,
        userType,
        profileAttestationUID,
      }
    );
    return response;
  }

  // get profile attestation from appwrite
  static async findUser(emailAddress) {
    const response = await databasesClient.listDocuments(
      appwriteDB,
      usersCollection,
      [queryParam.equal("emailAddress", emailAddress)]
    );

    return response;
  }

  // logout appwrite
  static async appwriteLogout() {
    const response = await accountClient.deleteSessions();
    return response;
  }

  // create a user profile on EAS
  static async completeUserProfile(
    fullName,
    location,
    country,
    phoneNumber,
    emailAddress,
    userType,
    signer,
    provider
  ) {
    const config = {
      privateKey: biconomyPrivateKey,
      biconomyPaymasterApiKey: biconomyPaymasterKey,
      bundlerUrl: bundlerUrl,
      rpcUrl: rpcUrl,
    };

    // let provider = new ethers.JsonRpcProvider(rpcUrl);
    // let signer = new ethers.Wallet(config.privateKey, provider);

    const smartAccount = await createSmartAccountClient({
      signer: signer,
      chainId: 10,
      bundlerUrl: bundlerUrl,
      biconomyPaymasterApiKey: biconomyPaymasterKey,
      rpcUrl: rpcUrl,
    });

    const smartWallet = await createSmartAccountClient({
      signer,
      biconomyPaymasterApiKey: config.biconomyPaymasterApiKey,
      bundlerUrl: config.bundlerUrl,
    });

    const eas = new EAS(easContractAddress);
    await eas.connect(signer);

    const profileSchemaEncoder = new SchemaEncoder(
      "string fullName,string location,string country,uint64 phoneNumber,string emailAddress,string userType"
    );

    const encodedData = profileSchemaEncoder.encodeData([
      { name: "fullName", value: fullName, type: "string" },
      { name: "location", value: location, type: "string" },
      { name: "country", value: country, type: "string" },
      { name: "phoneNumber", value: phoneNumber, type: "uint64" },
      { name: "emailAddress", value: emailAddress, type: "string" },
      { name: "userType", value: userType, type: "string" },
    ]);

    // const transaction = await eas.attest({
    //   schema: profileSchemaUID,
    //   data: {
    //     recipient: adminWallet,
    //     expirationTime: 0,
    //     revocable: true,
    //     data: encodedData,
    //   },
    // });

    // const receipt = await transaction.tx.getTransaction();
    // // const receipt = await transaction.wait();
    // console.log("transaction:", receipt.data);

    const contractInstance = new ethers.Contract(
      easContractAddress,
      easContractABI,
      provider
    );

    const tx = await contractInstance.attest.populateTransaction({
      schema: profileSchemaUID,
      data: {
        recipient: adminWallet,
        expirationTime: 0,
        revocable: true,
        data: encodedData,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        value: 0,
      },
    });

    const txObj = {
      to: easContractAddress,
      data: tx.data,
    };

    const userOpResponse = await smartWallet.sendTransaction(txObj, {
      paymasterServiceData: { mode: "SPONSORED" },
    });

    // const { transactionHash } = await userOpResponse.waitForTxHash();
    // console.log("Transaction Hash", transactionHash);

    const userOpReceipt = await userOpResponse.wait();

    let uid; // attestation UID

    if (userOpReceipt.success == "true") {
      console.log("userOp", userOpReceipt);

      uid = userOpReceipt.receipt.logs[1].data;

      console.log("uid:", uid);
    }

    return uid;
  }

  // get user profile from EAS
  static async getUserProfile(provider, attestationUID) {
    const eas = new EAS(easContractAddress);
    eas.connect(provider);

    const attestation = await eas.getAttestation(attestationUID);

    console.log("fetched attestation:", attestation);

    const encodedData = attestation.data;

    const types = ["string", "string", "string", "uint64", "string", "string"];

    const abiCoder = await ethers.AbiCoder.defaultAbiCoder();

    const decodedData = abiCoder.decode(types, encodedData);

    console.log("decoded data:", decodedData);

    return decodedData;
  }
}
