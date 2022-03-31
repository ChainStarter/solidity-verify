# solidity-verify
Compile contract and generate metadata to verify contracts in scan.
### Supported scan:
* etherscan
* bscscan
* ...scan
## Install
```
npm install -g @chainstarter/solidity-verify
```

### Usage
```
Usage: solidity-verify [options] <path>

Compile contract and generate metadata to verify contracts

Arguments:
  path                            file to compile

Options:
  -v,  --version <version>        solc version (default: "v0.8.11")
  -n,  --name <name>              contract name (default: "")
  -o, --optimization              enable optimization (default: false)
  -r, --optimization-runs <runs>  optimization runs (default: 200)
  -h, --help                      display help for command
```
### Example
```
solidity-verify ERC20.sol -n ERC20 -v 0.8.11 -o -r 200
```
