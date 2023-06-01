import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Diversity3Icon from '@mui/icons-material/Diversity3';
type Service = {
  title: string;
  description: string;
  image: React.ElementType;  
}; 
export const servicesData: Service[] = [
    {
      title: "Finding a Resident",
      description: "Your property is aggressively marketed through multiple avenues. We also network with agents from other firms who specialize in working with renters, and with local corporate relocation contacts who assist individuals moving into our area.",
      image: VolunteerActivismIcon,
    },
    {
      title: "Partnerships",
      description: "you have an real estate agency and you want to improve your experience with the clients , advetisings , good marketing  to reach max possible clients and show your properties , contact us to be partenters ",
      image: HandshakeIcon,
    },
    {
      title: "Property Marketing",
      description: "Marketing your property to potential renters and residents is important. In today's digital world, listing services is just the beginning. We work with you to create a comprehensive plan to meet the needs of your unique property ",
      image: ApartmentIcon,
    },
    {
      title: "Communication",
      description: "if you find your desire property , now you can communicate with the owners , talk about the feature  and the price , out website offer you  a  chat room to make busniss directly between the buyers and the the owners",
      image: Diversity3Icon,
    },
     
   
  ];
  