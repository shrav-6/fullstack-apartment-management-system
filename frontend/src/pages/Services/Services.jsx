import './Services.scss';

export function Services({
}) {
  
  return (
    <div>
        <br></br>
        <h1><center>Services</center></h1>
        <br></br>
        <hr></hr>
        <br></br>
        {/* <center> */}
            <div className='container'>
                <div>
                    Shetler provides numerous services on its digital platform. It is complete comprhensive 
                    package for all the entities related to the building, be it a tenant, manager or guest.
                </div>
                
                <div className='section'>
                List of services provided by the application is as follows-
                </div>

                <ol className="order_list">
                    <li>
                        Listing all the rooms or apartments which are available for rent / sale purposes.
                    </li>
                    <li>
                        Application by guest for being a new tenant in the building.
                    </li>
                    <li>
                        Approval of tenant application by the manager of the building.
                    </li>
                    <li>
                        Publishing of notices by the managers of the building. These notices can be seen by tenants only.
                    </li>
                    <li>
                        Writing of concerns by the tenants of the building. These concerns will be forwarded directly to the managers of the building.
                    </li>
                    <li>
                        Maintenance of the status of the concerns raised by the tenants of the building.
                    </li>
                    <li>
                        Tally of the bills and payments due by the tenants of the building.
                    </li>
                </ol>
            </div>
        {/* </center> */}
    </div>
  );
}


export default Services;
