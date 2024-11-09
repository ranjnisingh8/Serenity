import styles from '../styles/Marketplace.module.css';
// import NFTGrid from  "../components/NFT/NFTGrid";//"../components/NFTGrid";
import { NFT_COLLECTION_ADDRESSS } from  "../const/contractAddresses";//"../consts/addresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import { useEffect } from 'react';
import CompanyCollection from  "../components/campanyCollectionsIPO" ;// '../components/companyCollections';

  const Ipo=()=> {
    return (
        <div className={styles.marketplace} >
            <div  className={styles.title} style={{margin:"15px" , fontWeight:"bold"}}>IPO - Initial Public Offerings</div>
            
            <div className={styles.companyContainer} >
                {NFT_COLLECTION_ADDRESSS.map((company, i) =>
                    <CompanyCollection company={company} key={i} />
                )}
            </div>
        </div>
    );
}

export default Ipo