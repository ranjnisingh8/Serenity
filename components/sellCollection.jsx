import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import React, { useState } from "react";
import Container from "./Container/Container";
import NFTGrid from "./NFT/NFTGrid";
import tokenPageStyles from "../styles/Sell.module.css";

import SaleInfo from "./SaleInfo/SaleInfo";
import OwnedNFT from "./ownedNft";


export default function SellCollection({ NFT_COLLECTION_ADDRESS }) {
  // Load all of the NFTs from the NFT Collection
  console.log(NFT_COLLECTION_ADDRESS)
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const address = useAddress();
  const { data, isLoading } = useOwnedNFTs(contract, address);
  console.log(data)

  const [selectedNft, setSelectedNft] = useState();

  return (
    <>

      {!selectedNft ? (
        <>
          {data && data[0] &&
            <OwnedNFT nft={data[0]} overRideOnClick={(nft) => setSelectedNft(nft)} />
          }
        </>
      ) : (
        <div className={tokenPageStyles.container} style={{display:'flex'}}>
          <div className={tokenPageStyles.metadataContainer}>
            <div className={tokenPageStyles.imageContainer}>
              <ThirdwebNftMedia
                metadata={selectedNft.metadata}
                className={tokenPageStyles.image}
              />
              <button
                onClick={() => {
                  setSelectedNft(undefined);
                }}
                className={tokenPageStyles.crossButton}
              >
                X
              </button>
            </div>
          </div >
          <div className={tokenPageStyles.listingContainer}>
            <p>You&rsquo;re about to list the following item for sale.</p>
            <h1 className={tokenPageStyles.title}>
              {selectedNft?.metadata?.name}
            </h1>
            <p className={tokenPageStyles.collectionName}>
              Token ID #{selectedNft.metadata.id}
            </p>

            <div className={tokenPageStyles.pricingContainer} >
              <SaleInfo nft={selectedNft} collectionAdd={NFT_COLLECTION_ADDRESS} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
