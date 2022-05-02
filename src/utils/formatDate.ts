export default function () {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 12 * 7)); // 12 week * 7 days + current Date

  const weeks = [];
  const startDateClone = new Date(startDate);
  weeks[0] = {
    start: startDate,
    end: new Date(startDateClone.setDate(startDate.getDate() + 7)),
  };
  for (let i = 1; i < 12; i++) {
    const prevDate = new Date(weeks[i - 1].end);

    const nextDate: any = {
      start: prevDate,
      end: new Date(new Date(prevDate).setDate(prevDate.getDate() + 7)),
    };
    weeks[i] = nextDate;
  }
  return {
    startDate,
    endDate,
    weeks,
  };
}
