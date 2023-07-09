import myKhaltiKey from "./khaltiKey";
import axios from "axios";

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
          `http://localhost:4000/payment/${payload.token}/${payload.amount}/${myKhaltiKey.test_secret_key}`
        )
        .then((result) => console.log(result.data))
        .catch((error) => console.log(`Error : ${error}`));
    },
    onError(error) {
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
};

export default config;
