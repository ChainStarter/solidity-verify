// https://github.com/ethereum/solc-bin/blob/gh-pages/bin/list.txt

const path = require('path')
const find = require('find')
const fs = require('fs')
const _ = require('lodash')

const project_dir = process.cwd()

const getSolFiles = () => {
  return new Promise(resolve => {
    find.file(project_dir, function(files) {
      files = files.filter(file => file.indexOf('.sol') > -1)
      resolve(files)
    })

  })
}

const getSolc = (version) => {
  return new Promise(async resolve => {
    try {
      const data = fs.readFileSync(path.resolve(__dirname, 'solc.txt'), 'utf-8')
      const version_file = _.remove(data.split('\n'), (str) => str.indexOf('nightly') == -1).find(str => str.indexOf(version) > -1)
      if (typeof version_file == 'undefined') {
        console.log('version is not found', version)
        process.exit()
      }
      const _version = version_file.replace('soljson-', '').replace('.js', '')

      const solc = require('solc')
      solc.loadRemoteVersion(_version, (err, solcIns) => {
        resolve(solcIns)
      })
    } catch (e) {
      console.log(e.message)
    }
  })
}

const compile = async (contract, version, name, optimization, optimizationRuns) => {
  const file = path.resolve(project_dir, contract);

  if (!name) {
    name = path.basename(contract, '.sol')
  }

  const content = fs.readFileSync(file, 'utf-8')

  const solcIns = await getSolc(version)

  const input = {
    language: 'Solidity',
    sources: {
      [name]: {
        content
      }
    },
    settings: {
      metadata: {
        // Use only literal content and not URLs (false by default)
        "useLiteralContent": true
      },
      outputSelection: {
        [name]: {
          [name]: ['metadata']
        }
      },
      optimizer: {
        enabled: optimization,
        runs: optimizationRuns
      }
    }
  };

  const sol_files = await getSolFiles()

  const findImports = (import_path) => {
    const file = sol_files.find(file => file.indexOf(import_path) > -1)
    if (typeof file == 'undefined') {
      console.log('file is not found', import_path)
      process.exit()
    }

    const contents = fs.readFileSync(file, 'utf-8')
    return {
      contents
    }
  }
  const {contracts, errors = []} = JSON.parse(
    solcIns.compile(JSON.stringify(input), {import: findImports})
  );

  if (errors.findIndex(error => error.severity == 'error') > -1) {
    console.log(errors);
    process.exit()
  }

  if (typeof contracts == 'undefined') {
    console.log('contract name is not found')
    process.exit()
  }

  if (typeof contracts[name] == 'undefined') {
    console.log('name is not found')
    process.exit()
  }

  let metadata = JSON.parse(contracts[name][name]['metadata'])

  let {language, settings, sources} = metadata

  delete settings.compilationTarget


  let _source = {}
  for (let contract in sources) {
    const source = sources[contract]
    delete source.license
    Object.assign(_source, {
      [contract]: source
    })
  }

  sources = _source

  const json = {
    language,
    settings,
    sources
  }

  metadata = JSON.stringify(json)

  const metadata_file = path.resolve(path.dirname(file), `${name}_metadata.json`);
  console.log('generate metadata to ', metadata_file)
  fs.writeFileSync(metadata_file, metadata)
  return metadata
}


//     // `output` here contains the JSON output as specified in the documentation
//     // for (var contractName in output.contracts['Bridge.sol']) {
//     //     console.log(
//     //     contractName
//     //     );
//     // }
// })


module.exports = {
  compile
}