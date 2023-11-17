/* eslint-disable no-console */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import UpdateIcon from '@mui/icons-material/Update';
import { Link, useNavigate } from 'react-router-dom';

import apartments from '../../static/apartments.jpg';
// import ViewListings from '../../organisms/noticeboard/Managers/ViewListings';

export default function CardforBuilding({ building }) {
  const {
    // id,
    buildingName,
    // address,
    // phoneNumber,
  } = building;

  const navigate = useNavigate();
  const viewListingsHandler = () => {
    console.log('inside function handler');
    navigate('/listings', { state: { buildingName } });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={apartments}
        title="apartment-photo"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Button size="small">{buildingName}</Button>
        </Typography>
      </CardContent>
      <CardActions>
        <Link to="/noticesm">
          <Button size="small">Notice</Button>
        </Link>
        <Button size="small" onClick={viewListingsHandler}>Listings</Button>
      </CardActions>
    </Card>
  );
}
