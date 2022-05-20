import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import axios from "axios";
import "../style/Valoration.css";
import ValorationModal from "./ValorationModal.js";

const Valoration = ({ setAverageValoration, setComments }) => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [userValoration, setUserValoration] = useState(0);

  useEffect(() => {
    axios.get(`https://the-green-shop.herokuapp.com/api/productValoration/getAverage/${id}`).then(({ data }) => {
      if (data) {
        setAverageValoration(data.average);
      }
    });
  }, []);

  useEffect(() => {
    if (user.id) {
      axios
        .get(`https://the-green-shop.herokuapp.com/api/productValoration/getByUserId/${user.id}/productId/${id}`)
        .then(({ data }) => {
          setUserValoration(data.valoration);
        });
    }
  }, [user.id]);

  return (
    <div>
      <ValorationModal
        userValoration={userValoration}
        setUserValoration={setUserValoration}
        setComments={setComments}
        setAverageValoration={setAverageValoration}
      />
    </div>
  );
};
export default Valoration;
