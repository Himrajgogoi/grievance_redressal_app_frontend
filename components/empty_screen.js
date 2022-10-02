import { Container } from '@mui/system'
import React from 'react'
import Image from 'next/image'

function EmptyScreen() {
  return (
     <Container sx={{display:'flex', justifyContent:'center', alignItems:'center', minHeight:'50vh'}}>
        <Image src="/empty-folder.png" alt="empty icon" height="100px" width="100px"/>
     </Container>
  )
}

export default EmptyScreen