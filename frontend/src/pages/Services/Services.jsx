import { Grid } from '@material-ui/core';
import './Services.scss';

import { Link } from 'react-router-dom';

export function Services({
}) {
  
  return (
    <div>
        <br></br>
        <h1><center>Services</center></h1>
        <br></br>
        <hr></hr>
        <br></br>
            <div className='container'>
                <div>
                    Shetler provides numerous services on its digital platform. It is complete comprhensive 
                    package for all the entities related to the building, be it a tenant, manager or guest.
                </div>
                
                <Grid container>
                    <Grid item xs={6} sm={6} md={6}>
                        <div className='services-section'>
                            <h3><b>List of Services</b></h3>
                            <hr></hr>
                            <br></br>
                        </div>
                        <ol className="order_list">
                            <li>
                                Listing all the rooms or apartments which are available for rent / sale purposes - 
                                <b><Link to="/listings">Apartment Listings</Link></b>
                            </li>
                            <li>
                                Application by guest for being a new tenant in the building - 
                                <b><Link to="/apply">Apartment Applications</Link></b>
                            </li>
                            <li>
                                Approval of tenant application by the manager of the building - 
                            </li>
                            <li>
                                Publishing of notices by the managers of the building. These notices can be seen by the managers and tenants only - 
                                <b><Link to="/notices">Notices</Link></b>
                            </li>
                            <li>
                                Writing of concerns by the tenants of the building. Daily life maintenance problems like
                                washroom leakages, electric failures, etc. are covered in this service. These concerns will
                                be forwarded directly to the managers of the building - 
                                <b><Link to="/outdoor-services">Tenant Out Sourced Services</Link></b>
                            </li>
                            <li>
                                Maintenance of the status of the concerns raised by the tenants of the building - 
                                <b><Link to="/listings">Tenants Concern Status</Link></b>
                            </li>
                            <li>
                                Tally of the bills and payments due by the tenants of the building - 
                                <b><Link to="/listings">Tenants Bills</Link></b>
                            </li>
                        </ol>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <div className="services-image">
                            <center>
                                <img src="/src/assets/services-plumber.jpg" alt="Shelter Team" width="80%" height="400px" />
                            </center>
                        </div>
                    </Grid>
                </Grid>
            </div>
    </div>
  );
}

export default Services;
