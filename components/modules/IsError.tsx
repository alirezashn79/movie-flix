import React from "react";
import CustomText from "./customText";

export default function IsError() {
  return (
    <CustomText variant="bold" className="mx-auto mt-10 text-lg text-red-500">
      خطا در بارگذاری فیلم ها
    </CustomText>
  );
}
