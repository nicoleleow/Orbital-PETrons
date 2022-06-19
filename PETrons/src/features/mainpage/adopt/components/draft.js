  const filterPets = (index, text) => {
    setSearch(text);
    setCategoryIndexFiltered(index);
    // filter by category
    var newList = pets.filter(
      item =>
        PetCategories[index].animalType.toUpperCase() === 'ALL' ? pets
          : item?.type?.toUpperCase() == PetCategories[index].animalType.toUpperCase());
    
    //filter by text
    newList = newList.filter(item => item?.name?.toUpperCase().includes(text.toUpperCase()));
    
    // filter by animal type
    // newList = newList.filter(
    //   item =>
    //     filterType === 'Animal Type' ? pets
    //       : item?.type?.toUpperCase() == filterType.toUpperCase());
    
    // filter by age

    
    // filter by gender
    newList = newList.filter(
      item =>
        (filterGender === 'Gender' || filterGender === '') ? pets
          : item?.gender?.toUpperCase() == filterGender.toUpperCase());

    // filter by ownership type

    // filter by hdb approved status

    // filter by fees
    console.log(filterType)
    console.log(filterGender)
    setFilteredPets(newList);
  }