const sortByDistance = (content, currentLocation) => {
    return content.sort((a, b) => {
      const distanceA = calculateDistance(a.location.latitude, a.location.longitude, currentLocation.latitude, currentLocation.longitude);
      const distanceB = calculateDistance(b.location.latitude, b.location.longitude, currentLocation.latitude, currentLocation.longitude);
      return distanceA - distanceB;
    });
  };
  
  const determineCurrentRegion = (latitude, longitude) => {
    // Implement your logic to determine the current region based on latitude and longitude
    // For example:
    if (latitude >= 1 && latitude <= 10 && longitude >= 1 && longitude <= 10) {
      return "Region A";
    } else if (latitude >= 11 && latitude <= 20 && longitude >= 11 && longitude <= 20) {
      return "Region B";
    } else {
      return "Unknown Region";
    }
  };
  
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };
  
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  
  export { sortByDistance, determineCurrentRegion };
  