import {React,useState} from 'react';
import Select from 'react-select';
import Box from '@mui/material/Box';
import { components } from 'react-select';
import { roles, experience, numberOfEmployees, workMode, minJdSalary } from '../data/filterData';

export function Filters({ setFilters, setSearchTerm }) {
  const [searchTerm, setSearchTermLocal] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    roles: [],
    experience: [],
    numberOfEmployees: [],
    workMode:[],
    minimumSalary:null
  });

  const handleFilterChange = (filterName, selectedOption) => {
    if (selectedOption && selectedOption.length > 0) {
      setFilters(prevFilters => ({ ...prevFilters, [filterName]: selectedOption.map((option) => option.value) }));
      setSelectedFilters({ ...selectedFilters, [filterName]: selectedOption.map((option) => option.value) });
    } else {
      setFilters(prevFilters => {
        const { [filterName]: removedFilter, ...remainingFilters } = prevFilters;
        return remainingFilters;
      });
      const { [filterName]: removedFilter, ...remainingFilters } = selectedFilters;
      setSelectedFilters(remainingFilters);
    }
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTermLocal(newSearchTerm); // Update local state in Filters component
    setSearchTerm(newSearchTerm); 
    // console.log(searchTerm);
  };
  const CustomOption = (props) => {
    if (props.data.isDisabled) {
      return <components.Option {...props} isDisabled />;
    }
    return <components.Option {...props} />;
  };

  return (
    <div>
      <Box sx={{ display: 'flex',flexWrap: 'wrap',flexDirection: 'row',justifyContent: 'flex-start' ,p: 1,m: 1 ,gap:'0.5rem'}}>
         <div style={{ width: '8rem' }}>
          <Select
            isMulti
            className="react-select-styled react-select-solid"
            classNamePrefix="react-select"
            options={roles}
            placeholder="Roles"
            isClearable
            components={{ Option: CustomOption }}
            getOptionValue={(option) => option.value}
            getOptionLabel={(option) => option.label}
            formatGroupLabel={(data) => (
              <div style={{ fontWeight: 'bold', fontSize: '1.25em' }}>
                {data.label}
              </div>
            )}
            value={selectedFilters.roles ? selectedFilters.roles.map(role => ({ value: role, label: role})) : null}
            onChange={(selectedOption) => handleFilterChange('roles', selectedOption)}
          />
        </div>

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
          <div  style={{ width: '9rem' }}>
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
            <div  style={{ width: '9rem' }}>
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
                options={minJdSalary}
                placeholder="Minumum Base Pay Salary"
                isClearable
                value={selectedFilters.minJdSalary ? selectedFilters.minJdSalary.map(exp => ({ value: exp, label: exp})) : null}
                onChange={(selectedOption) => handleFilterChange('minJdSalary', selectedOption)}
              />
            </div>
            <div style={{ width: '14rem' }}>
             <input
                type="text"
                placeholder="Search Company Name"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ height: '2rem' ,outline:'none'}}
              />
            </div>
        </Box>
    </div>
  );
}
