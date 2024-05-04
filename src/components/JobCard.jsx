import { Button, Card, CardMedia, Stack, Typography } from '@mui/material';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import {useState} from 'react'

const useStyles = makeStyles((theme) => ({
  roundedDiv: {
    borderRadius: '10px', // Adjust the value to change the roundness
    border: '1px solid black',
    display:'flex',
    padding:'2px',
    fontSize:'14px',
    width:'9rem',
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
        fontSize:'17px'
    }
    return (
      <Card style={{ width: '20rem', padding: '10px', marginBottom: '15px' }}>
        {job.jobDetailsFromCompany && (
          <div className={classes.roundedDiv}>
            <HourglassTopTwoToneIcon style={styleForHourGlass} />
            <span>Posted 10 days ago</span>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          {job.logoUrl && <img src={job.logoUrl} alt="Company Logo" style={{height:'3rem',width:'2.5rem'}}/>}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {job.companyName && <div>{job.companyName}</div>}
            {job.jobRole && <div>{job.jobRole}</div>}
            {job.location && <div>{job.location}</div>}
          </div>
        </div>
        {job.jobDetailsFromCompany && (
          <div className="mb-6" style={{ position: 'relative' }}>
            <div style={{ margin: '2px' }}>About Company:</div>
            <div>About Us:</div>
            <div>
              {showFullDescription ? job.jobDetailsFromCompany : job.jobDetailsFromCompany.substring(0, 100)}
              {!showFullDescription && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  backgroundImage: 'linear-gradient(to top, white, transparent)'
                }} />
              )}
              <button onClick={toggleDescription}>
                {showFullDescription ? 'View Less' : 'View More'}
              </button>
            </div>
          </div>
        )}
        {(job.minExp || job.maxExp) && (
          <div style={{ marginTop: '10px' }}>
            <div>Experience</div>
            <div>{job.minExp} - {job.maxExp} years</div>
          </div>
        )}
        <div>
          <button>Easy Apply</button>
          <button>Unlock referral asks</button>
        </div>
      </Card>
    );
  }
  