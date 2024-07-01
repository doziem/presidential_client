import { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { getRoomType } from "../utils/api";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([]);

  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);

  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    getRoomType().then((data) => {
      setRoomTypes(data);
    });
  }, []);

  const handleRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleAddNewRoomtype = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType("");
      setShowNewRoomTypeInput(false);
    }
  };

  return (
    <>
      {/* {roomTypes.length > 0 && ( */}
      <div>
        <select
          required
          className="form-select mb-3"
          name="roomType"
          id="roomType"
          value={newRoom?.roomType}
          onChange={(e) => {
            if (e.target.value === "Add New") {
              setShowNewRoomTypeInput(true);
            } else {
              handleRoomInputChange(e);
            }
          }}
        >
          <option value="">Select New Type</option>
          <option value="Add New">Add New</option>
          {roomTypes?.map((types, i) => (
            <option key={i} value={types}>
              {types}
            </option>
          ))}
        </select>
        {showNewRoomTypeInput && (
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter a new room type"
              value={newRoomType}
              onChange={handleRoomTypeInputChange}
            />
            <button
              className="btn btn-hotel"
              type="button"
              onClick={handleAddNewRoomtype}
            >
              Add
            </button>
          </div>
        )}
      </div>
      {/* )} */}
    </>
  );
};

RoomTypeSelector.propTypes = {
  handleRoomInputChange: PropTypes.func.isRequired,
  newRoom: PropTypes.object.isRequired,
};

export default RoomTypeSelector;
