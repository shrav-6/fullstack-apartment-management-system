import './AboutUs.scss';

export function AboutUs({
}) {
  
  return (
    <div>
        <br></br>
        <h1><center>About Us</center></h1>
        <br></br>
        <hr></hr>
        <br></br>
        {/* <center> */}
            <div className='container'>
                <div>
                    Shetler is a team providing consistent solutions for the management purposes across 
                    the globe. We have covered more onbaorded and served more than 15 reputed clients in 
                    the city of Halifax including Westin Hotel near Port Pier.
                </div>
                
                <div className='section'>
                    Here is our team of developers who develop our products to give uninterrupted services.
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

                <div className='section'>
                    Here is our team who manages the client requests at the frontend
                </div>
                
                <ol className="order_list">
                    <li>
                        Aditya Pattani
                    </li>
                    <li>
                        Akshat
                    </li>
                    <li>
                        Priyanka
                    </li>
                    <li>
                        Yuci
                    </li>
                    <li>
                        ...
                    </li>
                </ol>
            </div>
        {/* </center> */}
    </div>
  );
}


export default AboutUs;
