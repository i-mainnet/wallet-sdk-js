/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

// default로 메인넷 url 설정
var baseURL = "https://testbackend.initialmn.io/v1/a2a";
function setBaseURL(newURL) {
    baseURL = newURL;
}

function getErrorMsg(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}

function getResult(request_id) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var response, res, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(baseURL + "/result?requestId=" + request_id, {
                            headers: {
                                Accept: "application/json",
                            },
                        })];
                case 1:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    res = _c.sent();
                    if (res.errorMessage) {
                        throw new Error(res.errorMessage);
                    }
                    return [2 /*return*/, {
                            status: res === null || res === void 0 ? void 0 : res.status,
                            address: (_a = res === null || res === void 0 ? void 0 : res.result) === null || _a === void 0 ? void 0 : _a.address,
                            tx_hash: (_b = res === null || res === void 0 ? void 0 : res.result) === null || _b === void 0 ? void 0 : _b.transactionHash,
                        }];
                case 3:
                    error_1 = _c.sent();
                    return [2 /*return*/, { error: getErrorMsg(error_1) }];
                case 4: return [2 /*return*/];
            }
        });
    });
}

function proposal(metadata, transaction) {
    return __awaiter(this, void 0, void 0, function () {
        var bodyData, response, res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    // metadata 들어왔는지 검증
                    if (!metadata) {
                        throw new Error("metadata is required");
                    }
                    // metadata name 값 들어왔는지 검증
                    if (metadata && !metadata.name) {
                        throw new Error("The name of a metadata cannot be ".concat(metadata.name));
                    }
                    // 트랜잭션 from 값 들어왔는지 검증
                    if (transaction && !transaction.from) {
                        throw new Error("The from of a transaction cannot be ".concat(transaction.from));
                    }
                    bodyData = transaction
                        ? { metadata: metadata, type: transaction.type, transaction: transaction }
                        : { metadata: metadata, type: "auth" };
                    return [4 /*yield*/, fetch(baseURL + "/proposal", {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(bodyData),
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    res = _a.sent();
                    if (res.errorMessage) {
                        throw new Error(res.errorMessage);
                    }
                    return [2 /*return*/, { requestId: res === null || res === void 0 ? void 0 : res.requestId }];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, { error: getErrorMsg(error_1) }];
                case 4: return [2 /*return*/];
            }
        });
    });
}

var SendLipc = /** @class */ (function () {
    function SendLipc(from, to, value) {
        this.from = from;
        this.to = to;
        this.value = value;
        this.type = "send";
    }
    return SendLipc;
}());
var SendToken = /** @class */ (function () {
    function SendToken(from, to, value, contract) {
        this.from = from;
        this.to = to;
        this.value = value;
        this.contract = contract;
        this.type = "send_token";
    }
    return SendToken;
}());
var SendNFT = /** @class */ (function () {
    function SendNFT(from, to, contract, tokenId) {
        this.from = from;
        this.to = to;
        this.contract = contract;
        this.tokenId = tokenId;
        this.type = "send_nft";
    }
    return SendNFT;
}());
var ContractExecute = /** @class */ (function () {
    function ContractExecute(from, contract, abi, params) {
        this.from = from;
        this.to = contract;
        this.abi = abi;
        this.params = params;
        this.type = "contract_execute";
    }
    return ContractExecute;
}());

var imnSDK = {
    getResult: getResult,
    proposal: proposal,
    setBaseURL: setBaseURL,
    txConstructor: { SendLipc: SendLipc, SendToken: SendToken, SendNFT: SendNFT, ContractExecute: ContractExecute },
};

export { imnSDK as default };
