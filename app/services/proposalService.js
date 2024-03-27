import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { easContractAddress, schemaUID, adminWallet } from "./api";
import { ethers } from "ethers";

export class AuthService {
  // create a proposal
  static async createNewProposal(
    fullName,
    location,
    country,
    phoneNumber,
    emailAddress,
    userType,
    signer
  ) {
    const eas = new EAS(easContractAddress);
    await eas.connect(signer);

    const proposalSchemaEncoder = new SchemaEncoder(
      "string title,string summary,string problem,string solution,string specifications,string[] steps,string[] collaborators,string[] timeline,string[] milestones,string budget,string projectLocation,string creator,string wholePropsal"
    );
    const encodedData = proposalSchemaEncoder.encodeData([
      { name: "title", value: "", type: "string" },
      { name: "summary", value: "", type: "string" },
      { name: "problem", value: "", type: "string" },
      { name: "solution", value: "", type: "string" },
      { name: "specifications", value: "", type: "string" },
      { name: "steps", value: [], type: "string[]" },
      { name: "collaborators", value: [], type: "string[]" },
      { name: "timeline", value: [], type: "string[]" },
      { name: "milestones", value: [], type: "string[]" },
      { name: "budget", value: "", type: "string" },
      { name: "projectLocation", value: "", type: "string" },
      { name: "creator", value: "", type: "string" },
      { name: "wholePropsal", value: "", type: "string" },
    ]);

    const transaction = await eas.attest({
      schema: schemaUID,
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

  static async getUserProfile(provider) {
    const eas = new EAS(easContractAddress);
    eas.connect(provider);

    const uid =
      "0x6087a10499e143e6b85985cd2364e82ba8751ec54e808d7489529a9a2b68f066";

    const attestation = await eas.getAttestation(uid);

    console.log("fetched attestation:", attestation);

    const encodedData = attestation.data;

    const types = ["string", "string", "string", "uint64", "string", "string"];

    const abiCoder = await ethers.AbiCoder.defaultAbiCoder();

    // Decode the data
    const decodedData = abiCoder.decode(types, encodedData);

    console.log("decoded data:", decodedData);

    return decodedData;
  }
}
