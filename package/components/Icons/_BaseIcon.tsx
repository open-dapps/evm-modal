import { classNames } from "@knownout/lib"
import React, { memo } from "react"
import "./_BaseIcon.scss"

interface IBaseIconProps {
  children: JSX.Element;

  iconName: string;
}

export interface TIconProps {
  onClick? (event: React.MouseEvent<HTMLDivElement>): void;
}

function BaseIcon (props: IBaseIconProps & TIconProps) {
  return (
    <div className={ classNames("icon", props.iconName) } onClick={ props.onClick }>
      { props.children }
    </div>
  )
}

export default memo(BaseIcon)
