import {React,useState} from 'react';
import Select from 'react-select';
import Box from '@mui/material/Box';

const experience = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
];
const numberOfEmployees = [
  { value: '1-10', label: '1-10' },
  { value: '11-20', label: '11-20' },
  { value: '21-50', label: '21-50' },
  { value: '51-100', label: '51-100' },
  { value: '100-200', label: '100-200' },
  { value: '201-500', label: '201-500' },
  { value: '500+', label: '500+' },
];
const workMode = [
  { value: 'Remote', label: 'Remote' },
  { value: 'Hybrid', label: 'Hybrid' },
  { value: 'In-office', label: 'In-office' },
];
const minimumSalary = [
  { value: '0', label: '0L' },
  { value: '10L', label: '10L' },
  { value: '20L', label: '20L' },
  { value: '30L', label: '30L' },
  { value: '40L', label: '40L' },
  { value: '50L', label: '50L' },
  { value: '60L', label: '60L' },
  { value: '70L', label: '70L' },
];
export function Filters() {
  // const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    experience: [],
    numberOfEmployees: [],
    workMode:[],
    minimumSalary:null
  });
 
  // const handleSearchChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };
  const handleFilterChange = (filterName, selectedOption) => {
    if (selectedOption && selectedOption.length > 0) {
      setSelectedFilters({ ...selectedFilters, [filterName]: selectedOption.map((option) => option.value) });
    } else {
      const { [filterName]: removedFilter, ...remainingFilters } = selectedFilters;
      setSelectedFilters(remainingFilters);
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex',flexWrap: 'wrap',flexDirection: 'row',justifyContent: 'flex-start' ,p: 1,m: 1 ,gap:'0.5rem'}}>
          <div style={{ width: '14rem' }}>
            <Select
              isMulti
              className="react-select-styled react-select-solid"
              classNamePrefix="react-select"
              options={numberOfEmployees}
              placeholder="Number Of Employees"
              isClearable
              value={selectedFilters.numberOfEmployees ? selectedFilters.numberOfEmployees.map(exp => ({ value: exp, label: exp})) : null}
              onChange={(selectedOption) => handleFilterChange('numberOfEmployees', selectedOption)}
            />
          </div>
          <div  style={{ width: '10rem' }}>
              <Select
                isMulti
                className="react-select-styled react-select-solid"
                classNamePrefix="react-select"
                options={experience}
                placeholder="Experience"
                isClearable
                value={selectedFilters.experience ? selectedFilters.experience.map(exp => ({ value: exp, label: exp})) : null}
                onChange={(selectedOption) => handleFilterChange('experience', selectedOption)}
              />
            </div>
            <div  style={{ width: '13rem' }}>
              <Select
                isMulti
                className="react-select-styled react-select-solid"
                classNamePrefix="react-select"
                options={workMode}
                placeholder="Remote"
                isClearable
                value={selectedFilters.workMode ? selectedFilters.workMode.map(exp => ({ value: exp, label: exp})) : null}
                onChange={(selectedOption) => handleFilterChange('workMode', selectedOption)}
              />
            </div>
            <div  style={{ width: '16rem' }}>
              <Select
                isMulti
                className="react-select-styled react-select-solid"
                classNamePrefix="react-select"
                options={minimumSalary}
                placeholder="Minumum Base Pay Salary"
                isClearable
                value={selectedFilters.minimumSalary ? selectedFilters.minimumSalary.map(exp => ({ value: exp, label: exp})) : null}
                onChange={(selectedOption) => handleFilterChange('minimumSalary', selectedOption)}
              />
            </div>
            <input
              type="text"
              className=""
              style={{ width: "12rem"}}
              placeholder="Search Company"
              // value={searchQuery}
              // onChange={handleSearchChange}
          />
        </Box>
    </div>
  );
}
