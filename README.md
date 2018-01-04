# showdown-parser

A Node.js parser for raw [Pokemon Showdown](https://github.com/Zarel/Pokemon-Showdown) logs. Inspiration from [Antar's official Showdown log parser](https://github.com/Antar1011/Smogon-Usage-Stats).

## Requirements

* Node 7.4.0+

## Setup

* `npm install`

## Usage

* `node index -f <format> -d <date>`

`format` should be formatted as `gen7vgc2017`, and `date` as `2017-10`.

The path to your Logs directory resides in [appConfig.js](https://github.com/GriffinLedingham/showdown-parser/blob/master/config/appConfig.js) so you will need to configure your environment appropriately.

In [appConfig.js](https://github.com/GriffinLedingham/showdown-parser/blob/master/config/appConfig.js) you will also find a field `cores`. This must be modified to provide how many CPU-cores you would like to utilize for log parsing. Using a number greater than your computer's core count will provide no benefit, and even a potential performance-hit. Using less than your maximum cores, however, is perfectly acceptable.

Running the app will provide you with a progress bar, displaying your completion and your logs being parsed per second. Once this has completed, the logs will be dumped into their appropriate folders (`raw/`, `compiled/`).

## Todo

This is a brand new project, and there is much work to be done. Currently the parser only supports ELO-agnostic usage stats, and does not compute teammate, or EV data.
