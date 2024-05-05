import React, { useState, useEffect, useCallback } from 'react';
import { fetchJobData } from '../api/JobService';
import { JobCard } from './JobCard';
import { Filters } from './Filters';

export function Home() {
  const [allData, setAllData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = useCallback(async () => {
    if (fetchingMore) return; // to Prevent multiple concurrent fetch requests
    setFetchingMore(true);
    setLoading(true);
    try {
      const data = await fetchJobData(page);
      if (data && data.jdList.length > 0) {
        setAllData(prevData => [...prevData, ...data.jdList]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  }, [page, fetchingMore]); 

  useEffect(() => {
    fetchData();
  },[]);

  useEffect(() => {
    let filteredData = [...allData];
    
    Object.keys(filters).forEach((filterName) => {
      if (filters[filterName].length > 0) {
        if (filterName === 'minJdSalary') {
          filteredData = allData.filter((job) => {
            const jobMinSalary = parseInt(job[filterName]);
            const jobMaxSalary = parseInt(job['maxJdSalary']);
            return filters[filterName].some((minSalary) => jobMinSalary <= parseInt(minSalary) && jobMaxSalary>=parseInt(minSalary));
          });
        } else if (filterName === 'experience') {
          filteredData = allData.filter((job) => {
            const jobMinExperience = parseInt(job['minExp']);
            const jobMaxExperience = parseInt(job['maxExp']);
            return filters[filterName].some((exp) => jobMinExperience <= parseInt(exp) && jobMaxExperience >= parseInt(exp));
          });
        } else if (filterName === 'workMode'){
          filteredData = allData.filter((job) =>{
               const mode=job['location'];
               return filters[filterName].some((jobMode)=> mode.toLowerCase()===jobMode.toLowerCase());
            }
          );
        }
        else if (filterName === 'roles'){
          filteredData = allData.filter((job) =>{
               const role=job['jobRole'];
               return filters[filterName].some((jobRole)=> role.toLowerCase()===jobRole.toLowerCase());
            }
          );
        }
      }
    });

    console.log(filters);
    // Apply search term
    if (searchTerm) {
      filteredData = filteredData.filter((job) => job.companyName.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setJobData(filteredData);
  }, [filters, searchTerm, allData]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 150 >=
      document.documentElement.offsetHeight
    ) {
      fetchData();
    }
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <Filters setFilters={setFilters} setSearchTerm={setSearchTerm} /> 
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        {jobData.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
        {loading && <div>Loading...</div>}
      </div>
    </>
  );
}
