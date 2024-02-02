import React, { useState, useEffect } from "react";

function History() {
  const [data, setData] = useState([]);

  const fetchHistory = async () => {
    try {
      const token = await localStorage.getItem("jwtToken");
      const email = await localStorage.getItem("email");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URI}/${email}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedHistory = await response.json();
      setData(fetchedHistory);
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetch.");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URI}/api/v1/qrscanner/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      const success = await response.json();

      if (success.message === "Data deleted successfully") {
        alert("Data deleted successfully");
        fetchHistory();
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while delete.");
    }
  };

  return (
    <>
      <header>
        <h1 className="flex items-center justify-center font-bold text-2xl mt-2">
          QR-SCANNER
        </h1>
      </header>
      <section className="flex items-center justify-center w-full h-full mt-10 mb-2">
        <table className="border border-black w-full h-full m-10">
          <caption className="font-bold text-xl py-2">History</caption>
          <thead>
            <tr>
              <th className="border border-black p-2">Content</th>
              <th className="border border-black">Date</th>
              <th className="border border-black">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border border-black p-1" align="center">
                  <a href={item.content}>{item.content}</a>
                </td>
                <td className="border border-black p-1" align="center">
                  {item.date}
                </td>
                <td className="border border-black p-1" align="center">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-yellow-200 p-2 rounded-full"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default History;
