import {
  ThirdwebProvider,
  ConnectWallet,
  useContract,
  useTransferToken,
  useAddress,
} from "@thirdweb-dev/react";
import usdt_abi from "./polygon_usdt.json";

export default function Home() {
  return (
    <ThirdwebProvider
      activeChain="polygon"
      clientId="0c3521ff85a823c6ce64eeb40ca30940" // should be in .env yes >.<
    >
      <Content />
    </ThirdwebProvider>
  );
}

const USDT_POLYGON_ADDR = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f";
const test_recipient = "0xdbe83c0d3fb9c8215ae309dc9a4fc176a099a1ca";

const Content = () => {
  const address = useAddress();
  const { contract } = useContract(USDT_POLYGON_ADDR, usdt_abi);
  const { mutate: transferUSDT } = useTransferToken(contract);
  console.log({ contract, transferUSDT });
  return (
    <>
      <ConnectWallet />

      <button
        onClick={() => {
          if (!address) return alert("not connected");
          transferUSDT({
            to: test_recipient,
            amount: 0.1,
          });
        }}
      >
        Send USDT
      </button>
    </>
  );
};
