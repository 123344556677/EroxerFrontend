import ChatPortion from 'components/ChatPortion/ChatPortion'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Button, Card, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'
import postOne from './j46.png'
import './post.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileBase64 from "react-file-base64";
import { createAd } from 'Api/Api'
import { getUsersById } from 'Api/Api'
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import { getUserById } from 'components/redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const firebaseConfig = {
  apiKey: "AIzaSyCnY9bzvS6ZiF0wn1_kDGp_ljWGo3sZSxA",
  authDomain: "images-7611f.firebaseapp.com",
  projectId: "images-7611f",
  storageBucket: "images-7611f.appspot.com",
  messagingSenderId: "410713197024",
  appId: "1:410713197024:web:f4cb6a922d309976c38385",
  measurementId: "G-ENS46GYQRS",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const CreatePost = () => {
   const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
   const [avaialableFor,setAvailableFor]=useState('');
   const [time,setTme]=useState();
   const [date,setDate]=useState();
   const [gender,setGender]=useState('');
   const [meetingType,setMeetingType]=useState('');
   const [description,setDescription]=useState('');
   const [adPic,setAdPic]=useState('');
   const [country,setCountry]=useState('');
   const [city,setCity]=useState('');
   const [adress,setAdress]=useState('');
   const [province, setProvince] = useState('')
   const [age, setAge] = useState()
   const [animationCheck, setAnimationCheck] = useState(false)
   const getUser= useSelector(state => state?.getUserById);
  const userData=getUser?.userData
    const Values={
        userId:userId.id
      }
      const dispatch=useDispatch()
     useEffect(()=>{
      
        dispatch(getUserById(Values))
     },[])
   const handleAdPic=(e)=>{
        setAdPic(e.selectedFile.base64);
        
    }
    const cityList = [
{ name: "New York", country: "United States" },
  { name: "Los Angeles", country: "United States" },
  { name: "Chicago", country: "United States" },
  { name: "Houston", country: "United States" },
  { name: "Toronto", country: "Canada" },
  { name: "Vancouver", country: "Canada" },
  { name: "London", country: "United Kingdom" },
  { name: "Paris", country: "France" },
  { name: "Berlin", country: "Germany" },
  { name: "Moscow", country: "Russia" },
  { name: "Tokyo", country: "Japan" },
  { name: "Osaka", country: "Japan" },
  { name: "Sydney", country: "Australia" },
  { name: "Melbourne", country: "Australia" },
  { name: "Auckland", country: "New Zealand" },
  { name: "Dubai", country: "United Arab Emirates" },
  { name: "Abu Dhabi", country: "United Arab Emirates" },
  { name: "Doha", country: "Qatar" },
  { name: "Mumbai", country: "India" },
  { name: "New Delhi", country: "India" },
  { name: "Bangkok", country: "Thailand" },
  { name: "Seoul", country: "South Korea" },
  { name: "Shanghai", country: "China" },
  { name: "Beijing", country: "China" },
  { name: "Hong Kong", country: "China" },
  { name: "Taipei", country: "Taiwan" },
  { name: "Manila", country: "Philippines" },
  { name: "Jakarta", country: "Indonesia" },
  { name: "Hanoi", country: "Vietnam" },
  { name: "Ho Chi Minh City", country: "Vietnam" },
  { name: "Buenos Aires", country: "Argentina" },
  { name: "Santiago", country: "Chile" },
  { name: "Rio de Janeiro", country: "Brazil" },
  { name: "São Paulo", country: "Brazil" },
  { name: "Lima", country: "Peru" },
  { name: "Mexico City", country: "Mexico" },
  { name: "Guadalajara", country: "Mexico" },
  { name: "Cancún", country: "Mexico" },
  { name: "Amsterdam", country: "Netherlands" },
  { name: "Brussels", country: "Belgium" },
  { name: "Copenhagen", country: "Denmark" },
  { name: "Stockholm", country: "Sweden" },
  { name: "Helsinki", country: "Finland" },
  { name: "Oslo", country: "Norway" },
  { name: "Madrid", country: "Spain" },
  { name: "Barcelona", country: "Spain" },
  { name: "Rome", country: "Italy" },
  { name: "Milan", country: "Italy" },
  { name: "Athens", country: "Greece" },
  { name: "Istanbul", country: "Turkey" },
  { name: "Cairo", country: "Egypt" }


    ];


  const countries = [
  { name: "Afghanistan", code: "AF" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "American Samoa", code: "AS" },
  { name: "Andorra", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Anguilla", code: "AI" },
  { name: "Antarctica", code: "AQ" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Aruba", code: "AW" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bermuda", code: "BM" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Bouvet Island", code: "BV" },
  { name: "Brazil", code: "BR" },
  { name: "British Indian Ocean Territory", code: "IO" },
  { name: "Brunei Darussalam", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Cape Verde", code: "CV" },
  { name: "Cayman Islands", code: "KY" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Christmas Island", code: "CX" },
  { name: "Cocos (Keeling) Islands", code: "CC" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Cook Islands", code: "CK" },
  { name: "Costa Rica", code: "CR" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Curaçao", code: "CW" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Democratic Republic of the Congo", code: "CD" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "East Timor", code: "TL" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Eswatini", code: "SZ" },
  { name: "Ethiopia", code: "ET" },
  { name: "Falkland Islands (Malvinas)", code: "FK" },
  { name: "Faroe Islands", code: "FO" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "French Guiana", code: "GF" },
  { name: "French Polynesia", code: "PF" },
  { name: "French Southern Territories", code: "TF" },
  { name: "Gabon", code: "GA" },
{ name: "Gambia", code: "GM" },
{ name: "Georgia", code: "GE" },
{ name: "Germany", code: "DE" },
{ name: "Ghana", code: "GH" },
{ name: "Greece", code: "GR" },
{ name: "Grenada", code: "GD" },
{ name: "Guatemala", code: "GT" },
{ name: "Guinea", code: "GN" },
{ name: "Guinea-Bissau", code: "GW" },
{ name: "Guyana", code: "GY" },
{ name: "Haiti", code: "HT" },
{ name: "Honduras", code: "HN" },
{ name: "Hungary", code: "HU" },
{ name: "Iceland", code: "IS" },
{ name: "India", code: "IN" },
{ name: "Indonesia", code: "ID" },
{ name: "Iran", code: "IR" },
{ name: "Iraq", code: "IQ" },
{ name: "Ireland", code: "IE" },
{ name: "Israel", code: "IL" },
{ name: "Italy", code: "IT" },
{ name: "Jamaica", code: "JM" },
{ name: "Japan", code: "JP" },
{ name: "Jordan", code: "JO" },
{ name: "Kazakhstan", code: "KZ" },
{ name: "Kenya", code: "KE" },
{ name: "Kiribati", code: "KI" },
{ name: "Kuwait", code: "KW" },
{ name: "Kyrgyzstan", code: "KG" },
{ name: "Laos", code: "LA" },
{ name: "Latvia", code: "LV" },
{ name: "Lebanon", code: "LB" },
{ name: "Lesotho", code: "LS" },
{ name: "Liberia", code: "LR" },
{ name: "Libya", code: "LY" },
{ name: "Liechtenstein", code: "LI" },
{ name: "Lithuania", code: "LT" },
{ name: "Luxembourg", code: "LU" },
{ name: "Macao", code: "MO" },
  { name: "North Macedonia", code: "MK" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Martinique", code: "MQ" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mayotte", code: "YT" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia (Federated States of)", code: "FM" },
  { name: "Moldova (Republic of)", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montenegro", code: "ME" },
  { name: "Montserrat", code: "MS" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "New Caledonia", code: "NC" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "Niue", code: "NU" },
  { name: "Norfolk Island", code: "NF" },
  { name: "Northern Mariana Islands", code: "MP" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestine, State of", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Pitcairn", code: "PN" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Puerto Rico", code: "PR" },
  { name: "Qatar", code: "QA" },
  {
    name: "Russia",
    code: "RU"
  },
  {
    name: "Rwanda",
    code: "RW"
  },
  {
    name: "Saint Kitts and Nevis",
    code: "KN"
  },
  {
    name: "Saint Lucia",
    code: "LC"
  },
  {
    name: "Saint Vincent and the Grenadines",
    code: "VC"
  },
  {
    name: "Samoa",
    code: "WS"
  },
  {
    name: "San Marino",
    code: "SM"
  },
  {
    name: "Sao Tome and Principe",
    code: "ST"
  },
  {
    name: "Saudi Arabia",
    code: "SA"
  },
  {
    name: "Senegal",
    code: "SN"
  },
  {
    name: "Serbia",
    code: "RS"
  },
  {
    name: "Seychelles",
    code: "SC"
  },
  {
    name: "Sierra Leone",
    code: "SL"
  },
  {
    name: "Singapore",
    code: "SG"
  },
  {
    name: "Slovakia",
    code: "SK"
  },
  {
    name: "Slovenia",
    code: "SI"
  },
  {
    name: "Solomon Islands",
    code: "SB"
  },
  {
    name: "Somalia",
    code: "SO"
  },
  {
    name: "South Africa",
    code: "ZA"
  },
  {
    name: "South Sudan",
    code: "SS"
  },
  {
    name: "Spain",
    code: "ES"
  },
  {
    name: "Sri Lanka",
    code: "LK"
  },
  {
    name: "Sudan",
    code: "SD"
  },
  {
    name: "Suriname",
    code: "SR"
  },
  {
    name: "Sweden",
    code: "SE"
  },
  {
    name: "Switzerland",
    code: "CH"
  },
  {
    name: "Syria",
    code: "SY"
  },
  {
    name: "Taiwan",
    code: "TW"
  },
  {
    name: "Tajikistan",
    code: "TJ"
  },
  {
    name: "Tanzania",
    code: "TZ"
  },
  {
    name: "Thailand",
    code: "TH"
  },
  {
    name: "Timor-Leste",
    code: "TL"
  },
  {
    name: "Togo",
    code: "TG"
  },
  {
    name: "Tonga",
    code: "TO"
  },
  {
    name: "Trinidad and Tobago",
    code: "TT"
  },
  {
    name: "Tunisia",
    code: "TN"
  },
  {
    name: "Turkey",
    code: "TR"
  },
  {
    name: "Turkmenistan",
    code: "TM"
  },
  {
    name: "Tuvalu",
    code: "TV"
  },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Venezuela", code: "VE" },
  { name: "Vietnam", code: "VN" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" }


]
const history=useHistory()
   const ad=async(e)=>{
   e.preventDefault();
     setAnimationCheck(true)
     
 if(country!== ''&&gender!== ''&&city!== ''&&time!== ''&&date!== ''&&meetingType !== ''){
  const fileName = Date.now() + '.jpg';
const fileRef = ref(storage,  fileName);
  console.log("ad making")
uploadString(fileRef, adPic, 'data_url').then((snapshot) => {
  console.log('Uploaded a blob or file!', snapshot);

  // Get the URL of the uploaded image location
  getDownloadURL(fileRef).then(async(url) => {
    console.log('Image URL:', url);
    setAdPic(url)

    // Use the image URL in an <img> tag
    const values={
      userId:userId.id,
      avaialableFor:avaialableFor,
      time:time,
      date:date,
      gender:gender,
      meetingType:meetingType,
      description:description,
      adPic:url,
      userData:userData,
      adress:adress,
      country:country,
      city:city,
      age:age,
      province:province




    }
    console.log(values,"ad making")
   
    await createAd(values)
    .then((res)=>{
      if (res.data.message === "ad Generated") {
             toast.success('Ad Created', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
     setTimeout(() => {
          history.push("/admin/home");
        }, 2000);
  
  }
  else{
    toast.error('Server Error', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
    setAnimationCheck(false)
  }
    })
  
  
  
    
})
}).catch((error) => {
  console.error('Failed to upload file:', error);
});
 }
else{
       
      toast.warning('please select all fields', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
    setAnimationCheck(false)
  }
    

  }


  return (
    <div className='content'>
    
    <Row>
    {
      userData?.creator===true&&
    <Col xl={8} className="text-center">
    {
    
    // <Row>
    //  <Col>
    //  <h1 className='home-title'>Alex Rock</h1>
    //  </Col>
    //  <Col  xl={8}>
    
    //  <div className="home-input-addon">
    //  <InputGroup style={{ borderRadius: '20px' }} >
    //   <InputGroupAddon addonType="prepend" className='home-search' style={{ background: 'black', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
    //     <InputGroupText style={{ borderColor: 'white',borderRadius:"20px 0 0 20px" }}>
    //       <FaSearch className="home-search" style={{ color: 'white' }} />
    //     </InputGroupText>
    //   </InputGroupAddon>
    //   <Input style={{ background: 'black', borderColor: 'white', borderTopRightRadius: '20px', borderBottomRightRadius: '20px', color: 'white' }} placeholder="Search" />
    // </InputGroup>
    // </div>
    //  </Col>

    //  </Row>
    }
      <h2 className='text-center text-white' style={{fontWeight:"600"}}>Create Ad <br/>
For your Meeting</h2>
     <Card className=" " style={{backgroundColor:"#1e1e2b",borderRadius:"4px",border:"1px solid white"}} >
    <h1 className='mt-5 mb-5'>
    <div  style={{opacity:"0",position:"absolute",zIndex:"10"}}>
    <FileBase64
        type="file"
        className="text-center"
        onDone={(base64) => handleAdPic({ selectedFile: base64 })}
       style={{cursor:"pointer"}}


    />
    </div>
   <img src={adPic?adPic:postOne} style={{width:adPic&&"80%",zIndex:"5"}}/>
     
    </h1>
   

    </Card>
    <Form onSubmit={ad}>
    <Input
        id="exampleEmail"
        placeholder=" I am avaialable for..."
        type="text"
        className='post-input'
        onChange={(e)=>setAvailableFor(e.target.value)}
        required
       
      />
       <Input
        id="exampleEmail"
        placeholder="Adress"
        type="text"
        className='post-input mt-4'
        onChange={(e)=>setAdress(e.target.value)}
        required
               
      />
       <Row className='mt-4'>
      <Col>
       
    
    <Input
      id="exampleSelect"
      name="select"
      type="select"
      className='post-input ad-option'
      // placeholder='Gender'
       onChange={(e)=>setCountry(e.target.value)}
       required
    >
    
       <option>
      Country
       
      </option>
      {
    countries?.map((data)=>(
        <option>
        {data?.name}
       
      </option>
    ))
    }
      
      
      
    </Input>
  
      </Col>
      <Col>
       
    <Input
      id="exampleSelect"
      name="select"
      type="select"
      className='post-input ad-option'
      placeholder='Meeting Type'
       onChange={(e)=>setCity(e.target.value)}
       required
    >
      <option>
       City
      </option>
      {
    cityList?.map((data)=>(
        <option className=''>
        {data?.name}
       
      </option>
    ))
    }
      
    </Input>
 
      </Col>
      
      </Row>
      
      <Row className='mt-4'>
      <Col>
       <Input
        id="exampleEmail"
        name="datetime"
        placeholder="Month,Date"
        type="date"
        className='post-input '
         onChange={(e)=>setDate(e.target.value)}
       
      />
      </Col>
      <Col>
  
    <Input
      id="exampleSelect"
      name="select"
      placeholder="Time"
      type="time"
      className='post-input'
       onChange={(e)=>setTme(e.target.value)}
      
    />
      

      </Col>
      
      </Row>
      
      <Row className='mt-4'>
      <Col>
       <Input
        id="exampleEmail"
        name="age"
        placeholder="Age"
        type="number"
        className='post-input '
         onChange={(e)=>setAge(e.target.value)}
         required
       
      />
      </Col>
      <Col>
  
    <Input
      id="exampleSelect"
      name="province"
      placeholder="Province"
      type="text"
      className='post-input'
       onChange={(e)=>setProvince(e.target.value)}
       required
      
    />
      

      </Col>
      
      </Row>
      
      <Row className='mt-4'>
      <Col>
       
    
    <Input
      id="exampleSelect"
      name="select"
      type="select"
      className='post-input'
      placeholder='Gender'
       onChange={(e)=>setGender(e.target.value)}
       required
    >
      <option>
       Gender
      </option>
      <option>
        Male
      </option>
      <option>
        Female
      </option>
      <option>
        Other
      </option>
      
    </Input>
  
      </Col>
      <Col>
       
    <Input
      id="exampleSelect"
      name="select"
      type="select"
      className='post-input'
      placeholder='Meeting Type'
       onChange={(e)=>setMeetingType(e.target.value)}
       required
    >
      <option>
       Meeting Type
      </option>
      <option>
        Date
      </option>
      <option>
        One night
      </option>
      <option>
        Casual
      </option>
      <option>
        Fan
      </option>
    </Input>
 
      </Col>
      
      </Row>
       <Input
      id="exampleText"
      name="text"
      type="textarea"
      placeholder='Description'
      className='post-text mt-4'
      onChange={(e)=>setDescription(e.target.value)
      
      }
      required
      
    />
    <Row className='justify-content-end mt-3'>
    {
      animationCheck?
      <lottie-player  src="https://assets6.lottiefiles.com/packages/lf20_vpxae5vy.json"  background="transparent"  speed="1"  style={{width: "100px", height: "100px"}}  loop  autoplay></lottie-player>
      :
    <Button type="submit" className='reset-button mr-2' >Save</Button>
    }
    </Row>
    </Form>
    </Col>
  }
    {
      userData?.creator===false&&
      
      <h3 className='text-center ml-lg-5' >Please become eroxr member by buying our member ship!</h3>
          }
    
    <Col xl={4}>
    <ChatPortion/>
    
    </Col>
    
    </Row>
  
  
    
    <ToastContainer />
    </div>
  )
}

export default CreatePost