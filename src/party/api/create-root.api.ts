import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

class CreateRootAPI {
    createRoot(listVoters: string[]) {
        const leaves = listVoters.map((x) => keccak256(x));
        const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
        const root = tree.getRoot().toString('hex');

        return root;
    }
}

export default new CreateRootAPI();