import React, { useEffect, useState } from 'react'
import { IoIosMore, IoMdArrowDropdown } from 'react-icons/io'
import { HiLocationMarker } from 'react-icons/hi'
import { AiFillEye, AiFillMail } from 'react-icons/ai'
import './Ads.css'
import cities from 'cities';

// import cardOne from './j27.png'
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Badge,
  CardText,
  CardLink,
  CardSubtitle,
  Media,
  Dropdown,
  CardImg,
} from "reactstrap";
import { BsPersonFillAdd } from 'react-icons/bs'
import { data } from 'jquery'
import cardPic from './j30.png'
import { useHistory } from 'react-router-dom'
import { getAllAds } from 'Api/Api'
import { useDispatch, useSelector } from 'react-redux'
import { getAds as ads } from 'components/redux/actions/adsActions';
import { FaSearch } from 'react-icons/fa'
import { AdCounterIncrement } from 'Api/Api'
import { toast,ToastContainer } from 'react-toastify'

const Ads = () => {
  const history=useHistory()
     const [ViewdropdownOpen, setViewDropdownOpen] = useState(false);
     const [RecentdropdownOpen, setRecentDropdownOpen] = useState(false);
     const [PopulardropdownOpen, setPopularDropdownOpen] = useState(false);
     const [CountrydropdownOpen, setCountryDropdownOpen] = useState(false);
     const [CitydropdownOpen, setCityDropdownOpen] = useState(false);
     const [GenderdropdownOpen, setGenderDropdownOpen] = useState(false);
     const [AgedropdownOpen, setAgeDropdownOpen] = useState(false);
     const [filtereCheck, setFiltereCheck] = useState(false);
     const [filter, setFilter] = useState("");
     const [adData, setAdData] = useState([]);
    const [filtereAds, setFiltereAds] = useState();
     const [country, setCountry] = useState('');
     const [city, setCity] = useState('');
     const [gender, setGender] = useState('');
     const [initialized, setInitialized] = useState(false);
     console.log(country,"============>country")
      
      const Viewtoggle = () => setViewDropdownOpen(!ViewdropdownOpen);
      const Recenttoggle = () => setRecentDropdownOpen(RecentdropdownOpen);
      const Populartoggle = () => setPopularDropdownOpen(!PopulardropdownOpen);
      const Countrytoggle = () => setCountryDropdownOpen(!CountrydropdownOpen);
      const Citytoggle = () => setCityDropdownOpen(!CitydropdownOpen);
      const Gendertoggle = () => setGenderDropdownOpen(!GenderdropdownOpen);
      const Agetoggle = () => setAgeDropdownOpen(!AgedropdownOpen);
      const dispatch=useDispatch()
        const getAds = useSelector(state => state?.getAds);
        
     useEffect(()=>{
    dispatch(ads())
//     for (let i = 0; i < cities.length; i++) {
//   const city = cities[i];
//   console.log(city,"city")
//   cityList.push({
//     name: city.name,
//     country: city.country,
//     latitude: city.lat,
//     longitude: city.lng,
//     // add other properties as needed
//   });
// }
    
    },[])
    useEffect(()=>{
    setFiltereAds(getAds?.ads)
    
    },[getAds])
    useEffect(() => {
    // Call your function here
   
    filteredAds()
    
    
  }, [country,city,gender]);
  console.log(filtereAds,"effect-------------------->")

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
     let dropDowns=[
            {
                 name:"Most view"
            },   
             {
                 name:"Most recents"
            },
             {
                 name:"Most popular"
            },
             {
                 name:"Country"
            },
             {
                 name:"City"
            },
             {
                 name:"Gender"
            },
             {
                 name:"Age"
            },
           
    
    ]
    let Ads=[
        {
            pic:cardPic
        },
        {
            pic:cardPic
        },
        {
            pic:cardPic
        },
        {
            pic:cardPic
        },
        {
            pic:cardPic
        },
        {
            pic:cardPic
        },
    ]
    // let filtereAds=[]
  //  const callingFunction=()=>{
  //   setTimeout(() => {
  //   filteredAds();
  //    }, 15000);
  //  }
    const filteredAds=()=>{
      
     
      console.log(country,"filtered--------->country")
       console.log(city,"filtered--------->country")
       console.log(gender,"filtered--------->gender")
      
        if(country&&city===''&&gender===''){
          console.log(data,"coming in it for ad")
          setFiltereAds(getAds?.ads?.filter(item => item?.country === country));
        }
        if(country&&city&&gender===''){
           console.log(data,"coming in it for CITY ad")
            
         setFiltereAds(getAds?.ads?.filter(item => item?.country === country&&item.city===city));
        }
        if(country&&city&&gender){
         
         setFiltereAds(getAds?.ads?.filter(item => item?.country === country&&item.city===city&&item.gender===gender));
        }
        if(country===''&&city===''&&gender!==''){
           
          setFiltereAds(getAds?.ads?.filter(item => item?.gender === gender));
        }
        if(country===''&&city&&gender!==''){
          setFiltereAds(getAds?.ads?.filter(item => item?.gender === gender&&item.city===city));
        }
        
        if(country===''&&city&&gender===''){
         setFiltereAds(getAds?.ads?.filter(item => item?.city === city));
        }
        if(country&&city===''&&gender!==''){
         setFiltereAds(getAds?.ads?.filter(item => item?.country === country&&item?.gender === gender));
        }
       
       
       
   

    }
    console.log(filtereAds,"ads------->filtered")
    const filteredCountries = countries.filter(country => country.name.startsWith(filter));
    const handleCountry = (e) => {
    setFilter(e.target.innerText);
  }
   const filteringBySearch=(e)=>{
      setFiltereAds( getAds?.ads?.filter(item=> item.userData?.firstName.includes(e.target.value)||item.userData?.lastName.includes(e.target.value)))

    }
    const incrementClick=(id)=>{
      console.log(id,"--------->ap id")
      const values={
      id:id
      }
      AdCounterIncrement(values)

      
    }
const handleAlert=()=>{
      toast.success('you are not subscribed to this user', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
    
      theme: 'dark',
     
    });

}
console.log(adData)
  return (
    <div className='content' style={{zoom:"0.90"}}>
    <Row>
    <Col xl={5} md={5} sm={5} className="">
    
    </Col>
    <Col xl={5} md={5} sm={5} className="">
    <div className="home-input-addon" style={{marginTop:"-45px"}}>
     <InputGroup style={{ borderRadius: '20px' }} >
      <InputGroupAddon addonType="prepend" className='home-search' style={{ background: 'black', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
        <InputGroupText style={{ borderColor: 'white',borderRadius:"20px 0 0 20px" }}>
          <FaSearch className="home-search" style={{ color: 'white' }} />
        </InputGroupText>
      </InputGroupAddon>
      <Input style={{ background: 'black', borderColor: 'white', borderTopRightRadius: '20px', borderBottomRightRadius: '20px', color: 'white',zIndex:"8000" }} placeholder="Search" onChange={(e)=>filteringBySearch(e)} />
    </InputGroup>
    </div>
    </Col>
    </Row>
    <h1 className='text-white mt-1 ml-lg-4' style={{fontStyle:"Roboto"}}>Contact ads</h1>
    <Row className=''>

    {
    //  <Dropdown isOpen={ViewdropdownOpen} toggle={Viewtoggle} className="" style={{marginLeft:"5%"}}>
    //     <DropdownToggle className="dropDown">Most view<IoMdArrowDropdown className='mr-1' style={{fontSize:"20px"}}/></DropdownToggle>
    //     <DropdownMenu className='simple-menu'  >
          
    //       <DropdownItem> Alex Rock</DropdownItem>
    //       <DropdownItem> Jassen Smith</DropdownItem>
    //       <DropdownItem> Brandon Ocean</DropdownItem>
    //     </DropdownMenu>
    //   </Dropdown>
    //   <Dropdown isOpen={RecentdropdownOpen} toggle={Recenttoggle} className="" style={{marginLeft:"5%"}}>
    //     <DropdownToggle className="dropDown">Most recents<IoMdArrowDropdown className='mr-1' style={{fontSize:"20px"}}/></DropdownToggle>
    //     <DropdownMenu className='simple-menu' >
    //       <DropdownItem> Alex Rock</DropdownItem>
    //       <DropdownItem> Jassen Smith</DropdownItem>
    //       <DropdownItem> Brandon Ocean</DropdownItem>
    //     </DropdownMenu>
    //   </Dropdown>
    //   <Dropdown isOpen={PopulardropdownOpen} toggle={Populartoggle} className="" style={{marginLeft:"5%"}}>
    //     <DropdownToggle className="dropDown">Most popular<IoMdArrowDropdown className='mr-1' style={{fontSize:"20px"}}/></DropdownToggle>
    //     <DropdownMenu className='simple-menu' >
    //       <DropdownItem> Alex Rock</DropdownItem>
    //       <DropdownItem> Jassen Smith</DropdownItem>
    //       <DropdownItem> Brandon Ocean</DropdownItem>
    //     </DropdownMenu>
    //   </Dropdown>
    }
     <Dropdown isOpen={GenderdropdownOpen} toggle={Gendertoggle} onClick={()=>{setFiltereAds(getAds?.ads)}} className="" style={{marginLeft:"5%"}}>
        <DropdownToggle className="dropDown toggle-down" >All</DropdownToggle>
       
      </Dropdown>
    
      <Dropdown isOpen={CountrydropdownOpen} toggle={Countrytoggle} className="" style={{marginLeft:"5%"}}>
        <DropdownToggle className="dropDown toggle-down" style={{padding:"100px"}}>{country?country:"Country"}<IoMdArrowDropdown className='mr-1' style={{fontSize:"20px"}}/></DropdownToggle>
        <DropdownMenu className='country-menu'  >
        
       
          
        
            
          
            
            
          {countries.map(country => (
                <DropdownItem key={country.code} onClick={()=>{setCountry(country.name);filteredAds()}}>
                  {country.name}
                </DropdownItem>
             
         
          ))}
        </DropdownMenu>

          
      </Dropdown>
     
      <Dropdown isOpen={CitydropdownOpen} toggle={Citytoggle} className="" style={{marginLeft:"5%"}}>
        <DropdownToggle className="dropDown toggle-down">{city?city:"City"}<IoMdArrowDropdown className='mr-1' style={{fontSize:"20px"}}/></DropdownToggle>
        <DropdownMenu className='country-menu'  >
        {
          cityList.map((data,index)=>(

          
          <DropdownItem onClick={()=>{setCity(data.name);filteredAds()}} key={index}>{data.name}</DropdownItem>
          ))
        }
          
        </DropdownMenu>
      </Dropdown>
     
      <Dropdown isOpen={GenderdropdownOpen} toggle={Gendertoggle} onClick={()=>{setGender("Male");filteredAds()}} className="" style={{marginLeft:"5%"}}>
        <DropdownToggle className="dropDown toggle-down">Looking for Male</DropdownToggle>
       
      </Dropdown>
      
      <Dropdown isOpen={GenderdropdownOpen} toggle={Gendertoggle} onClick={()=>{setGender("Female");filteredAds()}} className="" style={{marginLeft:"5%"}}>
        <DropdownToggle className="dropDown toggle-down">Looking for Female</DropdownToggle>
       
      </Dropdown>
      
      {
      // <Dropdown isOpen={AgedropdownOpen} toggle={Agetoggle} className="" style={{marginLeft:"5%"}}>
      //   <DropdownToggle className="dropDown">Age<IoMdArrowDropdown className='mr-1' style={{fontSize:"20px"}}/></DropdownToggle>
      //   <DropdownMenu className='country-menu' >
      //   {
      //   Array.from({ length: 100 }, (_, i) => (
      //    i>=18&&
      //     <DropdownItem >{i}</DropdownItem>
      //   ))
      //   }
          
      //   </DropdownMenu>
      // </Dropdown>
      }
     
      </Row>
      <Row  className="no-gutters" >
      
      {
       
        filtereAds?.map((data)=>(
      <Col xl={4} >
      <Card className='mt-2 ml-lg-4' style={{backgroundColor:"#161616",borderRadius:"20px",width:"380px",cursor:"pointer"}} onClick={()=>{history.push(`/admin/adDescription/${data._id}`);incrementClick(data._id)}}>
     
  
  <img
    alt="Card cap"
    src={data?.adPic?data?.adPic:cardPic}

   
    className='ml-2 mr-2 mt-2 mb-1 '
    style={{borderRadius:"20px",height:"200px"}}
  />
  <div style={{display:"flex"}} className="ml-4">
  <AiFillEye className='contact-profile'/> <span className='ml-2'  style={{marginTop:"-35px",color:"purple",fontSize:"15px",fontWeight:"700"}}>{data?.counter}</span>
  {
  // <img src="https://picsum.photos/100/100" alt="" className='contact-profile'/>
  // <img src="https://picsum.photos/100/100" alt="" className='contact-profile-one'/>
  // <img src="https://picsum.photos/100/100" alt="" className='contact-profile-one'/>
  }
  </div>
  
  <CardBody>
    <CardText className='ml-1 mb-0 ' style={{fontSize:"20px",fontWeight:"600",color:"white"}}>
     {data?.userData?.profileName?data?.userData?.profileName:data?.userData?.firstName}
    
    </CardText>
    <CardText  className='ml-1 mt-0' href="#" style={{color:"grey",fontWeight:"500"}}>
      {data?.description}
    </CardText>
    <Row className='mt-3'>
    <Col>
     <CardText  className='ml-2' href="#" style={{color:"#F34191",fontWeight:"500"}} onClick={handleAlert}>
      contact
    </CardText>
    </Col>
     <Col className='text-right'>
    <AiFillMail style={{fontSize:"20px",color:"white"}}/>
    </Col>
    </Row>
    
    
</CardBody>
  
</Card>
</Col>
        ))
       
       
      }
</Row>
<ToastContainer/>
    </div>
  )
}

export default Ads