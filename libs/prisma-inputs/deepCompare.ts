export const deepCompareObjects = (obj1: any, obj2: any) => {
  // Check if both objects are arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    // Check if the array lengths are equal
    if (obj1.length !== obj2.length) {
      return false;
    }

    // Compare each element in the arrays recursively
    for (let i = 0; i < obj1.length; i++) {
      if (!deepCompareObjects(obj1[i], obj2[i])) {
        return false;
      }
    }

    return true;
  }

  // Check if both objects are objects (excluding arrays and null)
  if (
    typeof obj1 === 'object' &&
    obj1 !== null &&
    typeof obj2 === 'object' &&
    obj2 !== null
  ) {
    // Get the keys of the objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if the objects have the same number of keys
    if (keys1.length !== keys2.length) {
      return false;
    }

    // Compare each property in the objects recursively
    for (const key of keys1) {
      if (!deepCompareObjects(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

  // Compare primitive values using strict equality
  return obj1 === obj2;
};
