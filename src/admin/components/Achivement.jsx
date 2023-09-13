import styled from '@emotion/styled';
import { Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const TrignleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute',
});

const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute',
});

const Achivement = () => {
  return (
    <Card className="" sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant="h6" sx={{ letterSpacing: '.25px' }}>
          E-Commerce
        </Typography>
        <Typography variant="body2">Congratulations</Typography>
        <Typography variant="h5" sx={{ my: 3.1 }}>
          420.8k
        </Typography>

        <Button size="small" variant="contained">
          View Sales
        </Button>

        <TrignleImg src=""></TrignleImg>
        <TrophyImg src="https://static.vecteezy.com/system/resources/previews/009/315/016/non_2x/winner-trophy-in-flat-style-free-png.png" />
      </CardContent>
    </Card>
  );
};

export default Achivement;
