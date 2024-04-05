export const getPositions = (id: string) => {
  switch (id) {
    case "nyc-tree":
      return (d: any) => {
        console.log(d);
        [(Number(d.longitude), Number(d.latitude))];
      };
    case "la-active-business":
      return (d: any) => {
        console.log(d);
        [Number(d.location_1.longitude), Number(d.location_1.latitude)];
      };
    case "westchester-facilities":
      return (d: any) => {
        console.log(d); // Log the data to see if it's what you expect
        return [Number(d.geometry.x), Number(d.geometry.y)];
      };
    default:
      throw new Error(`No data found for ${id}`);
  }
};
