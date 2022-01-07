import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
function Contact(){
 
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const callContactPage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    
                    "Content-Type": "application/json"
                },
               
            });

            const data = await res.json();
            console.log(data);
            setUserData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            // navigate('/login');
        }
    }

    useEffect(() => {
        callContactPage();
    }, []);
    return(
        <>
          <div className="contact_info">
     <div className="container-fluid">
         <div className="row">
             <div className="col-lg-10 offset-lg-1">
                 <div className="contact_info_container d-flex flex-lg-row flex-column justify-content-between align-items-between">
                     <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                         <div className="contact_info_image">
                         <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="" /></div>
                         <div className="contact_info_content">
                             <div className="contact_info_title">Phone</div>
                             <div className="contact_info_text">+91 1111 543 2198</div>
                         </div>
                     </div> 
                     <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                         <div className="contact_info_image"><img src="https://img.icons8.com/ultraviolet/24/000000/filled-message.png" alt="" /></div>
                         <div className="contact_info_content">
                             <div className="contact_info_title">Email</div>
                             <div className="contact_info_text">contact@thapa.com</div>
                         </div>
                     </div> 
                     <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                         <div className="contact_info_image"><img src="https://img.icons8.com/ultraviolet/24/000000/map-marker.png" alt="" /></div>
                         <div className="contact_info_content">
                             <div className="contact_info_title">Address</div>
                             <div className="contact_info_text">Pune, MH, India</div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
</div>
            



           {/* contact us form  */}

           <div className="contact_form">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="contact_form_container py-5">
                                <div className="contact_form_title">
                                    Get in Touch </div>
                                <form id="contact_form">
                                     <div className="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between"> 
                                        <input type="text" id="contact_form_name"
                                            className="contact_form_name input_field"
                                                
                                            placeholder="Your name" value={userData.name} required />
                                        
                                         <input type="email" id="contact_form_email"
                                            className="contact_form_email input_field"
                                                
                                            placeholder="Your Email" value={userData.email} required />
                                        
                                         <input type="number" id="contact_form_phone"
                                            className="contact_form_phone input_field"
                                            
                                        placeholder="Your Phone Number" value={userData.phone} required  />
                                    </div>

                                    <div className="contact_form_text mt-5">
                                        <textarea className="text_field contact_form_message"
                                           
                                            placeholder="Message" cols="30" rows="10"></textarea>
                                    </div>

                                    <div className="contact_form_button">
                                        <button type="submit" className="button contact_submit_button"
                                        >Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                     </div>
                 </div>   
        </div>

            
        </>
    )
}
export default Contact;