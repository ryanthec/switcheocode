//1. Missing import statements
//Added in missing import statements
import React, { useState, useEffect, useMemo } from 'react';
import { BoxProps, Box } from '@mui/material';
import useWalletBalances from './hooks/useWalletBalances';
import WalletRow from './components/WalletRow';


interface WalletBalance {
    currency: string;
    amount: number;
    //2. Missing blockchain attribute
    //Created a blockchain attribute
    blockchain:string;
  }

  //3. Repeated attributes for formatted wallet balance
  //Extends walletbalance
  interface FormattedWalletBalance extends WalletBalance{
    formatted: string;

  }

  //Create a prices interface for the key number pair
  interface Prices {
    [key: string]: number;
  }
  
  class Datasource {
    //url attribute
    url: string;

    //Datasource object can be constructed using a url link(string)
    constructor(url: string) {
      this.url = url;
    }
  
    //getPrices method will return a key number pair which is basically the price of the object
    async getPrices(): Promise<Prices> {
      //Fetches the price from the datasource url
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error('Failed to fetch prices');
      }
      //If data is fetched successfully, it is returned in json format
      return response.json();
    }
  }
  
  interface Props extends BoxProps {}

  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const [prices, setPrices] = useState<Prices>({});
  
    useEffect(() => {
      const datasource = new Datasource("https://interview.switcheo.com/prices.json");
      //4. Process to set prices used an extra arrow function when it was not required
      //Directly set prices after getting
      datasource.getPrices().then(setPrices)
      .catch(error => {
        console.error(error);
      });
    }, []);
  
      const getPriority = (blockchain: any): number => {
        switch (blockchain) {
          case 'Osmosis':
            return 100
          case 'Ethereum':
            return 50
          case 'Arbitrum':
            return 30
          case 'Zilliqa':
            return 20
          case 'Neo':
            return 20
          default:
            return -99
        }
      }
  
    const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            //5. Condition previously was wrong, only balances over 0 should be returned
            //Fixed condition to only return balances that have a positive amount and has a blockchain that is prioritized in our priority table
            if (balancePriority > -99) {
               return balance.amount > 0;
            }
            return false;
          }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
              return -1;
            } else if (rightPriority > leftPriority) {
              return 1;
            }
            //6. There is no return 0 statement which could lead to errors if both right and left priority are same
            //Added return 0 to ensure no gaps
            return 0;
      });
    }, [balances, prices]);
  
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        //7. Tofixed method did not specific the number of decimal places
        //format to 2 decimal places(money)
        formatted: balance.amount.toFixed(2)
      }
    })
    
    //8. sortedBalances should not be used to map to a balance of type formattedWalletBalance
    //Updated mapping to formattedBalances since balance is of the FormattedWalletBalance type
    const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow 
          //9. classes.row can be simplified to row
          //className set to row, not classes.row
          className="row"
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  
    return (
      //10. Div will not work as it does not support MUI props
      //Changed Div to Box component
      <Box {...rest}>
        {rows}
      </Box>
    )
  }


  export default WalletPage;