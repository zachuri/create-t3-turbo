import React from "react";
import { View } from "react-native";
import { useColorModeValue } from "native-base";
import AnimatedColorBox from "../components/animated-color-box";
import { trpc, useAuthSession } from "../utils/trpc";

export const MainScreen = () => {
  const session = useAuthSession();

  const postQuery = trpc.post.all.useQuery({
    user_id: session?.user.id as string,
  });
  const [showPost, setShowPost] = React.useState<string | null>(null);

  return (
    <AnimatedColorBox
      safeArea
      flex={1}
      bg={useColorModeValue("blue.50", "primary.900")}
      p={7}
    ></AnimatedColorBox>
  );
};
