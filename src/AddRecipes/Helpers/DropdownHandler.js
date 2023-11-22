import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function DropdownHandler({ options, onSelect, customMessage, formName, setFormData }){
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(null);

  const toggleDropdown = () => {
    //Inverts whaterver the value is
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelect = (item) => {
    //Maintains the selected item in the recently created piece of state
    setSelectedField(item);
    // Close the dropdown after selection
    setDropdownOpen(false); 
    // Updates the form with the given name (formName)
    setFormData((formData) => ({
      ...formData,
      [formName]: item
    }))
  };

  
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle caret>
        {selectedField !== null ? selectedField : customMessage}
      </DropdownToggle>
      <DropdownMenu>
        {options.map((selectionItem) => (
          <DropdownItem name={formName} key={selectionItem} onClick={() => handleSelect(selectionItem)}>
            {selectionItem}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownHandler;
