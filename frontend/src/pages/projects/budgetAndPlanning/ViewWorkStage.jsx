import { useCallback } from "react";
import { Button } from "@mui/material";

const ViewWorkStage = () => {
//   const onText4MenuClick = useCallback(() => {
//     // Please sync "Dashboard" to the project
//   }, []);

//   const onCreateBudgetContainerClick = useCallback(() => {
//     // Please sync "Add Material To Workstage" to the project
//   }, []);

//   const onEditContainerClick = useCallback(() => {
//     // Please sync "Edit Material from work stage" to the project
//   }, []);

//   const onCreateBudgetContainer1Click = useCallback(() => {
//     // Please sync "Add Labour from work stage" to the project
//   }, []);

//   const onEditContainer2Click = useCallback(() => {
//     // Please sync "Edit from work stage" to the project
//   }, []);

  return (
    <div className="relative bg-whitesmoke shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] w-full h-[2038px] overflow-hidden text-left text-lg text-black font-poppins">
      <div className="absolute top-[60px] left-[346px] text-5xl tracking-[0.01em] font-medium text-gray-400">
        <span>Work Stage:</span>
        <span className="text-black"> Ground Floor</span>
      </div>
      <div className="absolute top-[608px] left-[1201px] w-[229px] h-[50px] cursor-pointer"
        // onClick={onCreateBudgetContainerClick}
      >
        <div style={{ backgroundColor: "forestgreen", color: "white" }} className= "absolute top-[0px] left-[0px] box-border w-[229px] h-[50px] border-[2px] border-solid border-forestgreen" />
        <Button className="absolute top-[12px] left-[56px] text-white" style={{ color: "white" }}>
          Add Material
        </Button>
      </div>
      <div className="absolute top-[326px] left-[336px] w-[1094px] h-[195px]">
        <div className="absolute top-[95px] left-[20px] tracking-[0.01em] font-light">
          Ground Floor
        </div>
        <div className="absolute top-[95px] left-[411px] tracking-[0.01em] font-light">{`Material & Labour`}</div>
        <div className="absolute top-[95px] left-[803px] tracking-[0.01em] font-light">
          2,695,860.00
        </div>
        <div className="absolute top-[57px] left-[20px] text-xl tracking-[0.01em] font-medium">
          Work Stage Title
        </div>
        <div className="absolute top-[57px] left-[410px] text-xl tracking-[0.01em] font-medium">
          Activities
        </div>
        <div className="absolute top-[57px] left-[800px] text-xl tracking-[0.01em] font-medium">
          Total Cost (₦)
        </div>
        <div className="absolute top-[0px] left-[0px] rounded-3xs bg-gainsboro box-border w-[1094px] h-[195px] border-[1px] border-solid border-gray-600" />
      </div>
      <div className="absolute top-[597.79px] left-[335.47px] box-border w-[1095.04px] h-px border-t-[1px] border-solid border-lightgray" />
      <div className="absolute top-[616px] left-[791px] text-5xl tracking-[0.01em] font-medium inline-block w-[121px] h-[31px]">
        Materials
      </div>
      <div className="absolute top-[663px] left-[336px] w-[1094px] h-[331px]">
        <div className="absolute top-[57px] left-[72px] w-[910px] h-[65px]">
          <div className="absolute top-[38px] left-[0px] tracking-[0.01em] font-light">
            Iron
          </div>
          <div className="absolute top-[38px] left-[391px] tracking-[0.01em] font-light">
            Y20MM
          </div>
          <div className="absolute top-[38px] left-[783px] tracking-[0.01em] font-light">
            Length
          </div>
          <div className="absolute top-[0px] left-[0px] text-xl tracking-[0.01em] font-medium">
            Material Name
          </div>
          <div className="absolute top-[0px] left-[390px] text-xl tracking-[0.01em] font-medium">
            Material Type
          </div>
          <div className="absolute top-[0px] left-[780px] text-xl tracking-[0.01em] font-medium">
            Material Unit
          </div>
        </div>
        <div className="absolute top-[172px] left-[72px] w-[921px] h-[65px]">
          <div className="absolute top-[38px] left-[0px] tracking-[0.01em] font-light">
            240
          </div>
          <div className="absolute top-[38px] left-[391px] tracking-[0.01em] font-light">
            7,650
          </div>
          <div className="absolute top-[38px] left-[783px] tracking-[0.01em] font-light">
            1,836,000
          </div>
          <div className="absolute top-[0px] left-[0px] text-xl tracking-[0.01em] font-medium">
            Total Quantity
          </div>
          <div className="absolute top-[0px] left-[390px] text-xl tracking-[0.01em] font-medium">
            Market Price
          </div>
          <div className="absolute top-[0px] left-[780px] text-xl tracking-[0.01em] font-medium">
            Total Cost (₦)
          </div>
        </div>
        <div className="absolute top-[0px] left-[0px] rounded-3xs bg-gainsboro box-border w-[1094px] h-[331px] border-[1px] border-solid border-gray-600" />
        <div className="absolute top-[284px] left-[404px] w-[100px] h-[24.19px] text-xs text-crimson-100">
          <div style={{ borderColor: "red" }} className="absolute top-[0px] left-[0px] bg-crimson-200 box-border w-[100px] h-[24.19px] border-[1px] border-solid border-crimson-100" />
          <div style={{ color: "red" }} className="absolute top-[4px] left-[30px] tracking-[0.01em] cursor-pointer">
            Delete
          </div>
        </div>
        <div
          className="absolute top-[284px] left-[518px] w-[100px] h-[24.19px] cursor-pointer text-xs"
        //   onClick={onEditContainerClick}
        >
          <div style={{ borderColor: "green" }} className="absolute top-[0px] left-[0px] bg-crimson-200 box-border w-[100px] h-[24.19px] border-[1px] border-solid border-gray-500" />
          <div style={{ color: "green" }} className="absolute top-[3px] left-[39px] tracking-[0.01em] cursor-pointer">
            Edit
          </div>
        </div>
      </div>
      <div className="absolute top-[1002px] left-[336px] w-[1096.01px] h-[757px]">
        <div className="absolute top-[57px] left-[72px] w-[910px] h-[65px]">
          <div className="absolute top-[38px] left-[0px] tracking-[0.01em] font-light">
            Cement
          </div>
          <div className="absolute top-[38px] left-[391px] tracking-[0.01em] font-light">
            Cement
          </div>
          <div className="absolute top-[38px] left-[783px] tracking-[0.01em] font-light">
            Bags
          </div>
          <div className="absolute top-[0px] left-[0px] text-xl tracking-[0.01em] font-medium">
            Material Name
          </div>
          <div className="absolute top-[0px] left-[390px] text-xl tracking-[0.01em] font-medium">
            Material Type
          </div>
          <div className="absolute top-[0px] left-[780px] text-xl tracking-[0.01em] font-medium">
            Material Unit
          </div>
        </div>
        <div className="absolute top-[172px] left-[72px] w-[921px] h-[65px]">
          <div className="absolute top-[38px] left-[0px] tracking-[0.01em] font-light">
            260
          </div>
          <div className="absolute top-[38px] left-[391px] tracking-[0.01em] font-light">
            3,000
          </div>
          <div className="absolute top-[38px] left-[783px] tracking-[0.01em] font-light">
            780,000
          </div>
          <div className="absolute top-[0px] left-[0px] text-xl tracking-[0.01em] font-medium">
            Total Quantity
          </div>
          <div className="absolute top-[0px] left-[390px] text-xl tracking-[0.01em] font-medium">
            Market Price
          </div>
          <div className="absolute top-[0px] left-[780px] text-xl tracking-[0.01em] font-medium">
            Total Cost (₦)
          </div>
        </div>
        <div className="absolute top-[0px] left-[0px] rounded-3xs bg-gainsboro box-border w-[1094px] h-[331px] border-[1px] border-solid border-gray-600" />
        <div className="absolute top-[284px] left-[404px] w-[100px] h-[24.19px] text-xs text-crimson-100">
          <div style={{ borderColor: "red" }} className="absolute top-[0px] left-[0px] bg-crimson-200 box-border w-[100px] h-[24.19px] border-[1px] border-solid border-crimson-100" />
          <div style={{ color: "red" }} className="absolute top-[4px] left-[30px] tracking-[0.01em] cursor-pointer">
            Delete
          </div>
        </div>
        <div className="absolute top-[284px] left-[518px] w-[100px] h-[24.19px] text-xs">
          <div style={{ borderColor: "green" }}className="absolute top-[0px] left-[0px] bg-crimson-200 box-border w-[100px] h-[24.19px] border-[1px] border-solid border-gray-500" />
          <div style={{ color: "green" }} className="absolute top-[3px] left-[39px] tracking-[0.01em] cursor-pointer">
            Edit
          </div>
        </div>
        <div className="absolute top-[370px] left-[870px] w-[229px] h-[50px] cursor-pointer"
        // onClick={onCreateBudgetContainerClick}
      >
        <div style={{ backgroundColor: "forestgreen", color: "white" }} className= "absolute top-[0px] left-[0px] box-border w-[229px] h-[50px] border-[2px] border-solid border-forestgreen" />
        <Button className="absolute top-[12px] left-[56px] text-white" style={{ color: "white" }}>
          Add Labour
        </Button>
      </div>
        <div className="absolute top-[360.79px] left-[1.47px] box-border w-[1095.04px] h-px border-t-[1px] border-solid border-lightgray" />
        <div className="absolute top-[379px] left-[457px] text-5xl tracking-[0.01em] font-medium inline-block w-[121px] h-[31px]">
          Labour
        </div>
        <div className="absolute top-[426px] left-[2px] w-[1094px] h-[331px]">
          <div className="absolute top-[57px] left-[72px] w-[869px] h-[65px]">
            <div className="absolute top-[38px] left-[0px] tracking-[0.01em] font-light">
              Kiker Form Work
            </div>
            <div className="absolute top-[38px] left-[391px] tracking-[0.01em] font-light">
              Sum
            </div>
            <div className="absolute top-[38px] left-[783px] tracking-[0.01em] font-light">
              1
            </div>
            <div className="absolute top-[0px] left-[0px] text-xl tracking-[0.01em] font-medium">
              Labour Activity
            </div>
            <div className="absolute top-[0px] left-[390px] text-xl tracking-[0.01em] font-medium">
              Unit
            </div>
            <div className="absolute top-[0px] left-[780px] text-xl tracking-[0.01em] font-medium">
              Quantity
            </div>
          </div>
          <div className="absolute top-[172px] left-[72px] w-[921px] h-[65px]">
            <div className="absolute top-[38px] left-[0px] tracking-[0.01em] font-light">
              15,000
            </div>
            <div className="absolute top-[38px] left-[783px] tracking-[0.01em] font-light">
              15,000
            </div>
            <div className="absolute top-[0px] left-[0px] text-xl tracking-[0.01em] font-medium">
              Rate (₦)
            </div>
            <div className="absolute top-[0px] left-[780px] text-xl tracking-[0.01em] font-medium">
              Total Cost (₦)
            </div>
          </div>
          <div className="absolute top-[0px] left-[0px] rounded-3xs bg-gainsboro box-border w-[1094px] h-[331px] border-[1px] border-solid border-gray-600" />
          <div className="absolute top-[284px] left-[404px] w-[100px] h-[24.19px] text-xs text-crimson-100">
          <div style={{ borderColor: "red" }} className="absolute top-[0px] left-[0px] bg-crimson-200 box-border w-[100px] h-[24.19px] border-[1px] border-solid border-red" />
          <div style={{ color: "red" }} className="absolute top-[4px] left-[30px] tracking-[0.01em] cursor-pointer">
            Delete
          </div>
        </div>
        <div className="absolute top-[284px] left-[518px] w-[100px] h-[24.19px] text-xs">
          <div style={{ borderColor: "green" }} className= "absolute top-[0px] left-[0px] box-border w-[100px] h-[24.19px] border-[1px] border-solid" />
          <div className="absolute top-[3px] left-[39px] tracking-[0.01em] cursor-pointer" style={{ color: "green" }}>
            Edit
          </div>
        </div>
          </div>
        </div>
      </div>
  );
};

export default ViewWorkStage;
