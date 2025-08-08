export const mergeDateAndTimeToISO = (
  dateAsString?: string | null,
  timeAsString?: string | null
) => {
  if (!dateAsString) {
    return undefined;
  }

  const date = new Date(dateAsString);
  const [hours, minutes] = timeAsString?.split(":").map(Number) ?? [0, 0];
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date.toISOString();
};
