import { Link } from "react-router-dom";
import "./CategoryCard.css";
const CategoryCard = () => {
  return (
    <div className="cards-div">
      <Link to="/Plants/All_Plants" className="card-wrapper">
        {/* <div className="card-wrapper"> */}
          <div
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)",
            }}
            className="card-container"
          ></div>
          <div className="categorycard-title">Plants</div>
        {/* </div> */}
      </Link>

        {/* <div className="card-wrapper"> */}
      <Link to="/Accesories/Fertilizers" className="card-wrapper">
          <div
            style={{
              backgroundImage:
                "url(https://www.dailynews.lk/sites/default/files/news/2021/06/13/Untitled-17.jpg)",
            }}
            className="card-container"
          ></div>
          <div className="categorycard-title">Fertilizers</div>
      </Link>
        {/* </div> */}

      <Link to="/Accesories/All_Accesories" className="card-wrapper">
        {/* <div className="card-wrapper"> */}
          <div
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1523301551780-cd17359a95d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80)",
            }}
            className="card-container"
          ></div>
          <div className="categorycard-title">Accesories</div>
        {/* </div> */}
      </Link>
    </div>
  );
};

export default CategoryCard;
