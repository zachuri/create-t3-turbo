import { Heading, Text } from "native-base";
import React from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

export const ExerciseScreen = () => {
  // Getting data from routes
  const route = useRoute<RouteProp<RootStackParamList, "Exercise">>();

  return (
    <>
      <Heading>Exercise</Heading>
      <Text>{route.key}</Text>
      <Text>{route.params?.id}</Text>
      <Text>{route.params?.title}</Text>
    </>
  );
};
