import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import apartments from "../../static/apartments.jpg";
import UpdateIcon from '@mui/icons-material/Update';
import { Link } from 'react-router-dom';

export default function CardforBulding({building}) {

  const {
    id,
    buildingName,
    address,
    phoneNumber
  } = building;

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
      <Link to="/listings">
        <Button size="small">Listings</Button>
      </Link>
    </CardActions>
    </Card>
  );
}