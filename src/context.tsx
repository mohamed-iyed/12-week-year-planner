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
          weeks: elem.weeks.map((week: any) => ({
            start: new Date(week.start),
            end: new Date(week.end),
            added: week.added,
            number: week.number,
            goals: week.goals,
          })),
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
  function addgoalToWeek(journeyId: any, goalText: any, weekNumber: any) {
    const journey = getJourney(journeyId);
    const week = journey.weeks.find((week: any) => week.number === weekNumber);
    const goal = {
      id: nanoid(5),
      text: goalText,
      tactics: [],
    };
    week.goals.push(goal);
    setJourneys((prev: any) => [
      ...prev.filter((elem: any) => elem.id !== journeyId),
      journey,
    ]);
  }
  function changeGoalContent(
    journeyId: any,
    weekNumber: any,
    goalId: any,
    newGoal: any
  ) {
    const journey = getJourney(journeyId);
    const week = journey.weeks.find((week: any) => week.number === weekNumber);
    const goal = week.goals.find((goal: any) => goal.id === goalId);
    goal.text = newGoal;

    setJourneys((prev: any) => [
      ...prev.filter((elem: any) => elem.id !== journeyId),
      journey,
    ]);
  }
  function removeGoalFromWeek(journeyId: any, weekNumber: any, goalId: any) {
    const journey = getJourney(journeyId);
    const week = journey.weeks.find((week: any) => week.number === weekNumber);
    week.goals = week.goals.filter((goal: any) => goal.id !== goalId);
    if (week.goals.length === 0) {
      week.added = false;
    }
    setJourneys((prev: any) => [
      ...prev.filter((elem: any) => elem.id !== journeyId),
      journey,
    ]);
  }
  function addTactic(
    tactic: any,
    type: any,
    weekNumber: any,
    goalId: any,
    journeyId: any
  ) {
    const journey = getJourney(journeyId);
    const week = journey.weeks.find((week: any) => week.number === weekNumber);
    const goal = week.goals.find((goal: any) => goal.id === goalId);

    goal.tactics.push({
      id: nanoid(5),
      text: tactic,
      type,
      values: [, , , , , ,],
    });
    setJourneys((prev: any) => [
      ...prev.filter((elem: any) => elem.id !== journeyId),
      journey,
    ]);
  }
  function deleteTactic(
    tacticId: any,
    weekNumber: any,
    goalId: any,
    journeyId: any
  ) {
    const journey = getJourney(journeyId);
    const week = journey.weeks.find((week: any) => week.number === weekNumber);
    const goal = week.goals.find((goal: any) => goal.id === goalId);

    goal.tactics = goal.tactics.filter((tactic: any) => tactic.id !== tacticId);

    setJourneys((prev: any) => [
      ...prev.filter((elem: any) => elem.id !== journeyId),
      journey,
    ]);
  }
  function addWeek(id: any, number: any) {
    const journey = getJourney(id);
    const week = journey.weeks.find((week: any) => week.number === number);
    week.added = true;

    setJourneys((prev: any) => [
      ...prev.filter((elem: any) => elem.id !== id),
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
        addgoalToWeek,
        removeGoalFromWeek,
        deleteIdea,
        addWeek,
        changeGoalContent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export default function useAppContext() {
  return useContext(AppContext);
}
