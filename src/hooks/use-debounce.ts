import * as React from 'react';

const useDebounce = <T>() => {
	const timeOut = React.useRef(null);

	const debounce = React.useCallback(
		(callback: () => T, delay: number) => {
			if (!!timeOut?.current) clearTimeout(timeOut.current);

			if (delay >= 3) {
				timeOut.current = setTimeout(() => {
					callback();
				}, delay);
			}
		},
		[timeOut],
	);
	return debounce;
};

export default useDebounce;

// import * as React from "react";

// const useDebounce = <T>() => {
//   const timeOut = React.useRef(null);

//   const debounce = React.useCallback(
//     (callback: () => T, delay: number) => {
//       if (!!timeOut?.current) clearTimeout(timeOut.current);

//       timeOut.current = setTimeout(() => {
//         callback();
//       }, delay);
//     },
//     [timeOut]
//   );

//   return debounce;
// };

// export default useDebounce;
