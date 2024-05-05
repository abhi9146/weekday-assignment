import { Button, Card } from '@mui/material';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import {useState} from 'react'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

const useStyles = makeStyles((theme) => ({
  roundedDiv: {
    borderRadius: '10px', // Adjust the value to change the roundness
    border: '1px solid black',
    display:'flex',
    padding:'2px',
    fontSize:'13px',
    width:'8rem',
    marginBottom:'10px'
  },
}));

export function JobCard({ job }) {
    const classes = useStyles();
    const [showFullDescription, setShowFullDescription] = useState(false);
  
    const toggleDescription = () => {
      setShowFullDescription(!showFullDescription);
    };
    const styleForHourGlass={
        fontSize:'16px'
    }
    return (
      <Card style={{ width: '20rem', padding: '10px', marginBottom: '15px',display: 'flex', flexDirection: 'column',justifyContent: 'space-between' }}>
        <div>
        {job.jobDetailsFromCompany && (
          <div className={classes.roundedDiv}>
            <HourglassTopTwoToneIcon style={styleForHourGlass} />
            <span style={{fontFamily: "Times New Roman"}}>Posted 10 days ago</span>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          {job.logoUrl && <img src={job.logoUrl} alt="Company Logo" style={{height:'3rem',width:'2.5rem'}}/>}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {job.companyName && <div style={{fontSize:'15px',fontFamily:'monospace',color:'#80808096'}}>{job.companyName}</div>}
            {job.jobRole && <div style={{fontSize:'19px',fontWeight:'bold'}}>{job.jobRole}</div>}
            {job.location && <div style={{fontSize:'13px'}}>{job.location}</div>}
          </div>
        </div>
        <div>
          {job.minJdSalary && <div><span style={{fontFamily:'Georgia'}}>Estimated Salary:</span> {job.minJdSalary} - {job.maxJdSalary} {job.salaryCurrencyCode}</div>}
        </div>
        {job.jobDetailsFromCompany && (
          <div className="mb-6" style={{ position: 'relative' }}>
            <div style={{ margin: '2px',fontWeight:'bold' }}>About Company:</div>
            <div style={{fontWeight:'bold'}}>About Us:</div>
            <div style={{fontFamily: "Arial"}}>
              {showFullDescription ? job.jobDetailsFromCompany : job.jobDetailsFromCompany.substring(0, 250)}
              {!showFullDescription && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  backgroundImage: 'linear-gradient(to top, white, transparent)'
                }} />
              )}
              <div style={{textAlign: 'center', marginTop: '10px'}}>
                <button onClick={toggleDescription} style={{color:'blue',border:'none',backgroundColor:'white'}}>
                  {showFullDescription ? 'View Less' : 'View Job'}
                </button>
              </div>
            </div>
          </div>
        )}
        {(job.minExp || job.maxExp) && (
          <div style={{ marginTop: '10px' }}>
            <div style={{fontFamily:'Georgia',fontWeight:'bold'}}>Experience</div>
            <div style={{fontSize:'13px',marginLeft:'0.5rem'}}>{job.minExp} - {job.maxExp} years</div>
          </div>
        )}
        </div>
        <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
          <Button variant="contained" style={{margin:'6px',backgroundColor:'#55EFC4',color:'black'}}><ElectricBoltIcon/>Easy Apply</Button>
          <Button variant="contained" style={{margin:'6px',backgroundColor:'#1976D2'}}>Unlock referral asks</Button>
        </div>
      </Card>
    );
  }
