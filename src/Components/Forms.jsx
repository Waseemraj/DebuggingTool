import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './Forms.scss'
import axios from 'axios';
import { useState } from 'react';
import { useUserDetails } from '../Contexts/Usercontext';
import { Userinfo } from './Userinfo';
import { aore, afra, achm } from '../data';
import 'react-toastify/dist/ReactToastify.css';

export const Forms = () => {
    const { User, setUser, checkID, checkSub } = useUserDetails()
    const [error, setError] = useState(false)
    const [info, setinfo] = useState(false)
    const [snackopen, setSnackOpen] = useState(false);
    const handleClose = () => { setSnackOpen(false) }
    const INT_BASE_URL = `https://msft-presence-service.int-first-general1.ciscospark.com/`
    let allmaps = {};
    async function handleSubmit(e) {
        e.preventDefault();
        console.log('handle');
        console.log(User)
        if (User.environment === 'Production') {
            console.log('Production Environment');
            let userExists = false;
            if (aore.wxUserMapping && aore.wxUserMapping[User.userdetail]) {
                console.log(aore.wxUserMapping[User.userdetail]);
                const { wxUserId, msUserId, wxOrgId } = aore.wxUserMapping[User.userdetail];
                return <Userinfo wxUserId={wxUserId} msUserId={msUserId} wxOrgId={wxOrgId} />;    
            }
            if (achm.wxUserMapping && achm.wxUserMapping[User.userdetail]) {
                console.log(achm.wxUserMapping[User.userdetail]);
                const { wxUserId, msUserId, wxOrgId } = achm.wxUserMapping[User.userdetail];
                return <Userinfo wxUserId={wxUserId} msUserId={msUserId} wxOrgId={wxOrgId} />;     
            }
            if (afra.wxUserMapping && afra.wxUserMapping[User.userdetail]) {
                console.log(afra.wxUserMapping[User.userdetail]);
                const { wxUserId, msUserId, wxOrgId } = afra.wxUserMapping[User.userdetail];
                return <Userinfo wxUserId={wxUserId} msUserId={msUserId} wxOrgId={wxOrgId} />;   
            }
            if (!userExists) {
                window.alert('User does not exist');
            }
        }
        else {
            const Mapping_URL = INT_BASE_URL + 'msft-presence-service/api/v1/allUserMapping'
            await axios.get(Mapping_URL, { headers: { "Authorization": `Bearer ${User.token}` } })
                .then(res => { allmaps = res.data; setinfo(true); checkID(res.data, User) })

            const Subscription_URL = INT_BASE_URL + 'msft-presence-service/api/v1/allSubscriptions'
            await axios.get(Subscription_URL, { headers: { "Authorization": `Bearer ${User.token}` } })
                .then(res => { checkSub(allmaps, res.data.subscribedUser, User) })
            if (User.userdetail.length === 0 || User.token.length === 0) { setError(true) }
            else { setSnackOpen(true) }
        }
    }
    return (
        <>
            {snackopen && <Snackbar open={snackopen} autoHideDuration={3000} onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Submitted Successfully
                </Alert>
            </Snackbar>}
            <div className='container'>
                <div className='formcard'><Card variant='outlined' className='card' >
                    <Typography sx={{ fontWeight: '700', fontSize: '25px', marginBottom: '-12px', color: 'black' }} component="div" variant="h5">
                        Diagnostic Tool
                    </Typography>
                    <form className='forms' onSubmit={handleSubmit}>
                        <hr />
                        {/* Environment Selection  with default value is Integration */}
                        <div className="formfield">
                            <label className='label' htmlFor='environment'>Environment<span >*&nbsp;</span>:&nbsp; </label>
                            <TextField
                                id="environment"
                                defaultValue="Integration"
                                required
                                select
                                size="small"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setUser({ ...User, environment: e.target.value })
                                }}>
                                <MenuItem value={'Integration'}>Integration</MenuItem>
                                <MenuItem value={'Production'}>Production</MenuItem>
                            </TextField>
                        </div>
                        {/* Enter user Detail textfield with required  */}
                        <div className="formfield">
                            <label className='label' htmlFor='userdetail'>User Detail<span >*</span>&nbsp;:&nbsp; </label>
                            <TextField
                                className='textfield'
                                required
                                width={80}
                                size="small"
                                id="userdetail"
                                variant="outlined"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setUser({ ...User, userdetail: e.target.value })
                                }}/>
                        </div>
                        {error && User.userdetail.length <= 0 ? <span style={{ color: 'red', marginLeft: '151px' }}> This field should not be empty </span> : ''}
                        {/* Enter Token textfield with required  */}
                        <div className="formfield">
                            <label className='label' htmlFor='token'>Token<span >*</span>&nbsp;:&nbsp; </label>
                            <TextField
                                className='textfield'
                                width={80}
                                size="small"
                                required
                                multiline
                                maxRows={4}
                                id="token"
                                variant="outlined"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setUser({ ...User, token: e.target.value })
                                }}/>
                        </div>
                        {error && User.token.length <= 0 ? <span style={{ color: 'red', marginLeft: '151px' }}>This field should not be empty </span> : ''}
                        {/* //Jira option enabled with Yes or No option having default value is Yes  */}
                        {/* <div className="formfield">
                            <label className='label' htmlFor='jiraAccess'>Jira Access&nbsp;:&nbsp;</label>
                            <TextField
                                id="jiraAccess"
                                select
                                size="small"
                                defaultValue="Yes"
                                required
                                onChange={(e) => {
                                    e.preventDefault();
                                    setUser({ ...User, jiraAccess: e.target.value })
                                }}
                            >
                                <MenuItem value={'Yes'}>Yes</MenuItem>
                                <MenuItem value={'No'}>No</MenuItem>
                            </TextField>
                        </div>
                        {/* Enter Jira Details textfield  */}
                        {/* <div className="formfield">
                            <label className='label' htmlFor='jiradetail'>Jira Detail&nbsp;:&nbsp;</label>
                            <TextField size="small" className='textfield'
                                id="jiradetail"
                                variant="outlined"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setUser({ ...User, jiradetail: e.target.value })
                                }}/>
                        </div> */}
                        <br />
                        <hr />
                        {/* Submit Button  */}
                        <div className='button'>
                            <Button onClick={handleSubmit} disabled={User.userdetail.length <= 0 || User.token.length <= 0} size='large' variant="outlined" sx={{ borderRadius: '45px', color: 'black', borderColor: 'black', '&:hover': { borderColor: 'black', bgcolor: 'black', color: 'white' } }}>Submit</Button>
                        </div>
                    </form>
                </Card></div>
                <div className='userInfo'>{info && <Userinfo />}</div>
            </div>
        </>
    )
}
