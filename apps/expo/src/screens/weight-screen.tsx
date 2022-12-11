import React from "react";
import { useColorModeValue, VStack, Text, Fab, Icon } from "native-base";
import AnimatedColorBox from "../components/animated-color-box";
import { trpc, useAuthSession } from "../utils/trpc";
import TaskList from "../components/task-list";
import { AntDesign } from "@expo/vector-icons";

const initialData = [
  {
    id: Math.random().toString(16).slice(2),
    subject: "Buy movie tickets for Friday",
    done: false,
  },
  {
    id: Math.random().toString(16).slice(2),
    subject: "Make a React Native tutorial",
    done: false,
  },
];

export const MainScreen = () => {
  const session = useAuthSession();

  const postQuery = trpc.post.all.useQuery({
    user_id: session?.user.id as string,
  });
  const [showPost, setShowPost] = React.useState<string | null>(null);

  const [data, setData] = React.useState(initialData);
  const [editingItemId, setEditingItemId] = React.useState<string | null>(null);

  const handleToggleTaskItem = React.useCallback((item: any) => {
    setData((prevData) => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        done: !item.done,
      };
      return newData;
    });
  }, []);

  const handleChangeTaskItemSubject = React.useCallback(
    (item: any, newSubject: any) => {
      setData((prevData) => {
        const newData = [...prevData];
        const index = prevData.indexOf(item);
        newData[index] = {
          ...item,
          subject: newSubject,
        };
        return newData;
      });
    },
    [],
  );

  const handleFinishEditingTaskItem = React.useCallback((_item: any) => {
    setEditingItemId(null);
  }, []);

  const handlePressTaskItemLabel = React.useCallback((item: any) => {
    setEditingItemId(item.id);
  }, []);

  const handleRemoveItem = React.useCallback((item: any) => {
    setData((prevData) => {
      const newData = prevData.filter((i) => i !== item);
      return newData;
    });
  }, []);

  return (
    <AnimatedColorBox
      safeArea
      flex={1}
      bg={useColorModeValue("blue.50", "primary.900")}
      p={7}
    >
      <VStack
        flex={1}
        space={1}
        bg={useColorModeValue("warmGray.50", "primary.900")}
        mt="-20px"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="20px"
      >
        <TaskList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
        />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        colorScheme={useColorModeValue("blue", "darkBlue")}
        bg={useColorModeValue("blue.500", "blue.400")}
        onPress={() => {
          const id = Math.random().toString(16).slice(2);
          setData([
            {
              id,
              subject: "",
              done: false,
            },
            ...data,
          ]);
          setEditingItemId(id);
        }}
      />
    </AnimatedColorBox>
  );
};
