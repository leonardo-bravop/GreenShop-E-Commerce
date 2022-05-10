import "./CategoryCard.css";
const CategoryCard = () => {
  return (
    <div style={{display: "flex", justifyContent: "center", marginTop: "30px"}}>
  <div
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)",
        }}
        className="card-container"
      >
        <div className="categorycard-title">Plants</div>
      </div>

      <div
        style={{
          backgroundImage:
            "url(https://www.dailynews.lk/sites/default/files/news/2021/06/13/Untitled-17.jpg)",
        }}
        className="card-container"
      >
        <div className="categorycard-title">Fertilizers</div>
      </div>

      <div
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1523301551780-cd17359a95d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80)",
        }}
        className="card-container"
      >
        <div className="categorycard-title">Accesories</div>
      </div>
    </div>
  );
};

export default CategoryCard;
