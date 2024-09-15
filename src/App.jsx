import movieTrailer from "movie-trailer";
import { useState } from "react";
import ReactPlayer from "react-player";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [title, setTitle] = useState("");
  const [trailer, setTrailer] = useState("");

  const findTrailer = async (e) => {
    e.preventDefault();
    movieTrailer(title)
      .then((res) => {
        res ? setTrailer(res) : toast.error("Trailer not found");
      })
      .catch((error) => {
        toast.error("Error: " + error);
      });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <ToastContainer position="top-center" />
      <form
        onSubmit={findTrailer}
        className="flex flex-col items-center w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-4">Find Movie Trailer</h1>
        <input
          type="text"
          placeholder="Search for a movie or series"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />
        <input
          type="submit"
          value="Find Trailer"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg cursor-pointer hover:bg-blue-600"
        />
      </form>
      {trailer && (
        <div className="mt-8 flex justify-center w-full">
          <ReactPlayer
            url={trailer}
            controls
            className="w-full max-w-4xl rounded-lg shadow-md"
          />
        </div>
      )}
    </main>
  );
};

export default App;
