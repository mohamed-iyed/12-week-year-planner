import { nanoid } from "nanoid";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext<any>(null);

export function ContextProvider({ children }: any) {
  const [journeys, setJourneys] = useState<any>([]);

  useEffect(() => {
    const data = localStorage.getItem("journeys");
    if (data) {
      setJourneys(
        JSON.parse(data).map((elem: any) => ({
          ...elem,
          startDate: new Date(elem.startDate),
          endDate: new Date(elem.endDate),
          weeks: elem.weeks.map((week: any) => new Date(week)),
        }))
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("journeys", JSON.stringify(journeys));
  }, [journeys]);

  function getJourney(id: any) {
    return journeys.find((j: any) => j.id === id);
  }
  function addVision(vision: any, id: any) {
    const journey = getJourney(id);
    const visionObj = {
      id: nanoid(5),
      text: vision,
      ideas: [],
    };

    journey?.visions?.push(visionObj);
    setJourneys((prev: any) => [
      ...prev.filter((elem: any) => elem.id !== id),
      journey,
    ]);
  }
  function deleteVision(visionId: any, id: any) {
    const journey = getJourney(id);
    journey.visions = journey.visions.filter((v: any) => v.id !== visionId);
    setJourneys((prev: any) => [
      ...prev.filter((elem: any) => elem.id !== id),
      journey,
    ]);
  }
  function addIdea(idea: any, visionId: any, journeyId: any) {
    const journey = getJourney(journeyId);
    const vision = journey.visions.find((v: any) => v.id === visionId);
    vision.ideas.push({
      id: nanoid(5),
      text: idea,
    });
    setJourneys((prev: any) => [
      ...prev.filter((elem: any) => elem.id !== journeyId),
      journey,
    ]);
  }
  function deleteIdea(ideaId: any, visionId: any, journeyId: any) {
    const journey = getJourney(journeyId);
    let vision = journey.visions.find((v: any) => v.id === visionId);
    vision.ideas = vision.ideas.filter((idea: any) => idea.id !== ideaId);
    setJourneys((prev: any) => [
      ...prev.filter((elem: any) => elem.id !== journeyId),
      journey,
    ]);
  }
  function addGoal(goal: any, id: any) {
    const journey = getJourney(id);
    journey.goals.push({
      id: nanoid(5),
      text: goal,
      tactics: [],
    });
    setJourneys((prev: any) => [
      ...prev.filter((elem: any) => elem.id !== id),
      journey,
    ]);
  }
  function deleteGoal(goalId: any, journeyId: any) {
    const journey = getJourney(journeyId);
    journey.goals = journey.goals.filter((goal: any) => goal.id !== goalId);
    setJourneys((prev: any) => [
      ...prev.filter((elem: any) => elem.id !== journeyId),
      journey,
    ]);
  }

  function addTactic(tactic: any, type: any, goalId: any, journeyId: any) {
    const journey = getJourney(journeyId);
    const goal = journey.goals.find((goal: any) => goal.id === goalId);
    goal.tactics.push({
      id: nanoid(5),
      text: tactic,
      type,
      values: [, , , , , ,].fill(undefined),
    });
    setJourneys((prev: any) => [
      ...prev.filter((elem: any) => elem.id !== journeyId),
      journey,
    ]);
  }
  function deleteTactic(tacticId: any, goalId: any, journeyId: any) {
    const journey = getJourney(journeyId);
    let goal = journey.goals.find((goal: any) => goal.id === goalId);
    goal = goal.tactics.filter((tac: any) => tac.id !== tacticId);
    setJourneys((prev: any) => [
      ...prev.filter((elem: any) => elem.id !== journeyId),
      journey,
    ]);
  }

  return (
    <AppContext.Provider
      value={{
        journeys,
        setJourneys,
        getJourney,
        addVision,
        addTactic,
        addGoal,
        addIdea,
        deleteVision,
        deleteTactic,
        deleteGoal,
        deleteIdea,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export default function useAppContext() {
  return useContext(AppContext);
}
