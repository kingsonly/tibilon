import React, { useEffect, useState } from "react";
import Form1 from "./forms/Form1";
import Form2 from "./forms/Form2";
import {
  getAllAffiliates,
  getAllClients,
  getAllEmployees,
} from "../../../services/apiservices/users";
import { useParams } from "react-router-dom";
import { getProjectPropertiesLists } from "../../../services/apiservices/propertiesServices";
import { BlogToBase64 } from "../../../utils";
import {
  getAllPropertyPayments,
  makePropertyPayment,
} from "../../../services/apiservices/paymentsServices";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ProjectPayment() {
  const breadCrumbs = ["Client Details", "Payment Details"];
  const [formStage, setFormStage] = useState("stage_1");
  const [active, setActive] = useState([0]);
  const navigate = useNavigate();


  const params = useParams()
  const { id, timer, propertyId } = useParams();

 

 

  const [client, setclient] = useState("");
  const [agent, setAgent] = useState("");
  const [agentType, setAgentType] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState();
  const [commisions, setCommisions] = useState();

  const [allClients, setallClients] = useState();
  const [allEmployees, setallEmployees] = useState([]);
  const [allAffiliates, setallAffiliates] = useState([]);
  const [allAgents, setAllAgents] = useState();
  const [allProperties, setAllProperties] = useState([]);

  const [amount, setAmount] = useState();
  const [modeOfPayment, setmodeOfPayment] = useState("");
  const [property, setproperty] = useState("");
  const [proofOfPayment, setproofOfPayment] = useState([]);
  const [proofOfPaymentPreview, setProofOfPaymentPreview] = useState();
  const [loading, setLoading] = useState(false);

  const [error, setError] = React.useState({
    amount: false,
    modeOfPayment: false,
    property: false,
  });

  const submit = async () => {
    try {
      // if (property.toString().trim() === "") {
      //   setError((prevError) => ({ ...prevError, email: true }));
      //   toast.error(`Property Field is required`, {
      //     position: "top-right",
      //     autoClose: 2000000000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     draggable: false,
      //   });
      //   return;
      // }


      if (amount?.toString().trim() == "") {
        setError((prevError) => ({ ...prevError, gender: true }));
        toast.error(`Amount Field is required`, {
          position: "top-right",
          autoClose: 2000000000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: false,
        });
        return;
      }

      if (modeOfPayment.toString().trim() === "") {
        setError((prevError) => ({ ...prevError, gender: true }));
        toast.error(`Mode Of Payment Field is required`, {
          position: "top-right",
          autoClose: 2000000000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: false,
        });
        return;
      }

      if (proofOfPayment.length === 0) {
        setError((prevError) => ({ ...prevError, gender: true }));
        toast.error(`Amount Field is required`, {
          position: "top-right",
          autoClose: 2000000000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: false,
        });
        return;
      }

      setLoading(true);
      const data = new FormData();
      data.append("client", client);
      data.append("agent", agent);
      data.append("agentType", agentType);
      data.append("paymentFrequency", paymentFrequency);
      data.append("commision", commisions);
      data.append("amount", amount);
      data.append("modeOfPayment", modeOfPayment);
      data.append("property", propertyId);
      data.append("proofOfPayment", proofOfPayment);
      // data.append("proofOfPaymentPreview", proofOfPaymentPreview);

      const res = await makePropertyPayment(data);

      setLoading(false);
      navigate(`/projects/actions/project-properties/details/${propertyId}`);

      toast.success(`${res?.data?.status || res.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
      });
   
    } catch (error) {
      setLoading(false);
      toast.error(`${error?.response?.data?.message || error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
      });

    }
  };

  useEffect(() => {

    if (timer == "true") {
      updateStage(0);
    } else {
      updateStage(1);
    }
    getInits();
  }, []);

  const getInits = async () => {
    try {
      const [
        allClients,
        allEmployees,
        allAffiliates,
        allProperties,
        // allPayments,
      ] = await Promise.all([
        getAllClients(),
        getAllEmployees(),
        getAllAffiliates(),
        getProjectPropertiesLists({ id }),
        // getAllPropertyPayments({ id: propertyId }),
      ]);

      // console.log(allPayments, "allPaymentsallPayments");
      setallClients(allClients?.data?.data);
      setallEmployees(allEmployees?.data?.data);
      setallAffiliates(allAffiliates?.data?.data);
      setAllProperties(allProperties?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e, name) => {
    switch (name) {
      case "agentType":
        setAgentType(e.target.value);
        if (e.target.value == 0) {
          setAllAgents(allEmployees);
        } else {
          setAllAgents(allAffiliates);
        }

        break;
      case "client":
        setclient(e.target.value);
        break;
      case "agent":
        setAgent(e.target.value);
        break;
      case "paymentFrequency":
        setPaymentFrequency(e.target.value);
        break;
      case "commisions":
        setCommisions(e.target.value);
        break;
      case "amount":
        setAmount(e.target.value);
        break;
      case "modeOfPayment":
        setmodeOfPayment(e.target.value);
        break;
      case "property":
        setproperty(e.target.value);
        break;
      case "proofOfPayment":
        const files = e.target.files || [];
        if (files.length == 0) {
          return;
        }
        setproofOfPayment(files[0]);
        BlogToBase64(files[0], (err, res) => {
          console.log(res, "image"); // Base64 `data:image/...` String result.
          setProofOfPaymentPreview(res);
        });

        break;
      default:
        //client goes here
        setAgentType(e.target.value);
        break;
    }
  };

  const renderPage = (stage) => {
    switch (stage) {
      case "stage_1":
        return (
          <Form1
            handleOnChange={handleOnChange}
            error={error}
            updateStage={updateStage}
            client={client}
            agent={agent}
            agentType={agentType}
            paymentFrequency={paymentFrequency}
            allClients={allClients}
            allAgents={allAgents}
            commisions={commisions}
          />
        );
      case "stage_2":
        return (
          <Form2
            handleOnChange={handleOnChange}
            error={error}
            allProperties={allProperties}
            amount={amount}
            modeOfPayment={modeOfPayment}
            property={property}
            setproofOfPayment={setproofOfPayment}
            setProofOfPaymentPreview={setProofOfPaymentPreview}
            proofOfPayment={proofOfPayment}
            proofOfPaymentPreview={proofOfPaymentPreview}
            submit={submit}
            loading={loading}
          />
        );
      default:
        return (
          <Form1
            handleOnChange={handleOnChange}
            error={error}
            updateStage={updateStage}
            client={client}
            agent={agent}
            agentType={agentType}
            paymentFrequency={paymentFrequency}
            allClients={allClients}
            allAgents={allAgents}
            commisions={commisions}
          />
        );
    }
  };

  const updateStage = (index) => {
    setActive((prev) => [...prev, index]);

    if (active.includes(1)) {
      if (index == 0 || 1 || timer == false) {
        // setActive(active.filter(current=> current != index))
        // alert("save__and_go_back");
        // setActive([0]);
        return;
      }
    }

    switch (index) {
      case 0:
        setFormStage("stage_1");
        break;
      case 1:
        setFormStage("stage_2");
        break;
      default:
        setFormStage("stage_1");
    }
  };
  return (
    <div>
      <div>
        <div className="flex gap-0 items-center justify-center mb-8">
          <ToastContainer />
          {breadCrumbs.map((title, index) => (
            <div
              className="flex items-center justify-center text-[white] cursor-pointer"
              style={{
                WebkitClipPath:
                  "polygon(75% 0%, 87% 49%, 75% 100%, 0% 100%, 8% 51%, 0% 0%)",
                clipPath:
                  "polygon(75% 0%, 87% 49%, 75% 100%, 0% 100%, 8% 51%, 0% 0%)",
                background: `${
                  !active?.includes(index) ? "#F1DBAD" : "#D7B569"
                }`,
                width: "400px",
                height: "60px",
              }}
              onClick={() => updateStage(index)}
            >
              <div className="ml-[-2rem]"> {title}</div>
            </div>
          ))}
        </div>
      </div>
      {renderPage(formStage)}
    </div>
  );
}
