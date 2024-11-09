import { useRouter } from 'next/router';
import styles from '../../styles/Token.module.css';
import { useState, useEffect } from 'react';
import {
    MediaRenderer,
    ThirdwebNftMedia,
    Web3Button,
    useContract,
    useValidDirectListings,
    useDirectListingsCount,
    useCancelDirectListing,
    useContractMetadataUpdate,
    useContractMetadata,
} from "@thirdweb-dev/react";
import {
    MARKETPLACE_ADDRESS
} from "../../const/contractAddresses"
import Chart from '../../components/Charts/chart';

export default function TokenPage({ nft }) {
    const router = useRouter();
    const { query } = router;
    const contractAdd = query.contractAdd;
    const { contract } = useContract(contractAdd);
    const [listings, setListings] = useState(null);
    const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
        MARKETPLACE_ADDRESS,
        "marketplace-v3"
    );
    useEffect(() => {
        getListingss();
    }, [marketplace, listings]);
    const { data: contractMetadata, isLoading } = useContractMetadata(contract);
    const getListingss = async () => {
        let listing = await marketplace?.directListings.getAllValid();
        listing = listing?.filter((listing) => listing.assetContractAddress === contractAdd);
        setListings(listing);
    }
    async function getCheapestToken() {
        const listing = listings?.reduce((minlisting, currentlisting) => currentlisting.currencyValuePerToken.displayValue < minlisting.currencyValuePerToken.displayValue ? currentlisting : minlisting);
        console.log(listing)
        setListings(listing);
    }
    console.log(contractMetadata)
    async function buyListing() {
        let txResult;
        await getCheapestToken();

        if (listings && listings[0]) {
            txResult = await marketplace?.directListings.buyFromListing(
                listings[0].id,
                1
            )
        } else {
            throw new Error("No listing found");
        }

        return txResult
    }

    return (
        <div className={styles.TokenPage} >
            <div className={styles.outer}>
                <div className={styles.left}>
                    <div className={styles.Chart}>

                        <Chart />
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.name}>{!isLoading && contractMetadata && (contractMetadata?.name)}</div>
                    <div className={styles.des}>{!isLoading && contractMetadata && (contractMetadata?.description)}</div>
                    <Web3Button
                        contractAddress={MARKETPLACE_ADDRESS}
                        action={async () => buyListing()}
                        isDisabled={
                            (!listings || !listings[0])
                        }
                    >
                        {listings && listings[0] && "Buy Cheapest" || "Not Avaiable for sale" }
                    </Web3Button>
                </div>
            </div>

        </div>
    );
}