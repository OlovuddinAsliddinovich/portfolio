import Input from "@/components/admin-ui/input";
import { Button } from "@/components/ui/button";
import { codeResourceService } from "@/services/code-resource-service";
import { codeResourceFailure, codeResourcesSuccess, codeResourceStart, codeResourceSuccess } from "@/slice/code-resource.slice";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditCodeResource = ({ editOpen, setEditOpen, id }) => {
  const { mode } = useSelector((state) => state.mode);
  const { isLoading } = useSelector((state) => state.codeResources);
  const dispatch = useDispatch();
  const [code, setCode] = useState({
    title: "",
    url: "",
  });

  const getCode = async (id) => {
    dispatch(codeResourceStart());
    try {
      const { data } = await codeResourceService.getCodeResource(id);
      setCode(data);
      dispatch(codeResourceSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(codeResourceFailure(error?.response?.data?.message));
    }
  };
  const editCodeHandler = async (e) => {
    e.preventDefault();
    dispatch(codeResourceStart());
    try {
      const response = await codeResourceService.updateCodeResource(code, id);
      dispatch(codeResourceSuccess(response?.data));
      const allCodes = await codeResourceService.getAllCodeResources();
      dispatch(codeResourcesSuccess(allCodes?.data));
      setEditOpen(false);
      setCode({ title: "", url: "" });
    } catch (error) {
      console.log(error);
      dispatch(codeResourceFailure(error?.response?.data?.message));
    }
  };

  useEffect(() => {
    getCode(id);
  }, []);

  return (
    <div className="w-full h-screen bg-[rgba(0,0,0,0.8)] fixed top-0 left-0" onClick={() => setEditOpen(!editOpen)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full sm:w-[50%] h-[100%] overflow-y-scroll ml-auto animate-right ${mode ? "bg-light" : "bg-slate"}`}
      >
        <form className="sm:p-4 p-2" onSubmit={editCodeHandler}>
          <div className="flex justify-between items-center">
            <h1 className={`text-[22px] font-bold w-[90%] text-center ${mode ? "text-gray-800" : "text-white"}`}>Kod manba qo'shish</h1>
            <button
              onClick={() => setEditOpen(!editOpen)}
              className="text-[20px] pb-1 px-1 rounded-[2px] h-[25px] hover:bg-red-600 hover:text-white border border-gray-700 transition-all flex justify-center items-center"
            >
              &times;
            </button>
          </div>
          <div>
            <Input type={"text"} name={"title"} title={"Kod manba nomi"} state={code.title} setState={setCode} />
            <Input type={"text"} name={"url"} title={"Kod manba linki"} state={code.url} setState={setCode} />
            <Button disabled={isLoading} className="w-full sm:w-[200px] bg-green-600 hover:bg-blue-600 h-[40px] mt-3" type="submit">
              {isLoading ? "Loading..." : "Saqlash"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCodeResource;
