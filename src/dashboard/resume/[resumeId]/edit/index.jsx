import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/form-section";
import ResumePreview from "../../components/resume-preview";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import dummy from "../../../../data/dummy";
import GlobalApi from "../../../../../service/GlobalApi";

const EditResume = () => {
  const [resumeInfo, setResumeInfo] = useState();
  const params = useParams();

  useEffect(() => {
    setResumeInfo(dummy);
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(params?.resumeId).then((res) => {
      console.log(res.data.data);
    });
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* Form Section */}
        <FormSection />

        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
