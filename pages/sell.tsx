import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import React, { useState } from "react";
import styles from '../styles/Sell.module.css';
import SellCollection from "../components/sellCollection"
import { NFT_COLLECTION_ADDRESSS } from "../const/contractAddresses";

export default function Sell() {

  return (
    <div className={styles.outer}>
    <h1>Select Stock(s) to Sell</h1>
    {/* <p>Select which NFT you&rsquo;d like to sell below.</p> */}
    <div className={styles.nftContainer}>

      {NFT_COLLECTION_ADDRESSS.map((address)=>
        <SellCollection NFT_COLLECTION_ADDRESS={address.address}/>
      )}
      </div>
    
    </div>
  );
}
