import { submitAndWait } from "xrpl/dist/npm/sugar";
import { TxnOptions } from "../models";
import { getClient } from "../xrpl-client"
import { NFTokenMint, convertStringToHex, NFTokenMintFlags, NFTokenCreateOffer, NFTokenAcceptOffer } from "xrpl";

const client = getClient();

type mintNftProps = Omit<NFTokenMint, "TransactionType" | "Account">;

export const mintNft = async ({URI, ...rest}: mintNftProps, {wallet}: TxnOptions) => {
    const nftMintTx: NFTokenMint = {
        ...rest,
        Flags: NFTokenMintFlags.tfTransferable,
        URI: convertStringToHex(URI ?? ''),
        TransactionType: "NFTokenMint",
        Account: wallet.address,
    }

    const prepared = await client.autofill(nftMintTx);

    const signed = wallet.sign(prepared);

    const response = await client.submitAndWait(signed.tx_blob);
    console.log(response);

    return response;
}


type CreateNftOfferProps = Omit<NFTokenCreateOffer, "TransactionType" | "Account">;

export const createNftOffer = async (props: CreateNftOfferProps, {wallet}: TxnOptions) => {
    const offerTx: NFTokenCreateOffer = {
        ...props,
        TransactionType: "NFTokenCreateOffer",
        Account: wallet.address,
    }

    const response = await client.submitAndWait(offerTx, {autofill:true, wallet});
    console.log(response);
    return response;
}


type AcceptOfferNftProps = Omit<NFTokenAcceptOffer, "TransactionType" | "Account">;

export const acceptNftOffer = async (props: AcceptOfferNftProps, {wallet}: TxnOptions) => {
    const acceptOfferTx: NFTokenAcceptOffer = {
        ...props,
        TransactionType: "NFTokenAcceptOffer",
        Account: wallet.address,
    }

    const response = await client.submitAndWait(acceptOfferTx, {autofill:true, wallet});
    console.log(response);
    return response;
}