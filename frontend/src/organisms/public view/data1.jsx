import room1 from './images/details-1.jpeg';
import room2 from './images/details-2.jpeg';
import room3 from './images/details-3.jpeg';
import room4 from './images/details-4.jpeg';
import img1_1 from './images/room-1.jpeg';
import img2_1 from './images/room-4.jpeg';
import img3_1 from './images/room-7.jpeg';
import img4_1 from './images/room-10.jpeg';
// Import axios and fetchData function
import fetchData from './fetchData';

const axiosData = await fetchData();

const items = axiosData.data.map((item, index) => ({
  fields: {
    id: item.id.toString(),
    buildingName: item.buildingName,
    buildingNameSlug: item.buildingName,
    unitAvailable: item.unitAvailable,
    rent: item.rent,
    address: item.address,
    pets: item.pets,
    startsFrom: item.startsFrom,
    description: item.description,
    extras: item.extras.split(',').map(extra => extra.trim()),
    images: [{
      fields: {
        file: {
          url: img1_1,
        },
      },
    },
    {
      fields: {
        file: {
          url: room2,
        },
      },
    },
    {
      fields: {
        file: {
          url: room3,
        },
      },
    },
    {
      fields: {
        file: {
          url: room4,
        },
      },
    },
    ],
  },
}));

export default items;
