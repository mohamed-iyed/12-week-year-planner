import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TacticsIcon from "../../assets/images/Tactics.svg";
// context
import useAppContext from "../../context";

export default function Tactics() {
  const { id } = useParams();
  const { journeys, getJourney, addWeek } = useAppContext();
  const [journey, setJourney] = useState<any>({});
  useEffect(() => {
    setJourney(getJourney(id));
  }, [journeys]);

  function nextWeek() {
    return journey?.weeks?.find((elem: any) => !elem.added);
  }

  return (
    <>
      <h1 className="flex items-center gap-2 text-4xl px-4 py-2 bg-red-400 w-fit mx-auto rounded-lg text-white shadow-md">
        التكتيكات
        <img
          src={TacticsIcon}
          width="45"
          height="45"
          className="bg-white p-1 rounded-[50%]"
        />
      </h1>
      <p className="text-center">
        من :{" "}
        {journey?.startDate?.toLocaleDateString("ar-EG", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        <br /> الى :{" "}
        {journey?.endDate?.toLocaleDateString("ar-EG", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <section className="flex-1 flex flex-wrap overflow-auto gap-5 bg-gray-50 rounded-md shadow-xl p-2 pb-12">
        {journey?.weeks?.map(
          (week: any) =>
            week.added && (
              <Week key={week.number} goals={journey?.goals} {...week} />
            )
        )}
        {nextWeek() ? (
          <form
            className="flex items-center justify-center w-full h-fit p-4"
            onSubmit={(e) => {
              e.preventDefault();
              addWeek(id, nextWeek()?.number);
            }}
          >
            <button className="px-4 py-1 text-lg bg-white rounded-md shadow">
              اضف تكتيكات (الاسبوع
              {` من ${nextWeek()?.start?.toLocaleDateString("ar-EG", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })} الى  ${nextWeek()?.end?.toLocaleDateString("ar-EG", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })} `}
              )
            </button>
          </form>
        ) : (
          ""
        )}
      </section>
    </>
  );
}
function Week({ goals, number, goal }: any) {
  const [newTactic, setNewTactic] = useState({ text: "", type: "" });
  const { addTactic, deleteTactic, addgoalToWeek, removeGoalFromWeek } =
    useAppContext();
  const { id } = useParams();

  return (
    <article className="week min-w-[500px] h-fit mx-auto border border-black rounded-md">
      <div className="flex items-center justify-center">
        <span className="block text-center p-1">
          {goal?.text ? (
            <header className="flex gap-2 flex-row-reverse">
              <p className="border-opacity-0" style={{ border: "0" }}>
                {goal.text}
              </p>
              <button
                className="flex items-center justify-center px-2 text-bold bg-white shadow-sm rounded-[50%]"
                onClick={() => removeGoalFromWeek(id, number)}
              >
                X
              </button>
            </header>
          ) : (
            <select onChange={(e) => addgoalToWeek(id, e.target.value, number)}>
              <option key="initial">اختر هدف</option>
              {goals?.map((goal: any) => (
                <option key={goal.goalId} value={goal.text}>
                  {goal.text}
                </option>
              ))}
            </select>
          )}
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
          <p className="progress w-[65px]">Progress</p>
        </div>
      </div>
      {/* {goalTactics?.map((tactic: any) => (
        <div className="flex gap-2" key={tactic.id}>
          <p className="basis-40">{tactic.text}</p>
          <div className="days grid grid-cols-7 gap-1 flex-1">
            {tactic.type === "number"
              ? tactic.values.map((val: any, i: number) => (
                  <TacticNumber key={i} val={val} index={i} />
                ))
              : tactic.values.map((val: any, i: number) => (
                  <TacticCheckBox key={i} val={val} index={i} />
                ))}
          </div>
          <div>
            <p className="progress w-[65px]">Progress asdsad</p>
          </div>
        </div>
      ))} */}
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex gap-4 justify-center"
        >
          <input
            placeholder="اسم التكتيك"
            value={newTactic.text}
            className="px-2"
            onChange={(e) =>
              setNewTactic((prev: any) => ({ ...prev, text: e.target.value }))
            }
          />
          <div className="days flex items-center">
            <select
              className="h-[90%] outline-0 border-2 rounded-md shadow"
              value={newTactic.type}
              onChange={(e) =>
                setNewTactic((prev: any) => ({ ...prev, type: e.target.value }))
              }
            >
              <option value="0">type</option>
              <option value="checkbox">checkbox</option>
              <option value="number">number</option>
            </select>
          </div>
          <div className="flex items-center justify-center">
            <button className="mr-1 h-[90%] flex items-center justify-center px-4 py-1 bg-white rounded-md shadow-md hover:bg-red-400 hover:text-white transition">
              اضف تكتيك
            </button>
          </div>
        </form>
      </div>
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
