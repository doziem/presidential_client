import { useState } from "react";
import { addRoom } from "../utils/api";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { Link } from "react-router-dom";

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: 0,
  });

  const [roomPrice, setRoomPrice] = useState(0);

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleRoomPrice = (e) => {
    // const name= e.target.name
    let value = e.target.value;

    if (value === "roomPrice") {
      if (isNaN(value)) {
        value.parseInt(value);
      } else {
        value = "";
      }
    }
    setRoomPrice(value);
  };

  const handleImageChange = async (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const success = await addRoom(newRoom.photo, newRoom.roomType, roomPrice);

      if (success !== undefined) {
        setSuccessMessage("New Room Added");
        setNewRoom({ photo: null, roomType: "", roomPrice: "" });
        setErrorMessage("");
        setImagePreview("");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <section className="container, mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mt-5 mb-2">Add New Room</h2>
          {successMessage && (
            <div className="alert alert-success fade show">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="alert alert-danger fade show">{errorMessage}</div>
          )}

          <form action="POST" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="roomType">
                Room Type
              </label>
              <RoomTypeSelector
                newRoom={newRoom}
                handleRoomInputChange={handleRoomInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="roomPrice">
                Room Price
              </label>
              <input
                type="number"
                required
                id="roomPrice"
                name="roomPrice"
                value={roomPrice}
                onChange={handleRoomPrice}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="photo">
                Room Photo
              </label>
              <input
                type="file"
                required
                id="photo"
                name="photo"
                onChange={handleImageChange}
                className="form-control"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview Room Photo"
                  style={{ maxHeight: "350px", maxWidth: "400px" }}
                  className="my-3"
                />
              )}
            </div>
            <div className="d-grid d-md-flex ml-5  gap-3">
              <Link to={"/existing-rooms"} className="btn btn-outline-info">
                Back
              </Link>
              <button className="btn btn-outline-primary">Create Room</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddRoom;
