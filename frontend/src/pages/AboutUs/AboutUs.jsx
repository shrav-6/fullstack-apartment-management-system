import './AboutUs.scss';
import Grid from '@material-ui/core/Grid';

export function AboutUs({
}) {
  
  return (
    <div className="container">
        <br></br>
        <h1 className="heading"><center>About Us</center></h1>
        <br></br>
        <hr></hr>
        <br></br>
        <div>
            <div className='header'>
            Shelter is a dedicated team offering reliable solutions for global property management.
          Our platform serves as a hub where managers, tenants, and guests can discover new apartment listings and seamlessly connect with one another.
            </div>

            <div className="image">
                <center><img src="/src/assets/about-us-team.jpg" alt="Shelter Team" width="80%" /></center>
            </div>
            
            <Grid container spacing={10}>
                {/* <Row> */}
                    <Grid item xs={6} sm={6} md={6}>
                        <div>
                            <div className="section">
                                <b>Here is our team of developers who develop our products to give uninterrupted services</b>.
                            </div>

                            <ol className="order_list">
                                <li>
                                    Dhruv Kapoor
                                </li>
                                <li>
                                    Disha Anand
                                </li>
                                <li>
                                    Merin Mary Saju
                                </li>
                                <li>
                                    Praveen Kumar Reddy Burla
                                </li>
                                <li>
                                    Shravanthi Elavarthi
                                </li>
                            </ol>
                        </div>
                    </Grid>
                    <Grid item xs={5} sm={5} md={5}>
                        <div>
                            <div className="section">
                                <b>Here is our team who manages the client requests at the frontend</b>
                            </div>
                            
                            <ol className="order_list">
                                <li>
                                    Aditya Pattani
                                </li>
                                <li>
                                    Akshat Ashish Shah
                                </li>
                                <li>
                                    MD Samshad Rahman
                                </li>
                                <li>
                                    Priyanka Ravichandran
                                </li>
                                <li>
                                    Yuci Wang
                                </li>
                            </ol>
                        </div>
                    </Grid>
                {/* </Row> */}
            </Grid>
        </div>
    </div>
  );
}

export default AboutUs;
