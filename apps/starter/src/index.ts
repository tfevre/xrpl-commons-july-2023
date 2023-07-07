import { XummJsonTransaction } from "xumm-sdk/dist/src/types";
import { sendPayment } from "./transactions";
import { WALLET_1, WALLET_2 } from "./wallet";
// import { getClient } from "./xrpl-client";
import { getXummClient } from "./xumm-client";

const xummClient = getXummClient ();

const main2 = async () => {
  const payload:XummJsonTransaction = {
    TransactionType: "Payment",
    Destination: WALLET_2.address,
  }

  const response = await xummClient.payload.create(payload);

  console.log(response);
}

main2();

// const client = getClient();

// const main = async () => {
//   await client.connect();
//   console.log("Connected to XRPL");

//   await sendPayment(
//     {
//       Destination: WALLET_2.address,
//       Amount: "10"
//     },
//     {
//       wallet: WALLET_1
//     }
//   );
  
//   await client.disconnect();
// }

// main()
