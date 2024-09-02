import TextInput from "@/components/core/inputs/TextInput";
import SelectInput from "@/components/core/inputs/TextSelect";
import { useState, useEffect } from "react";

const MyLocation = ({
  selectedDivision,
  selectedDistrict,
  selectedThana,
  selectedWard,

  setSelectedDivision,
  setSelectedDistrict,
  setSelectedThana,
  setSelectedWard,
  setSelectedArea,
  setRoadNumber,

  placeholder,
}) => {
  const [locations, setLocations] = useState(null);
  const [thanas, setThanas] = useState([]);
  const [wards, setWards] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("location.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDivisionChange = (selectedDivision) => {
    setSelectedDivision(selectedDivision);
    setSelectedDistrict(null);
    setSelectedThana(null);
    setSelectedWard(null);
    setThanas([]);
    setWards([]);
    setAreas([]);
    if (locations) {
      const selectedDivisionData = locations.find(
        (location) => location.division === selectedDivision
      );
      if (selectedDivisionData) {
        setSelectedDistrict(selectedDivisionData.districtList[0].district);
        setThanas(
          selectedDivisionData.districtList[0].thanaList.map(
            (thanaObj) => thanaObj.thana
          )
        );
      }
    }
  };

  const handleDistrictChange = (selectedDistrict) => {
    setSelectedDistrict(selectedDistrict);
    setSelectedThana(null);
    setSelectedWard(null);
    setThanas([]);
    setWards([]);
    setAreas([]);
    if (locations) {
      const selectedDivisionData = locations.find(
        (location) => location.division === selectedDivision
      );
      if (selectedDivisionData) {
        const selectedDistrictData = selectedDivisionData.districtList.find(
          (districtObj) => districtObj.district === selectedDistrict
        );
        if (selectedDistrictData) {
          setThanas(
            selectedDistrictData.thanaList.map((thanaObj) => thanaObj.thana)
          );
        }
      }
    }
  };

  const handleThanaChange = (selectedThana) => {
    setSelectedThana(selectedThana);
    setSelectedWard(null);
    setWards([]);
    setAreas([]);
    if (locations) {
      const selectedDivisionData = locations.find(
        (location) => location.division === selectedDivision
      );
      if (selectedDivisionData) {
        const selectedDistrictData = selectedDivisionData.districtList.find(
          (districtObj) => districtObj.district === selectedDistrict
        );
        if (selectedDistrictData) {
          const selectedThanaData = selectedDistrictData.thanaList.find(
            (thanaObj) => thanaObj.thana === selectedThana
          );
          if (selectedThanaData) {
            setWards(selectedThanaData.wardList.map((wardObj) => wardObj.ward));
          }
        }
      }
    }
  };

  const handleWardChange = (selectedWard) => {
    setSelectedWard(selectedWard);
    setAreas([]);
    if (locations) {
      const selectedDivisionData = locations.find(
        (location) => location.division === selectedDivision
      );
      if (selectedDivisionData) {
        const selectedDistrictData = selectedDivisionData.districtList.find(
          (districtObj) => districtObj.district === selectedDistrict
        );
        if (selectedDistrictData) {
          const selectedThanaData = selectedDistrictData.thanaList.find(
            (thanaObj) => thanaObj.thana === selectedThana
          );
          if (selectedThanaData) {
            const selectedWardData = selectedThanaData.wardList.find(
              (wardObj) => wardObj.ward === selectedWard
            );
            if (selectedWardData) {
              setAreas(selectedWardData.area);
            }
          }
        }
      }
    }
  };

  const handleAreaChange = (selectedArea) => {
    setSelectedArea(selectedArea);
  };
  const handleRoadChange = (selectedRoad) => {
    setRoadNumber(selectedRoad);
  };

  return (
    <div>
      <div className="mb-2">
        <SelectInput
          id="division"
          options={
            locations
              ? locations.map((location) => ({
                  value: location?.division,
                  label: location?.division,
                }))
              : []
          }
          labelClassName="text-green-600 font-semibold"
          label="Select Division"
          placeholder={placeholder ? placeholder : "Select Division"}
          onChange={(e) => handleDivisionChange(e.target.value)}
          required
        />
      </div>
      {selectedDivision && (
        <div className="mb-2">
          <SelectInput
            id="district"
            options={
              selectedDivision && locations
                ? locations
                    .find((location) => location.division === selectedDivision)
                    .districtList.map((districtObj) => ({
                      value: districtObj.district,
                      label: districtObj.district,
                    }))
                : []
            }
            labelClassName="text-green-600 font-semibold"
            label="Select District"
            placeholder="Select District"
            onChange={(e) => handleDistrictChange(e.target.value)}
            disabled={!selectedDivision}
            required
          />
        </div>
      )}
      {selectedDistrict && (
        <div className="mb-2">
          <SelectInput
            id="thana"
            options={thanas.map((thana) => ({ value: thana, label: thana }))}
            labelClassName="text-green-600 font-semibold"
            label="Select Thana"
            placeholder="Select Thana"
            onChange={(e) => handleThanaChange(e.target.value)}
            disabled={!selectedDistrict}
            required
          />
        </div>
      )}

      {selectedThana && wards[0] && (
        <div className="mb-2">
          <SelectInput
            id="ward"
            options={wards.map((ward) => ({ value: ward, label: ward }))}
            labelClassName="text-green-600 font-semibold"
            label="Select Ward"
            placeholder="Select Ward"
            onChange={(e) => handleWardChange(e.target.value)}
            disabled={!selectedThana}
          />
        </div>
      )}
      {selectedWard && (
        <div className="mb-2">
          <SelectInput
            id="area"
            options={areas.map((area) => ({ value: area, label: area }))}
            labelClassName="text-green-600 font-semibold"
            label="Select Area"
            placeholder="Select Area"
            onChange={(e) => handleAreaChange(e.target.value)}
            disabled={!selectedWard}
          />
        </div>
      )}
      {selectedThana && (
        <div>
          <TextInput
            id={"road"}
            label={"Road/House No."}
            type="text"
            labelClassName="text-green-600 font-semibold"
            onChange={(e) => handleRoadChange(e.target.value)}
            className="capitalize"
            name="road"
          />
        </div>
      )}
    </div>
  );
};

export default MyLocation;
