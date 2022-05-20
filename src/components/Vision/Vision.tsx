import { useEffect, useState } from "react";
// context
import useAppContext from "../../context";
// images
import VisionIcon from "../../assets/images/Vision.png";
import ItemBullet from "../../assets/images/ItemBullet.svg";
import Delete from "../../assets/images/Delete.svg";
// toast
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
// vision options images
import Health from "../../assets/images/Health.svg";
import Job from "../../assets/images/Job.svg";
import Person from "../../assets/images/Person.svg";
import School from "../../assets/images/School.svg";
import Religious from "../../assets/images/Quran.svg";

// vision options
const options = [
  "الشخصي",
  "الديني",
  "العمل",
  "المدرسةّ او الجامعة",
  "الصحة",
  "اخر",
];
// options images
const optionsImages = options.reduce((obj: any, elem: string) => {
  switch (elem) {
    case "الشخصي":
      obj[elem] = Person;
      return obj;
    case "الديني":
      obj[elem] = Religious;
      return obj;
    case "العمل":
      obj[elem] = Job;
      return obj;
    case "المدرسةّ او الجامعة":
      obj[elem] = School;
      return obj;
    case "الصحة":
      obj[elem] = Health;
      return obj;
    default:
      return obj;
  }
}, {});

export default function Vision() {
  const [sector, setSector] = useState("الشخصي");
  const { id } = useParams();
  const { journeys, getJourney, addVision } = useAppContext();
  const [journey, setJourney] = useState<any>({});
  useEffect(() => {
    setJourney(getJourney(id));
  }, [journeys]);

  return (
    <>
      <h1 className="flex items-center gap-2 text-4xl px-4 py-2 bg-red-400 w-fit mx-auto rounded-lg text-white shadow-md">
        الرؤية
        <img
          src={VisionIcon}
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
      <section className="flex-1 pb-14 flex flex-wrap gap-5 bg-gray-50 rounded-md shadow-xl p-2">
        {journey?.visions?.length === 0 && (
          <article className="p-1 basis-80 border-0 border-l-2 flex flex-col gap-1 rounded-lg">
            <header className="font-light">مثال :</header>
            <h4 className="text-red-900 text-lg font-semibold">
              الجانب الشخصي :
            </h4>
            <ul className="pl-4 flex flex-col gap-1">
              <li className="flex gap-1 bg-white w-fit px-2 py-1 rounded-md shadow-md">
                <img src={ItemBullet} width="10" height="10" />
                <p className="">اريد ان اصبح اذكى</p>
              </li>
              <li className="flex gap-1 bg-white w-fit px-2 py-1 rounded-md shadow-md">
                <img src={ItemBullet} width="10" height="10" />
                <p className="">.....</p>
              </li>
            </ul>
          </article>
        )}
        {journey?.visions?.map((visionSector: any, i: number) => (
          <VisionSector key={i} {...visionSector} />
        ))}
        <article className="p-1 min-w-[250px] flex-auto flex items-center justify-center flex-col gap-1 rounded-lg">
          <form
            action=""
            onSubmit={(e: any) => {
              e.preventDefault();
              if (
                sector.trim() === "" ||
                journey?.visions?.find((v: any) => v.text === sector)
              ) {
                return toast.error("sector must not be empty or repeated");
              }
              addVision(sector, id);
              setSector("");
            }}
            className="flex flex-col gap-2"
          >
            <select
              className="bg-gray-700 border-0 outline-none rounded-md px-3 py-1 text-white"
              value={sector}
              onChange={(e: any) => setSector(e.target.value)}
            >
              {options.map((op) => (
                <option value={op} key={op}>
                  {op}
                </option>
              ))}
            </select>
            <button className="px-3 py-1 bg-black border-2 text-white rounded-md hover:text-black hover:border-2 hover:border-current transition hover:bg-white">
              اضف الجانب
            </button>
          </form>
        </article>
      </section>
    </>
  );
}

function VisionSector({ id: visionId, text, ideas }: any) {
  const { id } = useParams();

  const [visionInput, setVisionInput] = useState("");
  const { deleteVision, deleteIdea, addIdea } = useAppContext();

  let icon = optionsImages[text.toLowerCase()];

  return (
    <article
      className={`relative p-1 md:min-w-[300px] md:max-w-[360px] max-w-full border-0 sm:border-l-2 flex flex-col gap-1 rounded-lg`}
    >
      <button
        onClick={() => deleteVision(visionId, id)}
        className="absolute left-1 p-1 flex items-center justify-center shadow-md rounded-[50%] bg-white"
      >
        <img src={Delete} width="25" height="25" />
      </button>

      <h4 className="text-red-900 text-lg font-semibold flex items-center gap-2">
        {icon ? <img src={icon} width="25" height="25" alt={text} /> : ""}{" "}
        الجانب {text} :
      </h4>
      <ul className="pl-4 flex flex-col gap-1">
        {ideas?.map((idea: any, i: number) => (
          <li
            key={idea.id}
            className="flex gap-1 sm:max-w-[360px] bg-white w-fit px-2 py-1 rounded-md shadow-md break-words break-all"
          >
            <img src={ItemBullet} width="10" height="10" />
            <p className="">{idea.text}</p>
            <button onClick={() => deleteIdea(idea.id, visionId, id)}>
              <img
                src={Delete}
                width="20"
                height="20"
                className="min-w-[20px] min-h-[20px]"
              />
            </button>
          </li>
        ))}
        <li className="flex gap-1 bg-white w-fit px-2 py-1 rounded-md shadow-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addIdea(visionInput, visionId, id);
              setVisionInput("");
            }}
            className="flex flex-col items-center gap-1"
          >
            <input
              type="text"
              className="outline-none border-b-2"
              value={visionInput}
              onChange={(e) => setVisionInput(e.target.value)}
            />
            <button className="bg-red-400 px-3 text-white shadow-sm rounded-sm">
              اضف الرؤية
            </button>
          </form>
        </li>
      </ul>
    </article>
  );
}
