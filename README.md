# font-subset
create a font-subset from a font file.

# install

```
pnpm i @anfu/font-subset -g
```

# usage

```
Usage: font-subset -c <path>

a command tool for generate font subset

Options:
  -V, --version        output the version number
  -c, --config <path>  the path of config file
  -h, --help           display help for command
```

# config params

- `fontPath`  path of the font file
- `text`  the subset of the font to be generated
- `preset`  includes digits, letters, and symbols
- `output`
  - `path`  path to output the subset font file
  - `name`  name of the subset font file


# config example
```
subset.config.json
{
    "fontPath": "./gbk.ttf",
    "text": "锐字工房云字库行楷GBK",
    "preset": true,
    "output": {
        "path": "./example",
        "name": "gbk"
    }
}
```