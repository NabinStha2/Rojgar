import React from "react";
import KhaltiCheckout from "khalti-checkout-web";
// import config from "./khaltiConfig";
import myKhaltiKey from "./khaltiKey";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { postPaidProposalAction } from "../actions/postActions";
import { useNavigate } from "react-router-dom";

const Khalti = ({ postId }) => {
  const { post } = useSelector((state) => state.getPosts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const config = {
    // replace the publicKey with yours
    publicKey: myKhaltiKey.test_public_key,
    productIdentity: "12345",
    productName: "Rojgar",
    productUrl: "http://localhost:3000/",
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log(payload);

        axios
          .get(
            `http://localhost:5000/payment/${payload.token}/${payload.amount}/${myKhaltiKey.test_secret_key}`
          )
          .then((result) => {
            console.log(result.data);
            console.log(post._id, postId);
            dispatch(postPaidProposalAction({ postId: postId },navigate));
          })
          .catch((error) => {
            console.log(`Error : ${error}`);
          });
      },
      onError(error) {
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
  };
  var checkout = new KhaltiCheckout(config);
  let buttonStyles = {
    backgroundColor: "purple",
    color: "white",
    border: "2px solid black",
    margin: "20px",
    padding: "10px",
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button
        onClick={() => {
          checkout.show({ amount: 1000 });
        }}
        style={buttonStyles}
      >
        Pay with khalti
      </button>
    </div>
  );
};

export default Khalti;
