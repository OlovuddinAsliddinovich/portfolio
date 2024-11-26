import { Button } from "@/components/ui/button";
import courseModuleService from "@/services/course-module-service";
import { getModulesSuccess, setCourseModuleFailure, setCourseModuleStart, setCourseModuleSuccess } from "@/slice/course-module-slice";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditCourseModule = ({ editModal, setEditModal, moduleId }) => {
  const { mode } = useSelector((state) => state.mode);
  const { course } = useSelector((state) => state.courses);
  const { module } = useSelector((state) => state.courseModule);
  const [loading, setLoading] = useState(false);
  const [moduleName, setModuleName] = useState({
    title: "",
    videos: "",
  });
  const dispatch = useDispatch();

  const getModule = async (moduleId) => {
    dispatch(setCourseModuleStart());
    try {
      const { data } = await courseModuleService.getOneModule(course?.id, moduleId);
      setModuleName(data);
      dispatch(setCourseModuleSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(setCourseModuleFailure(error?.response?.data?.message));
    }
  };

  const editModuleHandler = async (e) => {
    e.preventDefault();
    dispatch(setCourseModuleStart());
    setLoading(true);
    try {
      const response = await courseModuleService.updateModule(moduleName, course?.id, module?._id);
      const modules = await courseModuleService.getModules(course?.id);
      dispatch(setCourseModuleSuccess(response.data));
      dispatch(getModulesSuccess(modules.data));
      setEditModal(false);
    } catch (error) {
      console.log(error);
      dispatch(setCourseModuleFailure(error?.response?.data?.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getModule(moduleId);
  }, []);

  return (
    <div className={`fixed right-0 top-0 w-full h-screen bg-[rgba(0,0,0,0.8)]`} onClick={() => setEditModal(!editModal)}>
      <div
        className={`w-full sm:w-[50%] ml-auto animate-right h-screen p-4 ${mode ? "bg-light text-gray-900" : "bg-darkBlue text-white"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={editModuleHandler}>
          <div className="flex justify-center items-center relative">
            <h1 className="text-2xl font-bold text-center">Modul Yaratish</h1>
            <button
              onClick={() => setEditModal(false)}
              className="text-2xl absolute right-0 top-0 z-20 font-bold cursor-pointer border border-gray-300 w-[20px] hover:text-white-700 hover:bg-red-600 hover:text-white transition-all h-[20px] rounded-sm flex justify-center items-center"
            >
              <span className="mb-[4px]">&times;</span>
            </button>
          </div>
          <div className="mt-4">
            <label htmlFor="name">Modul nomi</label>
            <input
              type="text"
              id="name"
              placeholder="Modul nomi"
              value={moduleName.title}
              onChange={(e) => setModuleName({ ...moduleName, title: e.target.value })}
              className={`w-full p-2 outline-none border border-gray-600 rounded-md ${mode ? "bg-light" : "text-white bg-darkBlue"}`}
            />
          </div>
          <Button type="submit" disabled={loading} className={`w-full mt-4 bg-blue-600 hover:bg-green-700`}>
            {loading ? "Loading..." : "Yangilash"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditCourseModule;
