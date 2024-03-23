import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { easContractAddress, schemaUID, adminWallet } from "./api";

export class AuthService {
  // create a user profile
  static async completeUserProfile(
    givenName,
    familyName,
    location,
    lga,
    phone,
    email,
    signature
  ) {
    const eas = new EAS(easContractAddress);
    await eas.connect(signature); //TODO: prompt the user wallet connection probably at login page or here. This makes signer available for use. If we are prompting here, we make another static method for it, then we call it inside completeUserProfile() and await its result before proceeding to use the signer.

    const profileSchemaEncoder = new SchemaEncoder(
      "string GivenName,string FamilyName,string Location,string LocalGovernment,uint32 PhoneNumber,string Email"
    );

    const encodedData = profileSchemaEncoder.encodeData([
      { name: "GivenName", value: givenName, type: "string" },
      { name: "FamilyName", value: familyName, type: "string" },
      { name: "Location", value: location, type: "string" },
      { name: "LocalGovernment", value: lga, type: "string" },
      { name: "PhoneNumber", value: phone, type: "uint32" },
      { name: "Email", value: email, type: "string" },
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
  }
}
