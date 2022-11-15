import { getResult } from "./components/getResult";
import { proposal } from "./components/proposal";
import { setBaseURL } from "./constants";
import { SendLipc, SendToken, SendNFT, ContractExecute } from "./constructor";
declare const imnSDK: {
    getResult: typeof getResult;
    proposal: typeof proposal;
    setBaseURL: typeof setBaseURL;
    txConstructor: {
        SendLipc: typeof SendLipc;
        SendToken: typeof SendToken;
        SendNFT: typeof SendNFT;
        ContractExecute: typeof ContractExecute;
    };
};
export default imnSDK;
