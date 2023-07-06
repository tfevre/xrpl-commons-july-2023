import { getClient } from "../xrpl-client";
import { TxnOptions } from "../models";
import { Payment } from "xrpl";

const client = getClient();

type PaymentProps = Omit<Payment, "TransactionType" | "Account">;

export const sendPayment = async (props: PaymentProps, { wallet } : TxnOptions ) => {
    const payment: Payment = {
        ...props,
        TransactionType: "Payment",
        Account: wallet.address,
    }

    const prepared = await client.autofill(payment) 

    const signed = wallet.sign(prepared);

    const response = await client.submitAndWait(signed.tx_blob);
    console.log(response);
    return response;
}
