import PropTypes from "prop-types";
import { useState } from "react";

const RoomFilter = ({ data, setFilteredData }) => {
  const [filter, setfilter] = useState("");

  const handleSelectChange = (e) => {
    const selectedRoomType = e.target.value;
    setfilter(selectedRoomType);
    const filteredRooms = data.filter((room) =>
      room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase())
    );
    setFilteredData(filteredRooms);
  };

  const clearFilter = () => {
    setfilter("");
    setFilteredData(data);
  };

  const roomTypes = ["", ...new Set(data.map((room) => room.roomType))];

  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="room-type-filter">
        Filter room by type
      </span>
      <select
        value={filter}
        onChange={handleSelectChange}
        name=""
        id=""
        className="form-select"
      >
        <option value="">Select a room to Filter.....</option>
        {roomTypes.map((type, i) => (
          <option value={type} key={i}>
            {type}{" "}
          </option>
        ))}
      </select>
      <button className="btn btn-hotel" onClick={clearFilter}>
        Clear Search
      </button>
    </div>
  );
};

RoomFilter.propTypes = {
  setFilteredData: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default RoomFilter;
