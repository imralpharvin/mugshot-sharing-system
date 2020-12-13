# Blockchain-based Mugshot Sharing System

## Getting Started

This uses Hyperledger Fabric version 2.0, a platform which allows developers to build permissioned blockchain networks.

### Prerequisites

* [Hyperledger Fabric Prerequisites](https://hyperledger-fabric.readthedocs.io/en/release-2.0/prereqs.html) - The blockchain platform used.

## Running the blockchain network

To start the blockchain network:

```
cd police-blockchain
./start.sh
```

To clean:

```
./clean.sh
```

## Running the backend application
To start the backend applicaton:

```
cd police-blockchain
cd app
npm install
nodemon app.js
```

## Running the server-client
To start the backend applicaton:

```
cd client-server
python3 server.py
python3 client.py
```

