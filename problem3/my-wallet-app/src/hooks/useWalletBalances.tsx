import { useState, useEffect } from 'react';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

const useWalletBalances = () => {
  const [balances, setBalances] = useState<WalletBalance[]>([]);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const response = await fetch('INSERT API HERE');
        if (!response.ok) {
          throw new Error('Failed to fetch wallet balances');
        }
        const data: WalletBalance[] = await response.json();
        setBalances(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBalances();
  }, []);

  return balances;
};

export default useWalletBalances;