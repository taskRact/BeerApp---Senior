import { Beer as IBeer } from '../../types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { CardContent, ListItem, List, ListItemIcon, ListItemText} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WineBarIcon from '@mui/icons-material/WineBar';

type beerProps = {
  beer: IBeer
}

const Beer = (props: beerProps) => {
  const { beer } = props;
  // eslint-disable-next-line
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        
        title={beer.name}
      />
      <CardMedia
        component="img"
        height="194"
        image={`/images/images_${Math.floor(Math.random() * 3)}.jpeg`}
        alt="Paella dish"
      />
      <CardContent>
    
          <List>
            <ListItem>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary={`${beer.street}, ${beer.city}, ${beer.state}`} />
            </ListItem>
            <ListItem>
            <ListItemIcon>
                <LocalPhoneIcon />
              </ListItemIcon>
              <ListItemText primary={beer.phone} />
            </ListItem>

            <ListItem>
            <ListItemIcon>
                <WineBarIcon />
              </ListItemIcon>
              <ListItemText primary={beer.brewery_type} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText primary={<a href={beer.website_url} target="_blank" rel="noopener noreferrer">{beer.website_url}</a>} />
            </ListItem>
          </List>
      </CardContent>
    </Card>
  );
};

export default Beer;
