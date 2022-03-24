// https://github.com/ethereum/solc-bin/blob/gh-pages/bin/list.txt

const solc = require('solc')
const path = require('path')
const {program} = require('commander')
const fs = require('fs')

const contracts_dir = path.resolve(__dirname, './contracts')
const node_modules_dir = path.resolve(__dirname, './node_modules')
const file = path.resolve(contracts_dir, `./Bridge.sol`);
const content = fs.readFileSync(file, 'utf-8')


program
  .version('0.1.0')
  .argument('<username>', 'user to login')
  .argument('[password]', 'password for user, if required', 'no password given')
  .action((username, password) => {
    console.log('username:', username);
    console.log('password:', password);
  });

// program
//   .name('sol info')
//   .description('ddd')
//   .argument('<path>', "file to compile")
//   .action((path, options) => {
//     console.log(path, options)
//   })
//   .option('-v  --version <version>', "solc version", 'v0.8.11')
//   .option('-o, --optimization <optimization>', 'enable optimization', false)
//   .option('-r, --optimization-runs <runs>', 'optimization runs' , 200)
//   .showHelpAfterError()


  
// solc.loadRemoteVersion('v0.8.11+commit.d7f03943',(err, solcIns) => {
//     const input = {
//       language: 'Solidity',
//       sources: {
//         'Bridge.sol': {
//           content
//         }
//       },
//       settings: {
//         metadata: {
//             // Use only literal content and not URLs (false by default)
//             "useLiteralContent": true
//         },
//         outputSelection: {
//           'Bridge.sol': {
//             '*': ['metadata']
//           }
//         }
//       }
//     };
    
//     function findImports(import_path) {
//         let file = path.resolve(contracts_dir, import_path);
//         if(!fs.existsSync(file)) {
//             file = path.resolve(node_modules_dir, import_path);
//         }
//         // console.log(file)
//         const contents = fs.readFileSync(file, 'utf-8')
//         return {
//             contents
//         }
//     }

//     const output = JSON.parse(
//         solcIns.compile(JSON.stringify(input), { import: findImports })
//     );

//     const metadata = JSON.parse(output.contracts['Bridge.sol']['Bridge'].metadata)
//     let {language, settings, sources} = metadata
    
//     delete settings.compilationTarget


//     let _source = {}
//     for(let contract in sources){
//       const source = sources[contract]
//       delete source.license
//       Object.assign(_source, {
//         [contract]: source
//       })
//     }
  
//     sources = _source
    
//     const json = {
//       language,
//       settings,
//       sources
//     }

//     console.log(JSON.stringify(json))


//     // `output` here contains the JSON output as specified in the documentation
//     // for (var contractName in output.contracts['Bridge.sol']) {
//     //     console.log(
//     //     contractName
//     //     );
//     // }
// })

