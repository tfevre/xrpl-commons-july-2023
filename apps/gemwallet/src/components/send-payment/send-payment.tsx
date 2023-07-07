import { Button, Flex, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ExampleFormState } from "./example.types"
import { SendPaymentRequest, sendPayment } from "@gemwallet/api"

export const SendPayment = () => {
  // Hint, use SendPaymentRequest from "@gemwallet/api" to define the form state
  const { register, handleSubmit } = useForm<SendPaymentRequest>()

  const submitHandler: SubmitHandler<ExampleFormState> = (values) => {
    const payment = {
      amount: values.amount, // In drops (1 XRP)
      destination: values.destination,
    };
    sendPayment(payment).then((response) => {
      console.log("Transaction Hash: ", response.result?.hash);
    });
  }

  return (
    <Stack spacing="6">
      <Text fontWeight="bold" fontSize="2xl">
        Send Payments
      </Text>


      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack direction="column" spacing={8}>
          <FormControl id="recipient" isRequired>
            <Stack direction={{ base: "column" }}>
              <FormLabel>Recipient</FormLabel>
              <Input {...register("destination")} />
            </Stack>
          </FormControl>

          <FormControl id="amount" isRequired>
            <Stack direction={{ base: "column" }}>
              <FormLabel>Amount</FormLabel>
              <Input {...register("amount")} />
            </Stack>
          </FormControl>
        </Stack>

        <Flex direction="row-reverse">
          <Button backgroundColor="cyan.100" mt="8" type="submit">
            Submit
          </Button>
        </Flex>
      </form>
    </Stack>
  )
}
