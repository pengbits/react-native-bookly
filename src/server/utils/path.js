
// https://medium.com/javascript-inside/safely-accessing-deeply-nested-values-in-javascript-99bf72a0855a
export default (p, o) => {
  return p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)
}