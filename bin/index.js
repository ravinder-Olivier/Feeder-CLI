#!/usr/bin/env node
const yargs = require("yargs");
const chalk = require("chalk");
const boxen = require("boxen");
const prompt = require('prompt-sync')({sigint: true});
const keytar = require('keytar')
const options = yargs



  .command(
    'update',
    'Update the github rss url',
    function (yargs) {
      return yargs.option('u', {
        alias: 'url',
        describe: 'the URL to make an HTTP request to'
      })
    },
    function (argv) {
    console.log("Please go to your Github dashboard, right click on the subscribe to your rss feed link, and click copy link");
    console.log("Copy the link and paste it here, with *double quotes around* **MAKE SURE THERE ARE NO FORMATTING ARTIFACTS**");
    const newrssurl = prompt("");
    //keytar 
    keytar.setPassword('Feeder-CLI', "github", newrssurl);
    const secret = keytar.getPassword('Feeder-CLI', 'github');
    console.log("Accepted")
    process.exit()
    }
  )
  .help()
  .argv
  

/*
*Grabbing text via terminal input*
console.log("Please add your RSS Feed URL")
const newrssurl = prompt("");
*/