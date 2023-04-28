import ChatPortion from 'components/ChatPortion/ChatPortion'
import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import privacyOneOne from './j40.png'
const Privacy = () => {
 
    let privacyList=[
        {
            title:"The standard Lorem Ipsum passage, used since the 1500s",
text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

        },
        {
            title:"Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC",
            text:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil  molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
            
        },
        {
ttile:"1914 translation by H. Rackham",
text:"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure  that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
 
 
        },
        {
            title:"Section 1.10.33 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC",
            text:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis   voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
          
        }
    ]
  return (
    <div className='content' >
     <span className='' style={{color:"white",fontSize:"10px",marginLeft:"50px"}} ><Link to="/admin/home"
     style={{color:"white",fontSize:"40px",marginTop:"-80px",position:"absolute"}}><IoMdArrowRoundBack/></Link></span>
    <Row>
    <Col xl={10}>
    <Row className='justify-conten-center'>
    <Col className='text-center'>
    <img src={privacyOneOne} style={{color:"white"}}/>
    <h2 className='text-white mb-0 mt-4' style={{fontWeight:"600"}}>Privacy Policy</h2>
    <p className="" style={{color:"grey",fontSize:"13px"}}>
It's a good idea to use a strong password that you're not using <br/> elsewhere</p>
    </Col>
    
    </Row>
   <FormGroup check className="mt-4" >
    <Input type="radio" className='mt-2' style={{marginLeft:"12%"}}  />
    {' '} <Label style={{color:"white",fontWeight:"600",fontSize:"20px",marginLeft:"15%"}}>Privacy</Label>
    <Row className='justify-content-center'>
    <Col xl={8} style={{zoom:"0.65"}}>
    
<div >
    <ul >
    
    {
        privacyList.map((data)=>(
            <li style={{alignItems:"center"}}>
        <p className='' style={{fontSize:"12px",color:"#AFAEA2"}}>{data.title}</p>
         <p style={{fontSize:"12px",color:"#AFAEA2"}}>{data.text}</p>
         </li>

        ))
    }
    
    
   
    </ul>
    </div>
    </Col>
    </Row>

    
    
  </FormGroup>
  </Col>
  <Col xl={2}>
  <ChatPortion />
  </Col>
    </Row>
    
    
    </div>
  )
}

export default Privacy