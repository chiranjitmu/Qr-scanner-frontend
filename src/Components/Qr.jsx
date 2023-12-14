import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";

const Qr = () => {
  const [data, setData] = useState("No Results");
  const [modal, setModal] = useState(false);


  useEffect(() => {
    if (data !== "No Results") {
      result();
    }
  }, [data]);

  const result = async () => {
    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();
      const formateddate = formattedDate.substring(0, 10);
      const token = await localStorage.getItem("jwtToken");
      const email = await localStorage.getItem("email");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URI}/api/v1/qrscanner/insert`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: data,
            date: formateddate,
            username: email,
          }),
        }
      );
      const content = await response.json();
      if (content.message === "Data inserted successfully") {
        console.log("Data inserted successfully");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetch.");
    }
  };

  return (
    <>
      <header>
        <h1 className="flex justify-center font-bold text-2xl mt-2">
          QR-SCANNER
        </h1>
      </header>
      <section className="md:flex items-center mt-10 ml-12 md:mt-36 md:ml-52 md:space-x-80">
        <aside className="md:space-y-14">
          <button
            className="text-white bg-black p-3 rounded-full"
            onClick={() => {
              setModal(true);
            }}
          >
            QR-Scan
          </button>
          <a
            href="/history"
            className="text-white bg-black p-3 ml-5 rounded-full"
          >
            History
          </a>
          <p className="text-xl w-44 my-5">
            Scan <span className="text-green-300 font-bold">QR-code</span> and
            get the scanned result
          </p>
        </aside>
        {!modal && (
          <aside>
            <p className="md:text-2xl md:ml-5 border border-black w-64 md:w-96 h-60 flex items-center justify-center">
              Get the QR scanner Here!
            </p>
          </aside>
        )}
      </section>
      {modal && (
        <section className="absolute md:top-32 md:left-96 md:ml-80">
          <QrReader
            onResult={(result, error) => {
              if (result) {
                setData(result?.text);
              }

              if (error) {
                console.info(error);
              }
            }}
            className="ml-5 w-72 md:w-96 h-96"
          />
          <a href={data} className="mt-0 text-blue-400">
            {data}
          </a>
        </section>
      )}
    </>
  );
};

export default Qr;
