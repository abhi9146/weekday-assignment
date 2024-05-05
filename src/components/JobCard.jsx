import { Button, Card } from '@mui/material';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

// Define custom styles using makeStyles hook
const useStyles = makeStyles((theme) => ({
  roundedDiv: {
    borderRadius: '10px',
    border: '1px solid black',
    display: 'flex',
    padding: '2px',
    fontSize: '13px',
    width: '8rem',
    marginBottom: '10px'
  },
}));

// JobCard functional component
export function JobCard({ job }) {
    // Initialize styles using makeStyles hook
    const classes = useStyles();
    // State to toggle full job description
    const [showFullDescription, setShowFullDescription] = useState(false);
  
    // Function to toggle job description
    const toggleDescription = () => {
      setShowFullDescription(!showFullDescription);
    };
    // Style for Hourglass icon
    const styleForHourGlass = {
        fontSize: '16px'
    };

    // JSX content of JobCard component
    return (
      <Card style={{ width: '20rem', padding: '10px', marginBottom: '15px', marginLeft: '2rem', marginRight: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
        {/* Display job posting date if available */}
        {job.jobDetailsFromCompany && (
          <div className={classes.roundedDiv}>
            <HourglassTopTwoToneIcon style={styleForHourGlass} />
            <span style={{ fontFamily: "Times New Roman" }}>Posted 10 days ago</span>
          </div>
        )}
        {/* Display company logo, name, job role, and location */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          {job.logoUrl && <img src={job.logoUrl} alt="Company Logo" style={{ height: '3rem', width: '2.5rem' }} />}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {job.companyName && <div style={{ fontSize: '15px', fontFamily: 'monospace', color: '#80808096' }}>{job.companyName}</div>}
            {job.jobRole && <div style={{ fontSize: '19px', fontWeight: 'bold' }}>{job.jobRole}</div>}
            {job.location && <div style={{ fontSize: '13px' }}>{job.location}</div>}
          </div>
        </div>
        {/* Display estimated salary if available */}
        <div>
          {job.minJdSalary && <div><span style={{ fontFamily: 'Georgia' }}>Estimated Salary:</span> {job.minJdSalary} - {job.maxJdSalary} {job.salaryCurrencyCode}</div>}
        </div>
        {/* Display job details and toggle button */}
        {job.jobDetailsFromCompany && (
          <div className="mb-6" style={{ position: 'relative' }}>
            <div style={{ margin: '2px', fontWeight: 'bold' }}>About Company:</div>
            <div style={{ fontWeight: 'bold' }}>About Us:</div>
            <div style={{ fontFamily: "Arial" }}>
              {/* Display full or truncated job description based on state */}
              {showFullDescription ? job.jobDetailsFromCompany : job.jobDetailsFromCompany.substring(0, 250)}
              {/* Add gradient overlay for truncated description */}
              {!showFullDescription && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  backgroundImage: 'linear-gradient(to top, white, transparent)'
                }} />
              )}
              {/* Button to toggle full job description */}
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <button onClick={toggleDescription} style={{ color: 'blue', border: 'none', backgroundColor: 'white' }}>
                  {showFullDescription ? 'View Less' : 'View Job'}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Display job experience range if available */}
        {(job.minExp || job.maxExp) && (
          <div style={{ marginTop: '10px' }}>
            <div style={{ fontFamily: 'Georgia', fontWeight: 'bold' }}>Experience</div>
            <div style={{ fontSize: '13px', marginLeft: '0.5rem' }}>{job.minExp} - {job.maxExp} years</div>
          </div>
        )}
        </div>
        {/* Display buttons for Easy Apply and Unlock Referral Asks */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Button variant="contained" style={{ margin: '6px', backgroundColor: '#55EFC4', color: 'black' }}><ElectricBoltIcon />Easy Apply</Button>
          <Button variant="contained" style={{ margin: '6px', backgroundColor: '#1976D2' }}>Unlock referral asks</Button>
        </div>
      </Card>
    );
}
