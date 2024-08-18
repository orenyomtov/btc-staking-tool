import { buildRedeemTransaction, RedeemParams } from "./transaction";

export const redeem = async ({
  account,
  redeemScript,
  privateKey,
  fireblocksVaultId,
  destAddress,
  bitcoinRpc = "mempool",
  fee = "avg",
}: RedeemParams) => {
  if (!account) {
    throw new Error("account should not be empty");
  }

  if (!redeemScript) {
    throw new Error("redeemScript should not be empty");
  }

  if (!(Number(privateKey == undefined) ^ Number(fireblocksVaultId == undefined))) {
    throw new Error("Must provide either privateKey or fireblocksVaultId");
  }

  if (!destAddress) {
    throw new Error("destAddress should not be empty");
  }

  const { txId } = await buildRedeemTransaction({
    account,
    redeemScript,
    privateKey,
    fireblocksVaultId,
    destAddress,
    bitcoinRpc,
    fee,
  });
  console.log(`txId: ${txId}`);
};
