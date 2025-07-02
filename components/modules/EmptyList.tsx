import React from "react";
import CustomText from "./customText";

interface IProps {
  isPending: boolean;
  isError: boolean;
}

function EmptyList({ isPending, isError }: IProps) {
  if (!isPending && !isError)
    return (
      <CustomText
        variant="bold"
        className="mx-auto mt-10 text-lg text-gray-500"
      >
        رکوردی یافت نشد
      </CustomText>
    );

  return null;
}
export default React.memo(EmptyList);
