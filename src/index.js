
const path = require('path')
const {program} = require('commander')
const {compile} = require("./compile");
// const fs = require('fs')

program
  .name('solidity-verify')
  .description('Compile contract and generate metadata to verify contracts')
  .argument('<path>', "file to compile")
  .option('-v,  --version <version>', "solc version", 'v0.8.11')
  .option('-n,  --name <name>', "contract name", '')
  .option('-o, --optimization', 'enable optimization', false)
  .option('-r, --optimization-runs <runs>', 'optimization runs' , 200)
  // .option('-c, --chain-id <chain_id>', 'chain id' , 1)
  // .option('-a,  --address <address>', "contract address",false)
  // .option('-k, --key <key>', "etherscan api key",false)
  .showHelpAfterError()
  .parse()

const [contract] = program.args;
const options = program.opts();

const verify =async (contract, options) => {
  const {version, name, optimization, optimizationRuns, chainId, address, key} = options

  // compile
  const metadata = await compile(contract, version, name, optimization, optimizationRuns)

  // verify


}


verify(contract, options)



