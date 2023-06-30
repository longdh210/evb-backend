import { Injectable } from '@nestjs/common';
import DeployElectionABI from '../utils/abi/deploy-ballot.abi.json';
import { ethers } from 'ethers';
import { DEPLOY_ELECTION_ADDRESS } from 'src/utils/common/constants';
import { AbiItem } from 'web3-utils'
import { FormatTypes, Interface } from '@ethersproject/abi';
import Web3 from 'web3';

let web3 = new Web3("http://127.0.0.1:8545");

let provider = new ethers.providers.JsonRpcProvider(
    // "https://bsc.getblock.io/5335d342-dc7f-4c48-98c7-8aee0b8e323d/testnet/"
    "http://127.0.0.1:8545"
);

@Injectable()
export class CreateElectionService {
    async createElection(superAdminAddress: string) {
        let wallet = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY_LOCAL, provider);
        const deployElectionContract = new ethers.Contract(
            DEPLOY_ELECTION_ADDRESS,
            JSON.stringify(DeployElectionABI),
            provider
        );

        let tx = await deployElectionContract
            .connect(wallet)
            .createBallot(superAdminAddress);
        await tx.wait();
        let receipt = await tx.wait();
        let electionContractAddress: string;
        let electionContractInfo = await receipt.events?.filter((x: any) => {
            return x.event == "NewBallotDeployed";
        });
        electionContractAddress = electionContractInfo[0].args[0];
        return electionContractAddress;
    }

    async getListElection() {
        var eventData: any;
        var electionAddress: string[] = [];
        var contract = new web3.eth.Contract(DeployElectionABI as AbiItem[], DEPLOY_ELECTION_ADDRESS);

        await contract.getPastEvents("NewBallotDeployed", {
            fromBlock: 0,
            toBlock: 'latest'
        })
            .then(function (events) {
                eventData = events;
                console.log(events);
            })

        for (var i = 0; i < eventData.length; i++) {
            electionAddress.push(eventData[i].returnValues.ballotRoot);
        }
        return electionAddress;
    }
}
