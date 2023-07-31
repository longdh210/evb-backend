import { Injectable } from '@nestjs/common';
import DeployElectionABI from '../utils/abi/deploy-ballot.abi.json';
import { ethers } from 'ethers';
import { DEPLOY_ELECTION_ADDRESS } from 'src/utils/common/constants';
import { AbiItem } from 'web3-utils'
import BallotABI from '../utils/abi/ballot.abi.json';
import Web3 from 'web3';
import axios from 'axios';
import CreateRootAPI from './api/create-root.api';
import keccak256 from 'keccak256';
import { MerkleTree } from 'merkletreejs';
import { arrayAccounts } from 'src/utils/common/accounts';
import SmartAccountFactoryABI from '../utils/abi/smart-account-factory.abi.json';

// const web3 = new Web3("http://127.0.0.1:8545/");

// let provider = new ethers.providers.JsonRpcProvider(
//     // "https://bsc.getblock.io/5335d342-dc7f-4c48-98c7-8aee0b8e323d/testnet/"
//     "http://127.0.0.1:8545"
// );

let web3 = new Web3("https://polygon-mumbai.g.alchemy.com/v2/EAAlM0-rm4pHavxVcH0ZV9Sm0JYhxoRf");

let provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/EAAlM0-rm4pHavxVcH0ZV9Sm0JYhxoRf"
);

@Injectable()
export class PartyService {
    async addParty(ballotContractAddress: string, uri: string, proposalsUri: string[], listVoters: string[]) {
        let wallet = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);
        const ballotContract = new ethers.Contract(ballotContractAddress, JSON.stringify(BallotABI), provider);
        try {
            console.log("run add party");
            const root = CreateRootAPI.createRoot(listVoters);
            console.log("root", root);
            let tx = await ballotContract.connect(wallet).addParty(uri, proposalsUri, "0x" + root);
            await tx.wait();
            return true;
        } catch (e) {
            return e;
        }
    }

    async getAllParty(ballotContractAddress: string) {
        var contract = new web3.eth.Contract(BallotABI as AbiItem[], ballotContractAddress)
        const listParty = await contract.methods.getAllParty().call();
        var listPartyData: any[] = []
        for (var i = 0; i < listParty.length; i++) {
            var metadata = await axios(listParty[i]);
            // console.log(metadata);
            listPartyData.push({ partyId: i, name: metadata.data.name, image: metadata.data.image, description: metadata.data.description });
        }
        return listPartyData;
    }

    async getPartyById(ballotContractAddress: string, partyId: number) {
        var contract = new web3.eth.Contract(BallotABI as AbiItem[], ballotContractAddress)
        const listParty = await contract.methods.getPartyById(partyId).call();
        var metadata = await axios(listParty);
        return {
            partyId: partyId,
            name: metadata.data.name,
            image: metadata.data.image,
            description: metadata.data.description
        }
    }

    async getListProposalInParty(ballotContractAddress: string, partyId: number) {
        var contract = new web3.eth.Contract(BallotABI as AbiItem[], ballotContractAddress)
        const listProposal = await contract.methods.getProposalsInfo(partyId).call();
        var listPrososalsData: any[] = []
        for (var i = 0; i < listProposal.length; i++) {
            // console.log(listProposal[i].uri)
            var metadata = await axios(listProposal[i].uri);
            listPrososalsData.push({
                proposalId: i,
                voteCount: listProposal[i].voteCount,
                name: metadata.data.name,
                image: metadata.data.image,
                dateOfBirth: metadata.data.dateOfBirth,
                hometown: metadata.data.hometown,
                academicLevel: metadata.data.academicLevel
            });
        }
        return listPrososalsData;
    }



    async vote(ballotContractAddress: string, partyId: number, proposalId: number, signedData: string) {
        const leaves = arrayAccounts.map((x) => keccak256(x));
        const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
        const root = tree.getRoot().toString('hex');

        var voteInfo = {
            ballotContractAddress,
            partyId,
            proposalId,
        };
        const voterAddress = web3.eth.accounts.recover(
            JSON.stringify(voteInfo),
            signedData
        );
        console.log("voterAddres", voterAddress);

        const leaf = keccak256(voterAddress);
        const proof = tree.getHexProof(leaf);
        try {
            let wallet = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);
            let votingContract = new ethers.Contract(ballotContractAddress, JSON.stringify(BallotABI), provider);
            const tx = await votingContract.connect(wallet).vote(partyId, proposalId, voterAddress, proof);
            await tx.wait();
            return true;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    // async createSmartAccount(userAddress: string) {
    //     try {
    //         let wallet = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY_LOCAL, provider);
    //     } catch(e) {
    //         console.log(e)
    //     }
    // }
}
