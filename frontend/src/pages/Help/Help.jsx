import './Help.scss';

export function Help({
}) {
  
  return (
    <div>
        <br></br>
        <h1><center>Help</center></h1>
        <br></br>
        <hr></hr>
        <br></br>
        {/* <center> */}
            <div className='container'>
                <div>
                    Shelter is a simple and user friendly application for the users to manage their 
                    building related issues and operations. We understand that you might be facing 
                    a few difficulties while using Shelter. Therefore, here are a few frequently 
                    asked questions regarding the application.
                </div>
                
                <div className='section'>
                    <h3><b>Frequent Asked Questions</b></h3>
                    <hr></hr>
                    <br></br>
                </div>

                <ol className="order_list">
                    <li>
                        <b>Do we need to pay to avail any of the Shelter service?</b>
                        <br></br>
                        No. Shelter provides free services for the management of building related 
                        issues / concerns.
                    </li>
                    <li>
                        <b>Can anyone use this applications?</b>
                        <br></br>
                        Yes. Anyone willing to join our building as tenant can use this application. 
                        We welcome everyone from any part of the world with restriction applied.
                    </li>
                    <li>
                        <b>Should we visit physically for the application if we do not wish to?</b>
                        <br></br>
                        No. Shelter provides digital solutions for various operations which were used 
                        were used to be completed physically before. For the application as tenant, you 
                        are not expected to visit us before your move in date.
                    </li>
                    <li>
                        <b>What all identification cards will be required to join as tenants?</b>
                        <br></br>
                        Any government authorised national identification card will be applicable to be 
                        used as identification card. Acceptance of private identification cards is subject 
                        to approval by the managers.
                    </li>
                </ol>

                <div className='section'>
                    If the answers to these frequently asked are not able to answer your queries you can 
                    email you concern to <b>manager.bob.builder@shelter.com</b>. We will get back to you 
                    in 1-2 working days.
                </div>
            </div>
        {/* </center> */}
    </div>
  );
}

export default Help;
