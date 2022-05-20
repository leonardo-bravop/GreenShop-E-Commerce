import Card from "../commons/Card";

const Grid = ({ products }) => {
  return (
    <div
      className="grid-container"
    >
      {products.map((data, i) => (
        <div className="" key={i}>
          <Card data={data} />
        </div>
      ))}
    </div>
  );
};

export default Grid;
