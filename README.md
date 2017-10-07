# T0mon

Live monitoring of the CERN GRID on tier zero

## Installation

Requires the installation of Node Package Manager.

```
git clone https://github.com/Zvezdin/t0mon.git
cd t0mon
npm install
```

## Development server

Run `npm run ng serve` for a dev server. Navigate to `http://localhost:4200/`.

### Assets

In order to successfully run locally, the server requires all website assets and additional data to be placed in `src/`. Asset folders such as `data` and `rawdata` must be located there. 

If you have added an additional asset folder or file in `src/`, you need to update `.angular-cli.json` in the project root, specifying which assets have been added.

## Build

Run `npm run ng build -prod --base-href "http://your.base/href/"` to build the project. The build artifacts will be stored in the `dist/` directory.