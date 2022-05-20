import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// context
import useAppContext from "../../context";
import Goal from "../../assets/images/Goal.svg";
import Delete from "../../assets/images/Delete.svg";
import ItemBullet from "../../assets/images/ItemBullet.svg";
import { useParams } from "react-router-dom";

export default function Goals() {
  const [goalText, setGoalText] = useState("");

  const { id } = useParams();

  const { journeys, addGoal, deleteGoal, getJourney } = useAppContext();
  const [journey, setJourney] = useState<any>({});
  useEffect(() => {
    setJourney(getJourney(id));
  }, [journeys]);

  return (
    <>
      <h1 className="flex items-center gap-2 text-4xl px-4 py-2 bg-red-400 w-fit mx-auto rounded-lg text-white shadow-md">
        الأهداف
        <img
          src={Goal}
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
      <section className="flex-1 pb-12 flex flex-wrap gap-5 bg-gray-50 rounded-md shadow-xl p-2">
        <ul
          className="sm:pl-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 justify-center items-start gap-2"
          style={{ gridAutoRows: "max-content" }}
        >
          {journey?.goals?.map(({ text, id: goalId }: any) => {
            return (
              <li
                key={goalId}
                className="flex gap-1 items-center bg-white w-fit px-2 py-1 rounded-md shadow-md"
              >
                <img src={ItemBullet} width="10" height="10" />
                <p className="break-all break-words text-lg">{text}</p>
                <button onClick={() => deleteGoal(goalId, id)}>
                  <img
                    src={Delete}
                    width="20"
                    height="20"
                    className="min-w-[20px] min-h-[20px]"
                  />
                </button>
              </li>
            );
          })}
          {
            <li
              key={"ddddd"}
              className="flex min-h-10 max-w-full gap-1 items-center bg-white w-fit px-2 py-1 rounded-md shadow-md"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (goalText.trim() === "") {
                    toast.error("goal must not be empty");
                  }
                  const goal = journey?.goals?.find(
                    (elem: any) => elem.text === goalText
                  );
                  if (goal) {
                    return toast.error("goal already exist !");
                  }
                  addGoal(goalText, id);
                  setGoalText("");
                }}
                className="flex items-center gap-2 flex-wrap justify-center"
              >
                <input
                  type="text"
                  placeholder="هدف جديد..."
                  className="border-b-2 outline-none text-lg"
                  value={goalText}
                  onChange={(e) => setGoalText(e.target.value)}
                />
                <button className="border-2 py-1 px-2 rounded-md">
                  اضف الهدف
                </button>
              </form>
            </li>
          }
        </ul>
      </section>
    </>
  );
}
