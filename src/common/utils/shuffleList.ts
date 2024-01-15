export function shuffleList<T>(list: T[]): T[] {
  let currentIndex = list.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [list[currentIndex], list[randomIndex]] = [
      list[randomIndex], list[currentIndex]];
  }

  return list;
}

export default shuffleList;
