import { Injectable } from '@nestjs/common';
import DeployElectionABI from '../utils/abi/deploy-ballot.abi.json';
import { ethers } from 'ethers';
import { DEPLOY_ELECTION_ADDRESS } from 'src/utils/common/constants';
import { AbiItem } from 'web3-utils'
import ElectionABI from '../utils/abi/ballot.abi.json';
import Web3 from 'web3';
import axios from 'axios';

// let web3 = new Web3("http://127.0.0.1:8545");

// let provider = new ethers.providers.JsonRpcProvider(
//     // "https://bsc.getblock.io/5335d342-dc7f-4c48-98c7-8aee0b8e323d/testnet/"
//     "http://127.0.0.1:8545"
// );

let web3 = new Web3("https://polygon-mumbai.g.alchemy.com/v2/EAAlM0-rm4pHavxVcH0ZV9Sm0JYhxoRf");

let provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/EAAlM0-rm4pHavxVcH0ZV9Sm0JYhxoRf"
);

@Injectable()
export class CreateElectionService {
    async createElection(superAdminAddress: string, uri: string) {
        let wallet = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);
        const deployElectionContract = new ethers.Contract(
            DEPLOY_ELECTION_ADDRESS,
            JSON.stringify(DeployElectionABI),
            provider
        );

        let tx = await deployElectionContract
            .connect(wallet)
            .createBallot(superAdminAddress, uri);
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
        var electionList: any[] = [];
        var contract = new web3.eth.Contract(DeployElectionABI as AbiItem[], DEPLOY_ELECTION_ADDRESS);

        await contract.getPastEvents("NewBallotDeployed", {
            fromBlock: 0,
            toBlock: 'latest'
        })
            .then(function (events) {
                eventData = events;
                // console.log(events);
            })

        for (var i = 0; i < eventData.length; i++) {
            const election = new web3.eth.Contract(ElectionABI as AbiItem[], eventData[i].returnValues.ballotRoot);
            const uri = await election.methods.uri().call();
            const metadata = await axios.get(uri);
            electionList.push({ electionAddress: eventData[i].returnValues.ballotRoot, name: metadata.data.name, image: metadata.data.image, description: metadata.data.description });
        }
        return electionList;
    }
}
