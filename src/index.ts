import { getResult } from "./components/getResult";
import { proposal } from "./components/proposal";
import { setBaseURL } from "./constants";
import { SendLipc, SendToken, SendNFT, ContractExecute } from "./constructor";

const imnSDK = {
  getResult,
  proposal,
  setBaseURL,
  txConstructor: { SendLipc, SendToken, SendNFT, ContractExecute },
};

export default imnSDK;
