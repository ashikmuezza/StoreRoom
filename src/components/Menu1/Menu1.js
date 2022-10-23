import React from 'react'
import Feature from '../feature/Feature'
import './Menu1.css'


const Menu1 = () => {
  return (
   
   <div className='menu1 section-margin' id='menu1'>
        
        <div className='menu1-feature'>
            <Feature 
            title="What is IPFS used for?"
            text="
            The Interplanetary File System (IPFS) is a distributed file storage protocol that allows 
            computers all over the globe to store and serve files as part of a giant peer-to-peer 
            network. Any computer, anywhere in the world, can download the IPFS software and start 
            hosting and serving files" />
        </div>
        
        <div className='menu1-heading'>
            <h1 className='gradient__text' > The InterPlanetary File System is a protocol, 
            hypermedia and file sharing peer-to-peer network for storing and sharing data 
            in a distributed file system.</h1>
            <p className='gradient__text'>Explore IPFS</p>
        </div>
        
        <div className='menu1-container'>
            <Feature title="Cost Reduction" text = "IPFS can reduce existing bandwidth costs by more than 60% by taking pieces of files simultaneously from multiple computer nodes."/>
            <Feature title="Decentralization" text = "IPFS is not open or centralized. This allows files to be downloaded from multiple locations in a distributed environment rather than managed by a single organization. This provides a more reliable Internet experience than a centralized structure."/>
            <Feature title="Preservability" text="IPFS is backed up using data mirroring so that the names of files uploaded on IPFS are recorded forever. Version control is provided by Git, a distributed version control system."/>
        </div>


    </div>

  )
}

export default Menu1


//  <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
    
//     <div className="gpt3__whatgpt3-feature">
//     <Feature title="What is GPT-3" text="We so opinion friends me message as delight. Whole front do of plate heard oh ought. His defective nor convinced residence own. Connection has put impossible own apartments boisterous. At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by." />
//     </div>
//     <div className="gpt3__whatgpt3-heading">
//     <h1 className="gradient__text">The possibilities are beyond your imagination</h1>
//     <p>Explore the Library</p>
//     </div>
//     <div className="gpt3__whatgpt3-container">
//     <Feature title="Chatbots" text="We so opinion friends me message as delight. Whole front do of plate heard oh ought." />
//     <Feature title="Knowledgebase" text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b" />
//     <Feature title="Education" text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b" />
//     </div>
// </div> 