import { sendPayment, mintNft, createNftOffer, acceptNftOffer } from "./transactions";
import { WALLET_1, WALLET_2 } from "./wallet";
import { getClient } from "./xrpl-client";
import { NFTokenCreateOfferFlags  } from "xrpl";

const client = getClient();

const main = async () => {
  await client.connect();
  console.log("Connected to XRPL");

  // await sendPayment(
  //   {
  //     Destination: WALLET_2.address,
  //     Amount: "10"
  //   },
  //   {
  //     wallet: WALLET_1
  //   }
  // );

  // await mintNft(
  //   {
  //     URI: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWU2MmJ3NWxlMWg4bHc4cm40c29uYmpzcG0zMHI1aDdjbWd4ZW5tZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KzcamVeEJlaxCE4OAt/giphy.gif",
  //     NFTokenTaxon: 0,
  //   }, 
  //   {
  //     wallet: WALLET_1
  //   }
  // );

  // await createNftOffer(
  //   {
  //     Flags: NFTokenCreateOfferFlags.tfSellNFToken,
  //     NFTokenID: "0008000098A4A30A1B80B894F95D819ECC03991B47D50BDF16E5DA9C00000001",
  //     Amount: "10000000",
  //   },
  //   {
  //     wallet: WALLET_1
  //   }
  // );
  
  // await acceptNftOffer({
  //   NFTokenSellOffer: "D570C6B1176F4F7BED4CD7A254183C38DEA99BF4D94453E7E9DA45DB416B12B4",
  // },
  // {
  //   wallet: WALLET_2
  // })

  await client.disconnect();
}

main()
