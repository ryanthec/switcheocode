import React from 'react';
import { Box, Typography } from '@mui/material';

interface WalletRowProps {
  className?: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = ({ className, amount, usdValue, formattedAmount }) => {
  return (
    <Box className={className} 
    sx={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid #ddd' }}>
      <Typography variant="body1">Amount: {formattedAmount}</Typography>
      <Typography variant="body1">USD Value: US${usdValue.toFixed(2)}</Typography>
    </Box>
  );
};

export default WalletRow;