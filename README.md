# IMN Wallet JavaScript SDK

## Requirements

- In NPM environment : Node 10 or above recommended

## Settings

It is possible to operate in an environment where HTTP(s) communication is basically possible without a separate subscription procedure.

### In NPM environment

Install SDK with NPM or YARN

```sh
npm install @i-mainnet/wallet-sdk
```

or

```sh
yarn add @i-mainnet/wallet-sdk
```

Import ES module

```javascript
import imnSDK from "@i-mainnet/wallet-sdk";
```

### If you download and use the file

- [Download SDK](dist) file and move to the repository
- Add script to the HTML file as shown below

```html
<script src="./lib/imnSDK.js"></script>
```

### Setup Network

Can change the network if necessary. The default network is Mainnet, but it is not currently available.

**Be sure to set it as testnet.**

- Testnet : https://testbackend.initialmn.io/v1/a2a

```javascript
imnSDK.setBaseURL("https://testbackend.initialmn.io/v1/a2a");
```

## Run Example codes

To run Example codes, either NPM environment or Parcel installation is required.

### Setup Parcel

```sh
npm install -g parcel-bundler
```

### Run Example code

```sh
npm run example
```

## API

### Overview

Request for App-to-App in Javascript SDK happens in the order of `Proposal`, `Request`, `Result`.

- `Proposal`: A stage that requests a task to be performed by a dApp There are 5 different types of requests.
- `Request`: Runs the IMN Wallet on the QR Code to continue the signing process.
- `Result`: Receive and check the result value by calling the function.

### Proposal

Use imnSDK.proposal (metaData, transaction) function to serve 5 requests depending on the transaction.

- `null` : Request wallet address
- `SendLipc` : Request LIPC transfer
- `SendToken` : Request Token transfer
- `SendNFT` : Request NFT transfer
- `ContractExecute` : Request ContractExecute

### MetaData

In order to request a Proposal, information about the dApp is required. The information about the dApp must be provided through the METADATA interface.

#### METADATA

| Property    | Type   | Value                       | Required |
| ----------- | ------ | --------------------------- | -------- |
| name        | string | Name of dApp                | true     |
| description | string | About the request. Reserved | true     |
| url         | string | Main URL of dApp. Reserved  | false    |
| icon        | string | URL of dApp logo. Reserved  | false    |

```javascript
const metaData = {
  name: "IMN test dApp",
  description: "Test Proposal",
  url: "https://test-dApp.imn.com",
  icon: "https://test-dApp.imn.com/logo.png",
};
```

### Auth

This function requests an authentication of the user’s wallet, and the address of the user wallet can be confirmed when the authentication is completed.

**Example**

```javascript
imnSDK.proposal(metaData).then((res) => {
  if (res.error) {
    // Handling errors
  } else if (res.requestId) {
    // requestId Storage and processing
  }
});
```

### SendLipc

This is a request to send the user’s LIPC to a specific address. After the approval of the request, the user can check the transactionHash of the request.

**SendLipc(from, to, value)**

| Parameter | Type   | Value                                                    |
| --------- | ------ | -------------------------------------------------------- |
| from      | string | Address of the sender (Wallet User Verification Purpose) |
| to        | string | Address of the recipient                                 |
| value     | string | Amount of LIPC to send (unit : wei)                      |

**Example**

```javascript
// send 1 LIPC to 0xFb0... from 0x9a...
const transaction = new SendLipc("0x9a...", "0xFb0...", "1000000000000000000");
imnSDK.proposal(metaData, transaction).then((res) => {
  if (res.error) {
    // Handling errors
  } else if (res.requestId) {
    // requestId Storage and processing
  }
});
```

### SendToken

This is a request to send the user’s Token to a specific address. After the approval of the request, the user can check the transactionHash of the request.

**SendNFT(from, to, contract, tokenId)**

| Parameter | Type   | Value                                                    |
| --------- | ------ | -------------------------------------------------------- |
| from      | string | Address of the sender (Wallet User Verification Purpose) |
| to        | string | Address of the recipient                                 |
| value     | string | Amount of Token to send **(including decimals)**         |
| contract  | string | Address of the token contract                            |

