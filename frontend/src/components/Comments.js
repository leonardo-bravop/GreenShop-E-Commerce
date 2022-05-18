import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import "../style/Comments.css";
import { Button, Modal } from "react-bootstrap";
import Valoration from "../commons/Valoration";

const Comments = ({ comments, setComments }) => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const comment = useInput("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (user.id && comment.value) {
  //     axios
  //       .post(`/api/productValoration/add`, {
  //         UserId: user.id,
  //         review: comment.value,
  //         productId: id,
  //         valoration, 
  //       })
  //       .then(() => {
  //         document.querySelector(".formComments").value = "";
  //         comment.onChange(e);
  //         return axios.get(`/api/productComment/${id}`);
  //       })
  //       .then((res) => setComments(res.data));
  //   }
  // };

 
  return (

    <>
     <div>Add a comment:</div>
            {/* <form onSubmit={handleSubmit} className="formComments">
              <input className="inputComment" {...comment} />
              <button className="buttonComment" type="submit">
                Comentar
              </button>
            </form> */}
          
    </>
  );
};
export default Comments;
