import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TacticsIcon from "../../assets/images/Tactics.svg";
// context
import useAppContext from "../../context";
// icons
import Delete from "../../assets/images/Delete.svg";

export default function Tactics() {
  const { id } = useParams();
  const { journeys, getJourney, addWeek, addgoalToWeek } = useAppContext();
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
              <Week key={week.number} allGoals={journey?.goals} {...week} />
            )
        )}
        {nextWeek() ? (
          <form
            className="flex items-center justify-center w-full h-fit p-4"
            onSubmit={(e) => {
              e.preventDefault();
              const weekNumber: any = nextWeek()?.number;
              if (weekNumber) {
                console.log(weekNumber);
                addWeek(id, weekNumber);
                addgoalToWeek(id, null, weekNumber);
              }
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
function Week({ allGoals, goals, number, start, end }: any) {
  return (
    <>
      {goals?.map((goal: any, i: number) => (
        <WeekGoal
          key={i}
          allGoals={allGoals}
          goal={goal}
          start={start}
          end={end}
          number={number}
        />
      ))}
    </>
  );
}

function WeekGoal({ goal, start, end, number, allGoals }: any) {
  const [newTactic, setNewTactic] = useState({ text: "", type: "0" });
  const {
    addTactic,
    deleteTactic,
    addgoalToWeek,
    removeGoalFromWeek,
    changeGoalContent,
  } = useAppContext();
  const { id } = useParams();

  const days: string[] = [];
  for (let i = 0; i < 7; i++) {
    const startClone = new Date(start);
    const newDate = new Date(startClone.setDate(start.getDate() + i));
    days.push(
      newDate.toLocaleDateString("ar-EG", { weekday: "long" }).slice(2)
    );
  }

  return (
    <article
      key={goal?.id}
      className="week min-w-[500px] h-fit mx-auto border border-black rounded-md relative"
    >
      <button
        className="absolute left-2 top-1 bg-white shadow border px-4 pointer"
        onClick={() => addgoalToWeek(id, null, number)}
      >
        اضافة هدف جديد
      </button>
      <button
        className="absolute right-2 top-1 bg-white shadow border px-4 pointer"
        onClick={() => removeGoalFromWeek(id, number, goal.id)}
      >
        حذف الهدف
      </button>
      <div className="flex items-center justify-center">
        <span className="block text-center p-1">
          {goal?.text ? (
            <header className="flex gap-2 flex-row-reverse items-center justify-center">
              <p className="border-opacity-0" style={{ border: "0" }}>
                {goal.text}
              </p>
              <button
                className="flex items-center justify-center px-2 text-bold bg-white shadow-sm rounded-[50%]"
                onClick={() => changeGoalContent(id, number, goal.id, null)}
              >
                X
              </button>
            </header>
          ) : (
            <select
              onChange={(e) =>
                changeGoalContent(id, number, goal.id, e.target.value)
              }
            >
              <option key="initial">اختر هدف</option>
              {allGoals?.map((goal: any) => (
                <option key={goal.goalId} value={goal.text}>
                  {goal.text}
                </option>
              ))}
            </select>
          )}
          <span className="block">
            من{" "}
            {start.toLocaleDateString("ar-EG", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}{" "}
            إلى{" "}
            {end.toLocaleDateString("ar-EG", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
        </span>
      </div>
      <div className="headings flex gap-2">
        <p className="basis-40">التكتيكات </p>
        <div className="days gap-1 flex-1 grid grid-cols-7">
          {days.map((day: string, i: number) => (
            <p key={i}>{day}</p>
          ))}
        </div>
        <div>
          <p className="progress w-[65px]">نسبة النجاح</p>
        </div>
      </div>
      {goal?.tactics?.map((tactic: any) => {
        console.log(tactic.type === "number");
        return (
          <div className="flex gap-2" key={tactic.id}>
            <p className="basis-40 flex justify-between">
              {tactic.text}{" "}
              <button>
                <img src={Delete} width="20" height="20" alt="حذف التكتيك" />
              </button>
            </p>
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
              <p className="progress w-[65px]">نسبة النجاح</p>
            </div>
          </div>
        );
      })}
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(newTactic.type);
            if (newTactic.type === "0") {
              return toast.error("اختر نوع التكتيك من فضلك");
            }
            if (newTactic.text.trim() === "") {
              return toast.error("يجب على التكتيك ان لا يكون فارغا");
            }
            addTactic(newTactic.text, newTactic.type, number, goal.id, id);
          }}
          className="flex gap-4 justify-center"
        >
          <input
            placeholder="اسم التكتيك"
            value={newTactic.text}
            className="px-2"
            onChange={(e) =>
              setNewTactic((prev: any) => ({
                ...prev,
                text: e.target.value,
              }))
            }
          />
          <div className="days flex items-center">
            <select
              className="h-[90%] outline-0 border-2 rounded-md shadow"
              value={newTactic.type}
              onChange={(e) =>
                setNewTactic((prev: any) => ({
                  ...prev,
                  type: e.target.value,
                }))
              }
            >
              <option value="0">النوع</option>
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
