import React,{useEffect,useState} from "react";
function Home(){
    const [username, setUserName] = useState('');
    const [show,setShow]=useState(false);
    const userHomePage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    
                    "Content-Type": "application/json"
                },
               
            });

            const data = await res.json();
            console.log(data);
            setUserName(data.name);
            setShow(true);
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
        userHomePage();
    }, []);
    return(
        <div className="home-page">
            <div className="home-div">
                <p className="pt-5">Welcome</p>
                <h1>{username}</h1>
                <h2>{show ? "Happy to see you back!":"We are the mern developer"}</h2>
            </div>
        </div>
    )
}
export default Home;