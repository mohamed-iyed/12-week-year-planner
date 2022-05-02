import { useState } from "react";
import { useParams } from "react-router-dom";
import TacticsIcon from "../../assets/images/Tactics.svg";
// context
import useAppContext from "../../context";

export default function Tactics() {
  const { id } = useParams();
  const { getJourney, addTactic, deleteTactic } = useAppContext();
  const journey = getJourney(id);

  return (
    <>
      <h1 className="flex items-center gap-2 text-4xl px-4 py-2 bg-red-400 w-fit mx-auto rounded-lg text-white shadow-md">
        Tactics
        <img
          src={TacticsIcon}
          width="45"
          height="45"
          className="bg-white p-1 rounded-[50%]"
        />
      </h1>
      <p className="text-center">
        from : {journey.startDate.toDateString()}
        <br /> to : {journey.endDate.toDateString()}
      </p>
      <section className="flex-1 flex flex-wrap overflow-auto gap-5 bg-gray-50 rounded-md shadow-xl p-2 pb-12">
        {journey.goals.map((goal: any) => (
          <Week
            goalText={goal.text}
            goalId={goal.id}
            goalTactics={goal.tactics}
          />
        ))}
      </section>
    </>
  );
}
function Week({ goalText, goalId, goalTactics }: any) {
  return (
    <article className="week min-w-[500px] h-fit mx-auto border border-black rounded-md">
      <div className="flex items-center justify-center">
        <span className="block text-center p-1">
          {goalText}
          <span className="block"></span>
        </span>
      </div>
      <div className="headings flex gap-2">
        <p className="basis-40">Tactics</p>
        <div className="days gap-1 flex-1 grid grid-cols-7">
          <p>Sun</p>
          <p>Mon</p>
          <p>Tue</p>
          <p>Thu</p>
          <p>Wed</p>
          <p>Fri</p>
          <p>Sat</p>
        </div>
        <div>
          <p className="progress">Progress</p>
        </div>
      </div>
      {goalTactics.map((tactic: any) => (
        <div className="flex gap-2" key={tactic.id}>
          <p className="basis-40">{tactic.text}</p>
          <div className="days grid grid-cols-7 gap-1 flex-1">
            {tactic.type === "number"
              ? tactic.values.map((val: any, i: number) => (
                  <TacticNumber val={val} index={i} />
                ))
              : tactic.values.map((val: any, i: number) => (
                  <TacticCheckBox val={val} index={i} />
                ))}
          </div>
          <div>
            <p className="progress">Progress</p>
          </div>
        </div>
      ))}
    </article>
  );
}
function TacticNumber({ val, index }: any) {
  const [tValue, setTvalue] = useState(val);

  return (
    <div>
      <input
        type="number"
        value={tValue}
        onChange={(e) => setTvalue(e.target.value)}
        className="max-h-8 bg-transparent max-w-full"
      />
    </div>
  );
}
function TacticCheckBox({ val, index }: any) {
  const [tValue, setTvalue] = useState(val);

  return (
    <div>
      <input
        type="checkbox"
        checked={!!tValue}
        onChange={(e) => setTvalue(e.target.checked)}
        className="max-h-8 bg-transparent max-w-full"
      />
    </div>
  );
}
