import React, { useCallback, useRef } from "react";
import { AnimatePresence, View } from "moti";
import {
  PanGestureHandlerProps,
  ScrollView,
} from "react-native-gesture-handler";
import { makeStyledComponent } from "../../utils/styled";
import WeightItem from "./weight-item";
import { Box, Heading, HStack, Text, useColorModeValue } from "native-base";

const StyledView = makeStyledComponent(View);
const StyledScrollView = makeStyledComponent(ScrollView);

interface WeightItemData {
  id: string;
  subject: string;
  done: boolean;
  date: Date;
}

interface WeightListProps {
  data: Array<WeightItemData>;
  editingItemId: string | null;
  onToggleItem: (item: WeightItemData) => void;
  onChangeSubject: (item: WeightItemData, newSubject: string) => void;
  onFinishEditing: (item: WeightItemData) => void;
  onPressLabel: (item: WeightItemData) => void;
  onRemoveItem: (item: WeightItemData) => void;
}

interface WeightItemProps
  extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  data: WeightItemData;
  isEditing: boolean;
  onToggleItem: (item: WeightItemData) => void;
  onChangeSubject: (item: WeightItemData, newSubject: string) => void;
  onFinishEditing: (item: WeightItemData) => void;
  onPressLabel: (item: WeightItemData) => void;
  onRemove: (item: WeightItemData) => void;
}

export const AnimatedTaskItem = (props: WeightItemProps) => {
  const {
    simultaneousHandlers,
    data,
    isEditing,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemove,
  } = props;

  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(data);
  }, [data, onToggleItem]);

  const handleChangeSubject = useCallback(
    (subject: string) => {
      onChangeSubject(data, subject);
    },
    [data, onChangeSubject],
  );

  const handleFinishEditing = useCallback(() => {
    onFinishEditing(data);
  }, [data, onFinishEditing]);

  const handlePressLabel = useCallback(() => {
    onPressLabel(data);
  }, [data, onPressLabel]);

  const handleRemove = useCallback(() => {
    onRemove(data);
  }, [data, onRemove]);

  return (
    <StyledView
      w="full"
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46,
      }}
    >
      <WeightItem
        simultaneousHandlers={simultaneousHandlers}
        date={data.date}
        subject={data.subject}
        isDone={data.done}
        isEditing={isEditing}
        onToggleCheckbox={handleToggleCheckbox}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
      />
    </StyledView>
  );
};

export default function WeightList(props: WeightListProps) {
  const {
    data,
    editingItemId,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemoveItem,
  } = props;
  const refScrollView = useRef(null);

  return (
    <>
      <HStack>
        <Box justifyContent={"center"} width={70} height={30} ml={4}>
          <Heading color={useColorModeValue("primary.900", "primary.400")}>
            Date
          </Heading>
        </Box>
        <Box justifyContent={"center"} height={30} ml={3}>
          <Heading color={useColorModeValue("primary.900", "primary.400")}>
            Weight
          </Heading>
        </Box>
      </HStack>
      <StyledScrollView ref={refScrollView} w="full">
        <AnimatePresence>
          {data.map((item) => (
            <AnimatedTaskItem
              key={item.id}
              data={item}
              simultaneousHandlers={refScrollView}
              isEditing={item.id === editingItemId}
              onToggleItem={onToggleItem}
              onChangeSubject={onChangeSubject}
              onFinishEditing={onFinishEditing}
              onPressLabel={onPressLabel}
              onRemove={onRemoveItem}
            />
          ))}
        </AnimatePresence>
      </StyledScrollView>
    </>
  );
}
