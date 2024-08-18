# Readme

This repository contains TypeScript/JavaScript samples to compose the `stake` and `redeem` transactions on Bitcoin network. The targeted readers should have knowledge on Bitcoin transaction formats and are familiar with TS/JS programming languages. 

Quick link to technical design (draft version): https://famous-exoplanet-701.notion.site/BTC-Staking-Transaction-Design-v2-bfa311f7f19e45688a944fb9c1e32c59. 

For those who want a more user friendly interface, please test it out on https://stake.dev.btcs.network.

## Test Environment

Please test the function on Core Devnet which links to BTC Testnet. 

Core Devnet faucet https://scan.dev.btcs.network/faucet.

Notes:

- It is recommended to lock BTC for more than 8 hours in Devnet, because only staking transaction longer than 6 hours (lock timestamp - BTC tx confirmation time with 4 blocks) are counted as as feasible.


## How to

### Program by yourself

If you want to write your own scripts to enable BTC staking on Core, please take the [sample](sample.ts) as a reference.

### Run the script directly

If you want to use the tool directly, please run `npm install` and scripts below. For more information about the parameters, please check the [index](index.ts) file.

`stake BTC` 

``` shell
node dist/index.js stake --account tb1qzdvhlak7y8kz0v5hu2tw7qae3969jzrt7rj7n5 --privatekey ${private key} --amount 1000000 --bitcoinnetwork 2 --corenetwork 2 --locktime 1712847585 --rewardaddress 0x2a5F963BaC7bf136f6a0ff98356b52F0B49Af71A --validatoraddress  0x3aE030Dc3717C66f63D6e8f1d1508a5C941ff46D
```

If successful, you will see the console returns transaction id, the locked P2SH/P2WSH script address and the redeem script, which will be used on the following redeem transaction. Please save them properly. 

Example

``` shell
txId: 7b531ab17b93114bb5b74e6b14e5ff99f447f139544099f166a98517b423a7c9
address: 2N7LJiG1ZGk97jUuhDcsRquPjgxFjT273fi
redeemScript: 04e1fa1766b17576a91413597ff6de21ec27b297e296ef03b9897459086b88ac
```



`redeem BTC`
```shell
node dist/index.js redeem --account 2N7LJiG1ZGk97jUuhDcsRquPjgxFjT273fi --redeemscript 04e1fa1766b17576a91413597ff6de21ec27b297e296ef03b9897459086b88ac --privatekey ${private key} --destaddress tb1qzdvhlak7y8kz0v5hu2tw7qae3969jzrt7rj7n5
```

`claim CORE rewards`

Please visit https://stake.dev.btcs.network, connect to the site using the reward address (0x2a5F963BaC7bf136f6a0ff98356b52F0B49Af71A in the sample) and you can see the BTC staking transaction and claim rewards once system distributes in each round. 

### Using Fireblocks

You can use the tool to sign the staking and redeem transactions using a Fireblocks vault by using the `--fireblocksvaultid` flag instead of `--privatekey`.  Additionally, you will need to set a couple of environment variables.

Example:

```shell
# First, set the following environment variables
export FIREBLOCKS_API_KEY=42f36bfd-097f-4eda-a74b-d363757ed15e
export FIREBLOCKS_SECRET_KEY="-----BEGIN PRIVATE KEY-----
...
-----END PRIVATE KEY-----"
export FIREBLOCKS_BASE_PATH=https://api.fireblocks.io/v1

# Then, run the tool with the --fireblocksvaultid flag
node dist/index.js stake --account tb1qmyhnz06zw6e2cd9cucj0kggtttf574jnr24ynx --fireblocksvaultid 0 --amount 1000000 --bitcoinnetwork 2 --corenetwork 2 --locktime `date -v+11d +%s` --rewardaddress 0x6CE7F3dAbc656762c0e11669C46Fb431D630dd0f --validatoraddress  0x0A53B7e0Ffd97357e444B85f4D683c1d8e22879A
```

If successful, you will see the console returns transaction id, the locked P2SH/P2WSH script address and the redeem script, which will be used on the following redeem transaction. Please save them properly.

Example

``` shell
txId: 7b531ab17b93114bb5b74e6b14e5ff99f447f139544099f166a98517b423a7c9
address: 2N7LJiG1ZGk97jUuhDcsRquPjgxFjT273fi
redeemScript: 04e1fa1766b17576a91413597ff6de21ec27b297e296ef03b9897459086b88ac
```
