import React from 'react'
import Card from '@mui/material/Card';
import './Userinfo.scss'
import Typography from '@mui/material/Typography';
import { useUserDetails } from '../Contexts/Usercontext';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';



export const Userinfo = ({ props }) => {

  const { userActive, phoneNumber, lastLogin, userFound, userCreationDate, userSubscribed, name } = useUserDetails();
  // const { wxUserId, msUserId, wxOrgId } = props;
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: userFound && userActive ? '#44b700	' : '#ff0000',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: '1px solid currentColor'

      },
    }
  }))

  // const dateObject = new Date(lastLogin);
  // const formattedDate = dateObject.toISOString().split('T')[0];

  return (
    <div>
      <Card className='card' variant='outlined' >
        <Typography sx={{ fontWeight: '700', color: 'black', marginBottom:'6px', padding:'8px' }} component="div" variant="h5">
          User Details Are Following 
          {/* {wxUserId + msUserId +  wxOrgId} */}
          
          <hr></hr>
        </Typography>

        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar alt={name.toUpperCase()} src="./src/assets" sx={{ width: 60, height: 60, marginTop:'14px'}} />
        </StyledBadge>

        {userFound ?
          <div className='userinfoboxmain' >
            <div className='userinfobox'>
              <p className='p1'>Name : </p>
              <p className='p2'>{name.toUpperCase()}</p>
            </div>
            <div className='userinfobox'>
              <p className='p1'>Created At : </p>
              <p className='p2'>{userCreationDate}</p>
            </div>
            <div className='userinfobox'>
              <p className='p1'>Last Login : </p>
              <p className='p2'>{lastLogin}</p>
            </div>
            <div className='userinfobox'>
              <p className='p1'>Phone No. : </p>
              <p className='p2'>{phoneNumber}</p>
            </div>
          </div>
          : <h3 style={{marginTop:'15px', fontSize:'18px', fontWeight:'600'}}>Mapping Not Exist</h3>}
          
        { userSubscribed ? <h3 style={{ backgroundColor: 'green', color: 'white', padding: '6px', margin:'14px', borderRadius: '12px', fontSize:'23px' }}>This User Is Subscribed</h3> : <h3 style={{ backgroundColor: 'red', fontSize:'23px' , color: 'white', padding: '6px', borderRadius: '12px', margin:'18px' }} >User is not Subscribed</h3>}
      </Card>
    </div>
  )
}
