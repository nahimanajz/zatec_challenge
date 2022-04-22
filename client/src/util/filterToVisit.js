import { toLowerCase } from ".";
/**
 * 
 * @param {Array} filtered 
 * @param {Array} countries 
 * @param {String} visitStatus 
 * @return visited or planning to visit based on keyword
 */
export const filterTOvisit = (filtered, countries,visitStatus)=>countries.filter((c) =>
filtered && filtered.find(({ name, visiteStatus }) =>
  toLowerCase(c.name) === toLowerCase(name) && visiteStatus === visitStatus

))