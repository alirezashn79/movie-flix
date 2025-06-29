import React from "react";
import { Pressable, PressableProps, View } from "react-native";

const TabBarButton = React.forwardRef<View, PressableProps>(
  ({ children, style, ...rest }, ref) => {
    return (
      <Pressable
        ref={ref}
        style={(state) => {
          const baseStyle = { flex: 1, padding: 0, margin: 0 };
          const dynamicStyle =
            typeof style === "function" ? style(state) : style;
          return [baseStyle, dynamicStyle];
        }}
        {...rest}
      >
        {children}
      </Pressable>
    );
  },
);

TabBarButton.displayName = "TabBarButton";
export default TabBarButton;
