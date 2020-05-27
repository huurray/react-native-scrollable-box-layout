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
