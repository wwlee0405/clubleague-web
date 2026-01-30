export default function DateDayOfWeek({ date }) {
  const dayOfWeekString = new Date(parseInt(date)).toDateString().slice(0, 3);
  const dayOfWeek = (
    dayOfWeekString === "Mon" ? "MONDAY" : (
      dayOfWeekString === "Tue" ? "TUESEDAY" : (
        dayOfWeekString === "Wed" ? "WEDNESDAY" : (
          dayOfWeekString === "Thu" ? "THURSDAY" : (
            dayOfWeekString === "Fri" ? "FRIDAY" : (
              dayOfWeekString === "Sat" ? "SATURDAY" : (
                dayOfWeekString === "Sun" ? "SUNDAY" : null
              )
            )
          )
        )
      )
    )
  );
  return (
    <span>{dayOfWeek}</span>
  );
}