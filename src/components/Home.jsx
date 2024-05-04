// Home.js
import React, { useState, useEffect } from 'react';
import { fetchJobData } from '../api/JobService';
import {JobCard} from './JobCard';
import { Filters } from './Filters';

export function Home() {
  const [jobData, setJobData] = useState([]);
  const [loading ,setLoading]=useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = await fetchJobData();
    setJobData(data.jdList);
    console.log(jobData);
      setLoading(false);
  };

  return (
    <>
    <Filters/>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
      {jobData && jobData.map((job, index) => (
      <JobCard key={index} job={job} />
      ))}
     {loading && <div>loading</div>
}
    </div></>
    
  );
}