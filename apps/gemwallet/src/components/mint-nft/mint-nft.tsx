import { Button, Flex, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ExampleFormState } from "./example.types"
import { MintNFTRequest, mintNFT } from "@gemwallet/api"
import { stringToHex } from "../../shared/helpers"

export const MintNft = () => {
  const { register, handleSubmit } = useForm<MintNFTRequest>()

  const submitHandler: SubmitHandler<ExampleFormState> = (values) => {
    const uri:string = values.URI != undefined ? stringToHex(values.URI) : "";
    const memoText: string = (document.getElementById('memo') as HTMLInputElement).value;
    const memoData: string = memoText != undefined ? stringToHex(memoText) : "";
    const payload = {
      URI: uri,
      flags: {
        tfOnlyXRP: true,
        tfTransferable: true
      },
      fee: "13",
      transferFee: 3000, // 3%,
      NFTokenTaxon: 0,
      memos: [
        {
          memo: {
            memoData: memoData
          }
        }
      ]
    };
    
    mintNFT(payload).then((response) => {
      console.log("NFT ID: ", response.result?.NFTokenID);
      console.log("Transaction Hash: ", response.result?.hash);
    });
  }

  return (
    <Stack spacing="6">
      <Text fontWeight="bold" fontSize="2xl">
        Mint NFT
      </Text>


      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack direction="column" spacing={8}>
          <FormControl id="uri" isRequired>
            <Stack direction={{ base: "column" }}>
              <FormLabel>URI</FormLabel>
              <Input {...register("URI")} />
            </Stack>
          </FormControl>

          <FormControl id="memo" isRequired>
            <Stack direction={{ base: "column" }}>
              <FormLabel>Memo</FormLabel>
              <Input  />
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
