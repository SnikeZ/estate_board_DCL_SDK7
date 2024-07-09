import { NFTFilters } from '@dcl/schemas';
import { LandOrder } from './types';
import { URLSearchParams } from '../utils';

let DEFAULT_URL = "https://nft-api.decentraland.org/v1"

export function setBaseUrl(url: string) {
    DEFAULT_URL = url;
}

export class NFTSeverClient {
    private URL: string;

    constructor(url: string = DEFAULT_URL) {
        this.URL = url;
    }

    async fetchNFTs(filters: NFTFilters): Promise<LandOrder[]> {
        const response = await fetch(`${this.URL}/nfts?${new URLSearchParams(filters as any)}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch NFTs: ${response.statusText}`);
        }
        return (await response.json())['data'];
    }

}