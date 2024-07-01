import { useEffect, useState } from "react";
import { deleteRoom, getAllRooms } from "../utils/api";
import { Col, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";

import { Link } from "react-router-dom";
import Footer from "../layout/Footer";

const ExistingRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomtype] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const result = await getAllRooms();

      setRooms(result);
      setIsLoading(false);
      setSuccessMessage();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (selectedRoomType === "") {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter(
        (room) => room.roomType === selectedRoomType
      );
      setFilteredRooms(filtered);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomType]);

  const handlePagination = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleDelete = async (roomId) => {
    try {
      const result = await deleteRoom(roomId);

      if (result === "") {
        setSuccessMessage(`Room No ${roomId} was Deleted`);
        fetchRooms();
      } else {
        console.error(`Error Deleting room : ${result.message}`);
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 3000);
  };

  const calculateTotalPages = (filteredRooms, roomPages, rooms) => {
    const totalPages =
      filteredRooms.length > 0 ? filteredRooms.length : rooms.length;

    return Math.ceil(totalPages / roomPages);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  return (
    <>
      <div className="container col-md-8 col-lg-6">
        {successMessage && (
          <p className="alert alert-success mt-5">{successMessage} </p>
        )}
        {errorMessage && (
          <p className="alert alert-danger mt-5">{errorMessage} </p>
        )}
      </div>
      {isLoading ? (
        <p className="text-center">Page Loading.....</p>
      ) : (
        <>
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-between align-items-center gap-3 my-3">
              <h2>Search Rooms</h2>
            </div>

            <Row className="align-items-center">
              <Col md={6} className=" mb-md-0">
                <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
              </Col>

              <Col md={6} className="d-flex justify-content-end ">
                <Link to={"/add-room"} className="btn btn-outline-info">
                  <FaPlus /> Add New Room
                </Link>
              </Col>
            </Row>

            <table className="table table-bordered table-hover mt-4">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Room Type</th>
                  <th>Room Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRooms?.map((room) => (
                  <tr className="text-center" key={room.id}>
                    <td>{room.id} </td>
                    <td>{room.roomType} </td>
                    <td>{room.roomPrice} </td>
                    <td className="">
                      <Link to={`/edit-room/${room.id}`}>
                        <span className="btn btn-info btn-sm">
                          <FaEye />
                        </span>
                        <span className="btn btn-warning btn-sm mx-1">
                          <FaEdit />
                        </span>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(room.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <RoomPaginator
              currentPage={currentPage}
              totalPage={calculateTotalPages(
                filteredRooms,
                roomsPerPage,
                rooms
              )}
              onPageChange={handlePagination}
            />
          </section>
        </>
      )}
      <Footer />
    </>
  );
};

export default ExistingRooms;
