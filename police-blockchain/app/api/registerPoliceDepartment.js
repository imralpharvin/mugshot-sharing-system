/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

let registerPoliceDepartment = async(department) => {
    try {
        console.log("*****Register Police Department SDK*****");
        let policedepartmentname =  department["policedepartmentname"];
        let policedepartmentid = department["policedepartmentid"];
        let policedepartmenthash = department["policedepartmenthash"];

        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        //console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(policedepartmentid);
        if (!identity) {
            console.log('An identity for the police department ' + policedepartmentid + 'does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: policedepartmentid, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('policedepartment');

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('RegisterAccount', 'username', 'name', 'org', 'employeeID')
        await contract.submitTransaction('CreatePoliceDepartment', policedepartmentname, policedepartmentid, policedepartmenthash);
        console.log('*****SUCCESS: Transaction has been submitted*****');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`*****FAILURE: Failed to submit transaction: ${error}*****`);
        process.exit(1);
    }
}

exports.registerPoliceDepartment = registerPoliceDepartment;
