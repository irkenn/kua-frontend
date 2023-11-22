import React, { useState } from 'react';
import { Dropdown, 
        DropdownToggle, 
        DropdownMenu, 
        DropdownItem } from 'reactstrap';

function DropdownPossibleUnits({id, units, ingredientList, setIngredientList}){

    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedField, setSelectedField] = useState(undefined);

    const toggleDropdown = () => {
        //Inverts whaterver the value is
        setDropdownOpen(!dropdownOpen);
      };

    const handleSelect = (item) =>{
        setSelectedField(item);
        setDropdownOpen(false);

        const newList = {...ingredientList};
        newList[id].unit = item;
        setIngredientList(newList);
    };

    return(
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret className='dropdown-caret' >
                {selectedField != null ? selectedField : "select a unit"}
            </DropdownToggle>
            <DropdownMenu>
                {units.map((seletionItem) => (
                    <DropdownItem className='dropdown-name' key={seletionItem} onClick={(e) => handleSelect(seletionItem)} >
                        {seletionItem}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default DropdownPossibleUnits;