import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();

  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  const res = await api.post("/rooms/add/new-room", formData);

  if (res.status === 201) {
    return true;
  } else {
    return false;
  }
}

// fetch all room type
export async function getRoomType() {
  try {
    const res = await api.get("/rooms/room/type");

    return res.data;
  } catch (error) {
    throw new Error("Error Fetching Room Type");
  }
}

export async function getAllRooms() {
  try {
    const res = await api.get("/rooms/room/all-rooms");

    return res.data;
  } catch (error) {
    throw new Error("Error Fetching All Room");
  }
}

export async function deleteRoom(roomId) {
  try {
    const res = await api.delete(`/rooms/delete/room/${roomId}`);

    return res.data;
  } catch (error) {
    throw new Error(`Error Deleting Room ${error.message}`);
  }
}

export async function updateRoom(roomId, roomData) {
  const formData = new FormData();

  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  formData.append("photo", roomData.photo);

  const res = await api.put(`/rooms/update/${roomId}`, formData);

  return res;
}

export async function getRoomById(roomId) {
  try {
    const res = await api.get(`/rooms/room/${roomId}`);

    return res.data;
  } catch (error) {
    throw new Error(`Error Fetching Room ${error.message}`);
  }
}
