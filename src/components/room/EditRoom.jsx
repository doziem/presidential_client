import { useState } from "react";
import { getRoomById, updateRoom } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

const EditRoom = () => {
  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: 0,
  });

  const { roomId } = useParams();

  const [roomPrice, setRoomPrice] = useState(0);

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = async (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    setRoom({ ...room, [name]: value });
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
    setRoom({ ...room, roomPrice: value });
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        setImagePreview(roomData.photo);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const success = await updateRoom(roomId, room);

      if (success.status === 200) {
        setSuccessMessage("Room Successfully Updated");
        const updatedRoomData = await getRoomById(roomId);
        setRoom(updatedRoomData);
        setImagePreview(updatedRoomData.photo);
      } else {
        setErrorMessage("Error Updating Room");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <section className="container, mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mt-5 mb-2">Edit Room</h2>
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
              <input
                type="text"
                required
                id="roomType"
                name="roomType"
                value={room.roomType}
                onChange={handleRoomInputChange}
                className="form-control"
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
                value={roomPrice || room.roomPrice}
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
                id="photo"
                name="photo"
                onChange={handleImageChange}
                className="form-control"
              />
              {imagePreview && (
                <img
                  src={`data:image/jpeg;base64,${imagePreview}` || imagePreview}
                  alt="Preview Room Photo"
                  style={{ maxHeight: "350px", maxWidth: "450px" }}
                  className="my-3"
                />
              )}
            </div>
            <div className="d-grid d-md-flex gap-3 mt-2">
              <Link
                to={"/existing-rooms"}
                className="btn btn-outline-info ml-5"
              >
                Back
              </Link>
              <button className="btn btn-outline-warning">Edit Room</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditRoom;
