import clsx from "clsx";
import React, { ReactNode } from "react";

function BottomNavigationButton(props: any) {
  const {
    icon,
    className,
    ...otherProps
  }: { icon: ReactNode; className: string; otherProps: any } = props;

  return (
    <button
      type="button"
      className={clsx(
        "flex w-full items-center justify-center outline-none",
        className
      )}
      {...otherProps}
    >
      <div className="h-6 w-6">{icon}</div>
    </button>
  );
}

export default BottomNavigationButton;

// Use this pattern to set default className and other props directly to child component from parent component when child component is not known beforehand
// export default function ImageSlider(props) {
//   const { children } = props

//   return (
//     <div className="img-slider">
//       {
//         React.Children.map(children, (child) =>
//           React.cloneElement(child, {
//               className: `${child.props.className} img-special-class`
//             })
//         )
//       }
//     </div>
//   );
// }