**Example**

```javascript
// 1 token is sent from 0x9a... to 0xFb0... in the 0xa8b.. contract. (if decimal is 0)
const transaction = new SendToken("0x9a...", "0xFb0...", "1", "0xa8b...");
imnSDK.proposal(metaData, transaction).then((res) => {
  if (res.error) {
    // Handling errors
  } else if (res.requestId) {
    // requestId Storage and processing
  }
});
```

### SendNFT

This is a request to send the user’s NFT to a specific address. After the approval of the request, the user can check the transactionHash of the request.

**SendNFT(from, to, contract, tokenId)**

| Parameter | Type   | Value                                                    |
| --------- | ------ | -------------------------------------------------------- |
| from      | string | Address of the sender (Wallet User Verification Purpose) |
| to        | string | Address of the recipient                                 |
| contract  | string | Address of the NFT contract                              |
| tokenId   | string | Token ID of the NFT                                      |

**Example**

```javascript
// In the 0xa8b.. contract, tokenId 12 is sent from 0x9a... to 0xFb0....
const transaction = new SendNFT("0x9a...", "0xFb0...", "0xa8b...", "12");
imnSDK.proposal(metaData, transaction).then((res) => {
  if (res.error) {
    // Handling errors
  } else if (res.requestId) {
    // requestId Storage and processing
  }
});
```

### ContractExcute

This is a request to execute a specific contract. After the approval of the request, the user can check the transactionHash of the request.

**ContractExecute(from, contract, abi, params)**

| Parameter | Type   | Value                                                    |
| --------- | ------ | -------------------------------------------------------- |
| from      | string | Address of the sender (Wallet User Verification Purpose) |
| contract  | string | Address of contract                                      |
| abi       | string | abi of the function (json object)                        |
| params    | string | Parameters of the function (json array)                  |

**Example**

```javascript
// 0xa8b.. Execute transfer function in contract.
const transaction = new ContractExecute(
  "0x9a...",
  "0xa8b...",
  JSON.stringify({
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    type: "function",
  }),
  JSON.stringify([
    "0xcad9042cf49684939a2f42c2d916d1b6526635c2",
    5000000000000000000,
  ])
);
imnSDK.proposal(metaData, transaction).then((res) => {
  if (res.error) {
    // Handling errors
  } else if (res.requestId) {
    // requestId Storage and processing
  }
});
```

### Request

A user can create a Scheme that calls the app with the request ID received from Proposal and make a request to the IMN Wallet app with a QRCode or scheme call.

**Scheme**

```
inwallet://wallet?requestId={request_id}
```

**Example**

```
inwallet://wallet?requestId=569308f1-5d21-4ffc-abc5-1c3f4fcd12b7
```

### Result

A user can confirm the reaction of requestId after the approval.

**imnSDK.getResult(requestId)**

**Request**

| Parameter | Type   | Value                            |
| --------- | ------ | -------------------------------- |
| requestId | string | Received requestId from Proposal |

**Response**

| Key     | Type   | Value                                                                                                                                                                                                  |
| ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| status  | string | Status Type<br>&nbsp;&nbsp;• proposal (Request execution)<br>&nbsp;&nbsp;• completed (Execution completed)<br>&nbsp;&nbsp;• canceled (Execution canceled)<br>&nbsp;&nbsp;• expired (Execution expired) |
| address | string | Verified address of the wallet (Returned only when requested by imnSDK.auth)                                                                                                                           |
| tx_hash | string | Transaction hash of the result (Returned only when requested by imnSDK.(sendLipc, sendToken, sendNFT, executeContract)                                                                                 |

**Example**

```javascript
imnSDK.getResult(requestId).then((res) => {
  if (res.error) {
    // Handling errors
  } else if (res.status && res.status === "completed") {
    // res.address <= Only Auth
    // res.tx_hash
  }
});
```

## License

[MIT](LICENSE)
