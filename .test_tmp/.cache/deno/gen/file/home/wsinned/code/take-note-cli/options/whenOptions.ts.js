export var When = /*#__PURE__*/ function(When) {
  When[When["lastWeek"] = 0] = "lastWeek";
  When[When["thisWeek"] = 1] = "thisWeek";
  When[When["nextWeek"] = 2] = "nextWeek";
  return When;
}({});
export function isValidWhenOption(option) {
  const when = When[option];
  return when !== undefined;
}
export function whenFromString(input) {
  if (isValidWhenOption(input)) {
    const when = When[input];
    return when;
  } else {
    throw new Error("invalid When option, must be one of |thisWeek|nextWeek|lastWeek|");
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS93c2lubmVkL2NvZGUvdGFrZS1ub3RlLWNsaS9vcHRpb25zL3doZW5PcHRpb25zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIFdoZW4ge1xuICAgIGxhc3RXZWVrLFxuICAgIHRoaXNXZWVrLFxuICAgIG5leHRXZWVrXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkV2hlbk9wdGlvbihvcHRpb246IHVua25vd24pIHtcbiAgICBjb25zdCB3aGVuID0gV2hlbltvcHRpb24gYXMga2V5b2YgdHlwZW9mIFdoZW5dXG4gICAgcmV0dXJuIHdoZW4gIT09IHVuZGVmaW5lZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gd2hlbkZyb21TdHJpbmcoaW5wdXQ6IHVua25vd24pOiBXaGVuIHtcbiAgICBpZiAoaXNWYWxpZFdoZW5PcHRpb24oaW5wdXQpKSB7XG4gICAgICAgIGNvbnN0IHdoZW4gPSBXaGVuW2lucHV0IGFzIGtleW9mIHR5cGVvZiBXaGVuXVxuICAgICAgICByZXR1cm4gd2hlblxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgV2hlbiBvcHRpb24sIG11c3QgYmUgb25lIG9mIHx0aGlzV2Vla3xuZXh0V2Vla3xsYXN0V2Vla3xcIilcbiAgICB9XG59Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBQSxBQUFLLDhCQUFBOzs7O1NBQUE7TUFJWDtBQUVELE9BQU8sU0FBUyxrQkFBa0IsTUFBZTtFQUM3QyxNQUFNLE9BQU8sSUFBSSxDQUFDLE9BQTRCO0VBQzlDLE9BQU8sU0FBUztBQUNwQjtBQUVBLE9BQU8sU0FBUyxlQUFlLEtBQWM7RUFDekMsSUFBSSxrQkFBa0IsUUFBUTtJQUMxQixNQUFNLE9BQU8sSUFBSSxDQUFDLE1BQTJCO0lBQzdDLE9BQU87RUFDWCxPQUFPO0lBQ0gsTUFBTSxJQUFJLE1BQU07RUFDcEI7QUFDSiJ9
// denoCacheMetadata=3861494771044276770,9194801856410600807