export const getLastId = (nodes) => {
    const reversedArray = [...nodes].sort((a, b) => {
        if (a.id < b.id) {
            return 1;
        } else if (a.id > b.id) {
            return -1;
        }

        return 0;
    });

    if (reversedArray.length > 0) {
        return reversedArray[0].id;
    }

    return 0;
};

export const convertToNestedArray=(flatArray) =>{
    const idToObjMap = {}; // Map to store objects by their id
    const result = [];
  
    // Create a mapping of id to objects
    for (const item of flatArray) {
      const { id, parent, ...rest } = item;
      idToObjMap[id] = { id, ...rest, children: [] };
    }
  
    // Build the nested structure
    for (const item of flatArray) {
      const { id, parent } = item;
      const currentObject = idToObjMap[id];
  
      if (parent === 0) {
        // If the item has no parent, add it to the result
        result.push(currentObject);
      } else {
        // If the item has a parent, add it as a child of the parent
        const parentObject = idToObjMap[parent];
        parentObject.children.push(currentObject);
      }
    }
  
    return result;
  }