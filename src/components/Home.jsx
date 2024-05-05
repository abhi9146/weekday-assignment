import React, { useState, useEffect, useCallback } from 'react';
import { fetchJobData } from '../api/JobService';
import { JobCard } from './JobCard'; 
import { Filters } from './Filters'; 

// Home functional component
export function Home() {
  // State variables for managing data, loading state, pagination, filtering, and search term
  const [allData, setAllData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Function to fetch job data
  const fetchData = useCallback(async () => {
    // Prevent multiple concurrent fetch requests
    if (fetchingMore) return;
    setFetchingMore(true);
    setLoading(true);
    try {
      // Fetch data from API
      const data = await fetchJobData(page);
      if (data && data.jdList.length > 0) {
        // Update allData state with fetched data
        setAllData(prevData => [...prevData, ...data.jdList]);
        // Increment page for pagination
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error);
    } finally {
      // Reset loading state
      setLoading(false);
      setFetchingMore(false);
    }
  }, [page, fetchingMore]); 

  // Fetch data initially on component mount
  useEffect(() => {
    fetchData();
  },[]);

  // Effect to filter job data based on filters and search term
  useEffect(() => {
    let filteredData = [...allData];
    
    // Apply filters
    Object.keys(filters).forEach((filterName) => {
      if (filters[filterName].length > 0) {
        if (filterName === 'minJdSalary') {
          // Filter by minimum salary
          filteredData = allData.filter((job) => {
            const jobMinSalary = parseInt(job[filterName]);
            const jobMaxSalary = parseInt(job['maxJdSalary']);
            return filters[filterName].some((minSalary) => jobMinSalary <= parseInt(minSalary) && jobMaxSalary >= parseInt(minSalary));
          });
        } else if (filterName === 'experience') {
          // Filter by experience
          filteredData = allData.filter((job) => {
            const jobMinExperience = parseInt(job['minExp']);
            const jobMaxExperience = parseInt(job['maxExp']);
            return filters[filterName].some((exp) => jobMinExperience <= parseInt(exp) && jobMaxExperience >= parseInt(exp));
          });
        } else if (filterName === 'workMode'){
          // Filter by work mode
          filteredData = allData.filter((job) =>{
               const mode = job['location'];
               return filters[filterName].some((jobMode) => mode.toLowerCase() === jobMode.toLowerCase());
            }
          );
        }
        else if (filterName === 'roles'){
          // Filter by job roles
          filteredData = allData.filter((job) =>{
               const role = job['jobRole'];
               return filters[filterName].some((jobRole) => role.toLowerCase() === jobRole.toLowerCase());
            }
          );
        }
      }
    });

    // Apply search term
    if (searchTerm) {
      filteredData = filteredData.filter((job) => job.companyName.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Update jobData state with filtered data
    setJobData(filteredData);
  }, [filters, searchTerm, allData]);

  // Function to handle scroll event for infinite scrolling
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 150 >=
      document.documentElement.offsetHeight
    ) {
      // Fetch more data when user scrolls to the bottom
      fetchData();
    }
  });

  // Add scroll event listener on component mount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Remove scroll event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // JSX content of Home component
  return (
    <>
      {/* Render Filters component */}
      <Filters setFilters={setFilters} setSearchTerm={setSearchTerm} /> 
      {/* Render JobCards with loading indicator */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'left' }}>
        {/* Map over jobData to render JobCard components */}
        {jobData.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
        {/* Display loading indicator if data is being fetched */}
        {loading && <div>Loading...</div>}
      </div>
    </>
  );
}
