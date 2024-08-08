
export function qs(obj: Record<number|string, number|string>) {
	return Object.keys(obj)
	  .map(key => {
		const value = obj[key];
		if (value === null || value === undefined) {
		  return encodeURIComponent(key);
		}
		return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
	  })
	  .join('&');
  }
