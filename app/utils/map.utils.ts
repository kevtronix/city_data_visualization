export const getPositions = (id: string) => {
  switch (id) {
    case "nyc-tree":
      return (d: any) => [Number(d.longitude), Number(d.latitude)];
    case "la-active-business":
      return (d: any) => [
        Number(d.location_1.longitude),
        Number(d.location_1.latitude),
      ];
    case "nyc-wifi-hotspot":
      return (d: any) => [
        Number(d.longitude),
        Number(d.latitude),
      ];
    case "nyc-center-service":
      return (d: any) => [
        Number(d.longitude),
        Number(d.latitude),
      ];
    default:
      throw new Error(`No data found for ${id}`);
  }
};