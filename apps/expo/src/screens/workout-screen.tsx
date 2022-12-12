import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Heading,
  VStack,
  useColorModeValue,
  Box,
  HStack,
  Center,
  ScrollView,
  Pressable,
} from "native-base";
import React, { useRef } from "react";
import { makeStyledComponent } from "../utils/styled";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

const StyledView = makeStyledComponent(View);
const StyledScrollView = makeStyledComponent(ScrollView);

const data = [
  {
    id: Math.random().toString(16).slice(2),
    title: "Arm",
  },
  {
    id: Math.random().toString(16).slice(2),
    title: "Leg",
  },
  {
    id: Math.random().toString(16).slice(2),
    title: "Back / Chest",
  },
];

const WorkoutScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const refScrollView = useRef(null);

  return (
    <>
      <VStack
        flex={1}
        space={1}
        bg={useColorModeValue("primary.400", "primary.900")}
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="40px"
      >
        <Heading size={"2xl"}>Workout</Heading>
        <StyledScrollView ref={refScrollView} w="full">
          {data.map((item) => (
            <VStack space={2} mt={10} key={item.id}>
              <Pressable
                onPress={() => {
                  navigation.navigate("Exercise", {
                    id: item.id,
                    title: item.title,
                  });
                }}
              >
                <Box
                  borderRadius={"lg"}
                  p="10"
                  borderColor={"white"}
                  borderWidth="2"
                  mx={"5"}
                  alignItems={"center"}
                >
                  <Heading color={useColorModeValue("white", "black")}>
                    {item.title}
                  </Heading>
                </Box>
              </Pressable>
            </VStack>
          ))}
        </StyledScrollView>
      </VStack>
    </>
  );
};

export default WorkoutScreen;
