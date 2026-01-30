export default function DateMonth({ date }) {
  const monthString = new Date(parseInt(date)).toDateString().slice(4, 7);
  const month = (
    monthString === "Jan" ? "JAN" : (
      monthString === "Feb" ? "FEB" : (
        monthString === "Mar" ? "MAR" : (
          monthString === "Apr" ? "APR" : (
            monthString === "May" ? "MAY" : (
              monthString === "Jun" ? "JUN" : (
                monthString === "Jul" ? "JUL" : (
                  monthString === "Aug" ? "AUG" : (
                    monthString === "Sep" ? "SEP" : (
                      monthString === "Oct" ? "OCT" : (
                        monthString === "Nov" ? "NOV" : (
                          monthString === "Dec" ? "DEC" : null
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  );
  return (
    <span>{month}</span>
  );
}