import styles from '../styles/Marketplace.module.css';
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESSS } from "../const/contractAddresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import { useEffect,useRef } from 'react';
import CompanyCollection from '../components/campanyCollections';

export default function MarketPlace() {
    return (
        <div className={styles.marketplace}>
            <div className={styles.title}>MarketPlace</div>
            <div className={styles.companyContainer}>
                {NFT_COLLECTION_ADDRESSS.map((company, i) =>
                    <CompanyCollection company={company} key={i} />
                )}
            </div>
        </div>
    );
}