// Home.js
import React, { useState, useEffect, useCallback } from 'react';
import { fetchJobData } from '../api/JobService';
import { JobCard } from './JobCard';
import { Filters } from './Filters';

export function Home() {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [fetchingMore, setFetchingMore] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    if (fetchingMore) return; // to Prevent multiple concurrent fetch requests
    setFetchingMore(true);
    setLoading(true);
    try {
      const data = await fetchJobData(page);
      if (data && data.jdList.length > 0) {
        setJobData(prevData => [...prevData, ...data.jdList]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  }, [page, fetchingMore]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 150 >=
      document.documentElement.offsetHeight
    ) {
      fetchData();
    }
  }, [fetchData]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <Filters />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        {jobData.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
        {loading && <div>Loading...</div>}
      </div>
    </>
  );
}
