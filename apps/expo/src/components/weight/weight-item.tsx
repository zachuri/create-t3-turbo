import React, { useCallback } from "react";
import { PanGestureHandlerProps } from "react-native-gesture-handler";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import {
  Pressable,
  Box,
  HStack,
  useColorModeValue,
  Icon,
  Input,
  useToken,
  Text,
} from "native-base";
// import AnimatedCheckbox from "react-native-checkbox-reanimated";
import AnimatedTaskLabel from "./animated-weight-label";
import SwipableView from "./swipeable-weight";
import { Feather } from "@expo/vector-icons";

interface Props extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  isEditing: boolean;
  isDone: boolean;
  onToggleCheckbox?: () => void;
  onPressLabel?: () => void;
  onRemove?: () => void;
  onChangeSubject?: (subject: string) => void;
  onFinishEditing?: () => void;
  subject: string;
  date: Date;
}

const WeightItem = (props: Props) => {
  const {
    isEditing,
    isDone,
    onToggleCheckbox,
    subject,
    onPressLabel,
    onRemove,
    onChangeSubject,
    onFinishEditing,
    simultaneousHandlers,
    date,
  } = props;

  const highlightColor = useToken(
    "colors",
    useColorModeValue("blue.500", "blue.400"),
  );
  const boxStroke = useToken(
    "colors",
    useColorModeValue("muted.300", "muted.500"),
  );

  const checkmarkColor = useToken(
    "colors",
    useColorModeValue("white", "white"),
  );

  const activeTextColor = useToken(
    "colors",
    useColorModeValue("darkText", "lightText"),
  );
  const doneTextColor = useToken(
    "colors",
    useColorModeValue("muted.400", "muted.600"),
  );

  const handleChangeSubject = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      onChangeSubject && onChangeSubject(e.nativeEvent.text);
    },
    [onChangeSubject],
  );

  return (
    <SwipableView
      simultaneousHandlers={simultaneousHandlers}
      onSwipeLeft={onRemove}
      backView={
        <Box
          w="full"
          h="full"
          bg="red.500"
          alignItems="flex-end"
          justifyContent="center"
          pr={4}
        >
          <Icon color="white" as={<Feather name="trash-2" />} size="sm" />
        </Box>
      }
    >
      <HStack
        alignItems="center"
        w="full"
        px={4}
        py={2}
        bg={useColorModeValue("primary.400", "primary.900")}
      >
        <Box justifyContent={"center"} width={70} height={30} mr={2}>
          <Text>{date.toLocaleDateString()}</Text>
        </Box>
        {isEditing ? (
          <Input
            placeholder="Weight"
            value={subject}
            variant="unstyled"
            fontSize={19}
            px={1}
            py={0}
            autoFocus
            blurOnSubmit
            onChange={handleChangeSubject}
            onBlur={onFinishEditing}
          />
        ) : (
          <AnimatedTaskLabel
            textColor={activeTextColor}
            inactiveTextColor={doneTextColor}
            strikethrough={isDone}
            onPress={onPressLabel}
          >
            {subject + " lbs"}
          </AnimatedTaskLabel>
        )}
      </HStack>
    </SwipableView>
  );
};

export default WeightItem;
