import {React,useState,useEffect} from 'react'
import { Filters } from './Filters'
import {fetchJobData} from '../api/JobService'

export function Home(){
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchJobData();
      setJobData(data);
      console.log(jobData);
    };
    fetchData();
  }, []);
  
  return (
    <div>
         <Filters/>
    </div>
  )
}