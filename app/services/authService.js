import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import {
  easContractAddress,
  profileSchemaUID,
  adminWallet,
  bundlerUrl,
  biconomyPaymasterKey,
  rpcUrl,
} from "./api";
import { ethers } from "ethers";
import { createSmartAccountClient } from "@biconomy/account";

export class AuthService {
  // create a user profile
  static async completeUserProfile(
    fullName,
    location,
    country,
    phoneNumber,
    emailAddress,
    userType,
    signer
  ) {
    const smartAccount = await createSmartAccountClient({
      signer: signer,
      bundlerUrl: bundlerUrl,
      biconomyPaymasterApiKey: biconomyPaymasterKey,
      rpcUrl: rpcUrl,
    });

    const address = await smartAccount.getAccountAddress();
    console.log("biconomy returned address:", address);

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

    const transaction = await eas.attest({
      schema: profileSchemaUID,
      data: {
        recipient: adminWallet,
        expirationTime: 0,
        revocable: true,
        data: encodedData,
      },
    });

    const newAttestationUID = await transaction.wait();
    console.log("New attestation UID:", newAttestationUID);
    return newAttestationUID;
  }

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
