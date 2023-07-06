import { sendPayment } from "./transactions";
import { WALLET_1, WALLET_2 } from "./wallet";
import { getClient } from "./xrpl-client";

const client = getClient();

const main = async () => {
  await client.connect();
  console.log("Connected to XRPL");

  await sendPayment(
    {
      Destination: WALLET_2.address,
      Amount: "10"
    },
    {
      wallet: WALLET_1
    }
  );
  
  await client.disconnect();
}

main()
