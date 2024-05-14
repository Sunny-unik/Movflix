# Getting Started Guide

This consist source code of different services which are:

- server: (for handling APIs)
- client: (for frontend)

## Prerequisite

1. Node installed on your machine.
2. MongoDB URI to connect with Database.
3. Check `extensions.json` file in .vscode directory some of these extensions are required for maintain code consistency.

## Setup

1. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the [Movflix](https://github.com/Sunny-unik/Movflix) to your own GitHub account.
2. Clone the forked repository to your local machine.
3. Create `.env` file and fill environment variables as following written in `.env.example` file.
4. Run `npm i` to install the dependencies and set up the project.

## Development

To run project on your local machine, run:

```shell
npm run dev
```

## Building

To generate a production-ready version of your code, run:

```shell
npm run build
```

To test production-ready version of your code, run:

```shell
npm start
```
