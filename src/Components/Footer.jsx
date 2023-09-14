import './Footer.scss'
import Button from '@mui/material/Button';
import LanguageIcon from '@mui/icons-material/Language';

export const Footer = () => {

    const imageUrl = 'https://shorturl.at/jMOP3'
    return (

        <div className="webexlogo">
            <ul>
                <li><img src={imageUrl} height={70}  width={80} alt="webex" /></li>
            </ul>
            <div className='lists'>
                <ul>
                    <li>Get the App</li>
                    <li>About Us</li>
                </ul>
            </div>
            <div className='lists'>
                <ul>
                    <li>Help and Support</li>
                    <li>Terms</li>
                </ul>
            </div>
            <div className='lists'>
                <ul>
                    <li>Privacy Policy</li>
                    <li>Cookie Setting</li>
                    <li>Sitemap</li>
                </ul>
            </div>
            <div>
                <ul>
                    <li><Button variant="outlined" startIcon={<LanguageIcon />} sx={{ borderRadius: '0px', backgroundColor:'white' ,color: 'black', borderColor: 'black', '&:hover': { borderColor: 'black', bgcolor: 'black', color: 'white' } }}>
                    English
                </Button></li>
                </ul>
            </div>
        </div>


    )
}
