import styles from "../styles/Marketplace.module.css";
import { useContract, useNFTs, ThirdwebNftMedia } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "./Skeleton/Skeleton";
export default function CompanyCollection({ company }) {
  const { contract } = useContract(company?.address);
  const [metadata, setMetadata] = useState(null);
  useEffect(() => {
    getMetaData();
  }, [contract, metadata]);
  const getMetaData = async () => {
    let metadata = await contract?.metadata.get();
    setMetadata(metadata);
  };
  return (
    <>
      {(metadata && (
        <Link href={`/ipo/${company?.address}`} key={company}>
          <div className={styles.companyCollection}>
            <div className={styles.company}>
              <ThirdwebNftMedia
                metadata={metadata}
                height={"18vw"}
                width={"18vw"}
              />
              <div className={styles.companyName}>{company?.name}</div>
              <div className={styles.details} > 
               {/* style={{background:"#00260d"}}> */}
                <div className={styles.detail}>
                  <span >Open</span>
                  
                </div>
                <div className={styles.detail}>
                  
                </div>
              </div>
            </div>
          </div>
        </Link>
        
      )) || <Skeleton width="20vw" height="27vw" borderRadius="1vw" />}
    </>
  );
}
