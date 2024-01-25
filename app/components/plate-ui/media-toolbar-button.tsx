import React, { useRef } from "react";
import { withRef } from "@udecode/cn";
import {
  ELEMENT_IMAGE,
  ELEMENT_MEDIA_EMBED,
  useMediaToolbarButton,
} from "@udecode/plate-media";

import { Icons } from "app/components/icons";

import { ToolbarButton } from "./toolbar";
import { InputProps } from "../ui/input";

export const MediaToolbarButton = withRef<
  typeof ToolbarButton,
  {
    nodeType?: typeof ELEMENT_IMAGE | typeof ELEMENT_MEDIA_EMBED;
  }
>(({ nodeType, ...rest }, ref) => {
  // const { props } = useMediaToolbarButton({ nodeType });
  const InputRef = useRef<HTMLInputElement>(null);
  const handleFilepicker = () => {
    if (InputRef) {
      InputRef?.current?.click();
    }
  };

  return (
    <ToolbarButton
      ref={ref}
      onClick={handleFilepicker}
      {...rest}
    >
      <Icons.image />
      <input
        type="file"
        hidden
        ref={InputRef}
      ></input>
    </ToolbarButton>
  );
});
