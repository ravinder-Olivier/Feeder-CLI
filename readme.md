# Feeder-CLI

![License](https://img.shields.io/github/license/ravinder-Olivier/Feeder-CLI) ![Package Version](https://img.shields.io/github/package-json/v/ravinder-Olivier/feeder-cli) [![Dependency Review](https://github.com/ravinder-Olivier/Feeder-CLI/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/ravinder-Olivier/Feeder-CLI/actions/workflows/dependency-review.yml)


THIS PROJECT IS STILL IN DEVELOPMENT! NOT ALL FEATURES MAY WORK! Features that are not working include:
- Changing Feed Display settings

## Install

```bash
npm i feeder-cli -g
```
Usage
```bash
feeder check
feeder manage
```

## Dev

The code itself is in the /bin folder due to the CLI nature of the project.
To quickly test code while developing run 'node .',

```bash
npm install
npm install . -g 
```

Testing:
_In project directory run:_

```bash
# Manage RSS URL
node . manage
# Run Check
node . check
```

REMINDER: This project is still under development, key features may still not be fully developed!
