export function abbrNum(n: number, precision: number) {
  const pow = Math.pow;
  const floor = Math.floor;
  const abs = Math.abs;
  const log = Math.log;
  const abbrev = 'kmb'; //[' m', ' Mo', ' Md']

  function round(n, precision) {
    const prec = Math.pow(10, precision);
    return Math.round(n * prec) / prec;
  }

  function format(n) {
    let base = floor(log(abs(n)) / log(1000));
    const suffix = abbrev[Math.min(2, base - 1)];
    base = abbrev.indexOf(suffix) + 1;
    return suffix ? round(n / pow(1000, base), precision) + suffix : '' + n;
  }

  return format(n);
}

export function getStopWatchTimeString(seconds: number) {
  const m = parseInt(String((seconds % (60 * 60)) / 60));
  const s = parseInt(String(seconds % 60));
  return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
}

export function getValue(data: {}) {
  const result = {};
  for (const objectName in data) {
    if (data[objectName] !== undefined && data[objectName] !== '') {
      result[objectName] = data[objectName];
    }
  }
  return result;
}

export function getMonths(pastYearRange: number, futureYearRange: number) {
  const currentYear = moment().year();
  const startYear = currentYear - pastYearRange;
  const endYear = currentYear + futureYearRange;

  const months: any = [];
  for (let i = 0; i < endYear - startYear; i++) {
    const year = startYear + i;
    for (let i = 0; i < 12; i++) {
      let id = '';
      if (i < 9) {
        id = `${year}-0${i + 1}`;
      } else {
        id = `${year}-${i + 1}`;
      }
      months.push({
        id,
        year,
        month: i + 1,
      });
    }
  }
  return months;
}

export function getWeeks(
  month: string,
  startDate: string | null,
  endDate: string | null,
) {
  const today = moment().format('YYYY-MM-DD');
  const currentMonth = moment(month).month();
  const currentDate = moment(month).startOf('month');
  let week: any = [];
  let weeks: any = [];
  let dayObj: any = {};

  do {
    week = [];
    for (let i = 0; i < 7; i++) {
      dayObj = {
        type: null,
        date: null,
        isToday: false,
        isHoliday: false,
      };
      const currentDateString = currentDate.format('YYYY-MM-DD');
      if (i == currentDate.days() && currentDate.month() == currentMonth) {
        if (startDate && startDate === currentDateString) {
          if (!endDate) {
            dayObj.type = 'single';
          } else {
            dayObj.type = 'start';
          }
        }

        if (endDate && endDate == currentDateString) {
          if (startDate === endDate) {
            dayObj.type = 'single';
          } else {
            dayObj.type = 'end';
          }
        }
        if (
          startDate &&
          startDate < currentDateString &&
          endDate &&
          endDate > currentDateString
        ) {
          dayObj.type = 'between';
        }

        const date = currentDate.clone().format('YYYY-MM-DD');
        dayObj.date = date;
        if (date === today) {
          dayObj.isToday = true;
        }
        if (i === 0 || i === 6) {
          dayObj.isHoliday = true;
        }
        week.push(dayObj);
        currentDate.add(1, 'day');
      } else {
        if (
          startDate &&
          endDate &&
          startDate < startDate &&
          endDate >= startDate
        ) {
          dayObj.type = 'between';
        }

        week.push(dayObj);
      }
    }
    weeks.push(week);
  } while (currentDate.month() == currentMonth);

  return weeks;
}

export function getUniqueMessageId(userId: string) {
  const id = uuidv3(`${new Date().getTime()}${userId}`, uuidv3.DNS);
  const customId = id.replace(/-/gi, '').slice(0, 25);
  return customId;
}

export function getSlicedPosts(posts: getPosts) {
  const EACH = 10;
  if (posts) {
    const data = posts.posts;
    const slicedPosts: {
      title: number;
      data: getPosts_posts[];
    }[] = [];
    const section = Math.floor(data.length / EACH) + 1;

    Array(section)
      .fill(null)
      .forEach((_, i) => {
        const result = data.slice(i * EACH, (i + 1) * EACH);
        if (result.length !== 0) {
          slicedPosts.push({title: i, data: [...result]});
        }
      });

    return slicedPosts;
  } else {
    return [];
  }
}
