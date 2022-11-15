#!/usr/bin/env node
const yargs = require("yargs");
const chalk = require("chalk");
const boxen = require("boxen");

const options = yargs
.usage("Usage: -s <setup>")
.option ("s", { alias: "setup", describe: "Setup Feeder-CLI", type: "string", demandOption: true})

console.log("Welcome")