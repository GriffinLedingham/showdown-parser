# showdown-parser

A Node.js parser for raw [Pokemon Showdown](https://github.com/Zarel/Pokemon-Showdown) logs. Inspiration from [Antar's official Showdown log parser](https://github.com/Antar1011/Smogon-Usage-Stats).

## Requirements

* Node 7.4.0+

## Setup

* `npm install`

## Usage

* `node index -f <format> -d <date> -c <cutoff> -o <type> [--no-logs]`

`format` should be formatted as `gen7vgc2017`, `date` as `2017-10`, `cutoff` as `1760` and `type` as `usage|json`. The `--no-logs` flag will keep the parser from re-parsing the logs data, but rather just build a formatted .txt or .json from the compiled data existing in the appropriate directory.

The path to your Logs directory resides in [appConfig.js](https://github.com/GriffinLedingham/showdown-parser/blob/master/config/appConfig.js) so you will need to configure your environment appropriately.

In [appConfig.js](https://github.com/GriffinLedingham/showdown-parser/blob/master/config/appConfig.js) you will also find a field `threads`. This must be modified to provide how many CPU-threads you would like to utilize for log parsing. This number will need to be tuned based on your hardware performance, as well as the data-size. Data sets may grow too large to parse all information in a low thread count without hitting an OOM error. In this case, bump up your parallel thread count so that Node will use a greater # of standalone processes to handle the large memory requirements.

Running the app will provide you with a progress bar, displaying your completion and your logs being parsed per second. Once this has completed, the logs will be dumped into their appropriate folders (`raw/`, `compiled/`, `formatted/`, `json/`).

## Features

This parser will currently output moveset data in .txt format, matching the data found [here](http://www.smogon.com/stats/2017-10/moveset/gen7vgc2017-1760.txt).

Optionally, the parser will output .json matching the format of Smogon's chaos data found [here](http://www.smogon.com/stats/2017-10/chaos/gen7vgc2017-1760.json).

## Issues

Due to limitations of JavaScript, floating point calculations behave slightly different versus Antar's original Python implementation. Therefore, the weighting calculations on cutoff data will differ from Smogon's usage stat data by 0.01-0.1% reported. This is a fairly insignificant difference, but the issue does exist.
