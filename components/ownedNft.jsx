import { useContract, useNFTs, ThirdwebNftMedia } from "@thirdweb-dev/react";
import styles from "../styles/Marketplace.module.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Skeleton from "./Skeleton/Skeleton";

export default function OwnedNFT({ nft,overRideOnClick }) {
  const [metadata, setMetadata] = useState(nft.metadata);

  return (
    <>
      {(metadata && (
          <div className={styles.companyCollection} onClick={()=>overRideOnClick(nft)} >
            <div className={styles.company}>
              <ThirdwebNftMedia
                metadata={metadata}
                height={"18vw"}
                width={"18vw"}
              />
              <div className={styles.companyName}>{nft?.name}</div>
              <div className={styles.details}>
                <div className={styles.detail}>
                  <span>Buyed Price</span>
                  <span className="currentMarketPrice">0.0002 ETH</span>
                </div>
              </div>
            </div>
          </div>
      )) || <Skeleton width="20vw" height="27vw" borderRadius="1vw" />}
    </>
  );
}
