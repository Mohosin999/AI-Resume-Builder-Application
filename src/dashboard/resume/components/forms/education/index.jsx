import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";
import { Button } from "../../../../../components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../service/GlobalApi";
import { toast } from "sonner";
import CustomParagraph from "../../../../../components/ui/CustomParagraph";
import { Label } from "../../../../../components/ui/label";

const Education = ({ setEnableNext, activeFormIndex, setActiveFormIndex }) => {
  // States
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  // Destructuring resume information from context
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Get the specific id
  const params = useParams();

  // Load existing experience data into form fields
  useEffect(() => {
    if (resumeInfo?.attributes?.education?.length) {
      setEducationalList(resumeInfo.attributes.education);
    }
  }, [resumeInfo]);

  /**
   * ==========================================================
   *                Handler Functions - Start
   * ==========================================================
   */

  /**
   * Function to handle all changes
   */
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setEnableNext(false);

    // Create a shallow copy of the `educationalList` array
    const newEntries = educationalList.slice();
    // Set the value of the specified index
    newEntries[index][name] = value;
    // Update the state
    setEducationalList(newEntries);

    // Update resumeInfo context
    setResumeInfo({
      ...resumeInfo,
      attributes: {
        ...resumeInfo.attributes,
        education: newEntries,
      },
    });
  };

  /**
   * Function to handle adding new education
   */
  const handleAddEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  /**
   * Function to handle removing new education
   */
  const handleRemoveEducation = () => {
    setEducationalList((prev) => prev.slice(0, -1));
  };

  /**
   * Function to handle saving related functionalities
   */
  const handleSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList,
      },
    };

    GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(
      (res) => {
        setLoading(false);
        setEnableNext(true);
        toast("Education Details Updated Successfully !");
      },
      (error) => {
        setLoading(false);
        toast("Server Error, Please Try Again !");
      }
    );
  };
  /**
   * ==========================================================
   *                Handler Functions - End
   * ==========================================================
   */

  return (
    <div>
      <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-4 mt-10">
        {/* Heading */}
        <div className="flex justify-between">
          <h2 className="font-bold text-lg">Education</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              // Clear the educational list
              setEducationalList([
                {
                  universityName: "",
                  degree: "",
                  major: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                },
              ]);

              // Update resumeInfo with empty education data
              setResumeInfo({
                ...resumeInfo,
                attributes: {
                  ...resumeInfo?.attributes,
                  education: [], // Clear education in resumeInfo
                },
              });

              setActiveFormIndex(activeFormIndex + 1);
              setEnableNext(true);
            }}
          >
            Skip
          </Button>
        </div>
        {/* Sub Heading */}
        <CustomParagraph>Add your educational details</CustomParagraph>

        {/*
         * ===============================================
         *            Map the Education List
         * ===============================================
         */}
        <div>
          {educationalList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 my-5 rounded-lg">
                {/* University Name */}
                <div className="col-span-2">
                  <Label className="text-sm">University Name</Label>
                  <Input
                    name="universityName"
                    onChange={(event) => handleChange(event, index)}
                    defaultValue={item?.universityName}
                  />
                </div>
                {/* Degree */}
                <div className="col-span-2 md:col-span-1">
                  <Label className="text-sm">Degree</Label>
                  <Input
                    name="degree"
                    onChange={(event) => handleChange(event, index)}
                    defaultValue={item?.degree}
                  />
                </div>
                {/* Major */}
                <div className="col-span-2 md:col-span-1">
                  <Label className="text-sm">Major</Label>
                  <Input
                    name="major"
                    onChange={(event) => handleChange(event, index)}
                    defaultValue={item?.major}
                  />
                </div>
                {/* Start Date */}
                <div className="col-span-2 md:col-span-1">
                  <Label className="text-sm">Start Date</Label>
                  <Input
                    name="startDate"
                    type="date"
                    onChange={(event) => handleChange(event, index)}
                    defaultValue={item?.startDate}
                  />
                </div>
                {/* End Date */}
                <div className="col-span-2 md:col-span-1">
                  <Label className="text-sm">End Date</Label>
                  <Input
                    name="endDate"
                    type="date"
                    onChange={(event) => handleChange(event, index)}
                    defaultValue={item?.endDate}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/*
         * ===============================================
         *                    Buttons
         * ===============================================
         */}
        <div className="flex justify-between">
          {/* Add and Remove Experience Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleAddEducation}
              className="text-primary"
            >
              + Add More Education
            </Button>
            <Button
              variant="outline"
              onClick={handleRemoveEducation}
              className="text-primary"
            >
              - Remove
            </Button>
          </div>

          {/* Button to Save Experience */}
          <Button disabled={loading} onClick={() => handleSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Education;
