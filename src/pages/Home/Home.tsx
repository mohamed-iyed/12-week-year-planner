import { nanoid } from "nanoid";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAppContext from "../../context";
import formatDate from "../../utils/formatDate";

export default function Home() {
  const navigate = useNavigate();
  const { journeys, setJourneys } = useAppContext();

  function startNewJourney() {
    const { startDate, endDate, weeks } = formatDate();
    const id = nanoid(10);
    setJourneys((prev: any) => {
      return [
        ...prev,
        { id, startDate, endDate, weeks, visions: [], goals: [] },
      ];
    });
    navigate(`/journeys/${id}`);
  }
  function removeJourney(journeyId: string) {
    setJourneys((prev: any) =>
      prev.filter((elem: any) => elem.id !== journeyId)
    );
  }
  return (
    <main className="hero w-screen h-screen bg-hero-bg bg-cover flex flex-col gap-8 items-center justify-center">
      <h1 className="title text-white text-9xl">12 Week Year</h1>
      <div>
        {journeys?.length > 0 && (
          <>
            <h2 className="text-white">Your existing journeys : </h2>
            <ul>
              {journeys?.map(({ id, startDate, endDate }: any, i: number) => (
                <li
                  key={i}
                  className="text-white text-center flex flex-col gap-1"
                >
                  journey {i + 1} : from {startDate.toLocaleDateString()} to{" "}
                  {endDate.toLocaleDateString()}
                  <div className="flex flex-col items-center gap-1 shadow">
                    <button className="border px-4 py-1 hover:bg-white hover:text-black transition">
                      <Link to={`journeys/${id}`}>go to journey</Link>
                    </button>
                    <button
                      className="border px-2 py-1 hover:bg-white hover:text-black transition"
                      onClick={() => removeJourney(id)}
                    >
                      remove journey
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <button
        className="px-7 py-2 bg-transparent text-white font-bold border-2 border-white rounded-md shadow-inner hover:text-red-900 hover:bg-white transition"
        onClick={() => startNewJourney()}
      >
        Start A Journey
      </button>
    </main>
  );
}
