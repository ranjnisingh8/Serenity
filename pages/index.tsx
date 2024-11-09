import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to "/marketplace" after component mounts
    router.push('/marketplace');
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return <></>; // Since we're redirecting, this component doesn't render anything directly
};

export default Home;
