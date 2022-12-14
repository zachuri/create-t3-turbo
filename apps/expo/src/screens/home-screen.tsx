import React from "react";

import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
import { trpc } from "../utils/trpc";
// import { useAuthSession } from "../utils/auth-context";
import { useAuthSession } from "../utils/trpc";

const PostCard: React.FC<{
  post: inferProcedureOutput<AppRouter["post"]["all"]>[number];
}> = ({ post }) => {
  return (
    <View className="rounded-lg border-2 border-gray-500 p-4">
      <Text className="text-xl font-semibold text-[#cc66ff]">{post.title}</Text>
      <Text className="text-white">{post.content}</Text>
    </View>
  );
};

const CreatePost: React.FC<{ user_id: string }> = ({ user_id }) => {
  const utils = trpc.useContext();
  const { mutate } = trpc.post.create.useMutation({
    async onSuccess() {
      await utils.post.all.invalidate();
    },
  });

  const [title, onChangeTitle] = React.useState("");
  const [content, onChangeContent] = React.useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex flex-col border-t-2 border-gray-500 p-4">
        <TextInput
          className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
          onChangeText={onChangeTitle}
          placeholder="Title"
          placeholderTextColor={"gray"}
        />
        <TextInput
          className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
          onChangeText={onChangeContent}
          placeholder="Content"
          placeholderTextColor={"gray"}
        />
        <TouchableOpacity
          className="rounded bg-[#cc66ff] p-2"
          onPress={() => {
            mutate({
              title,
              content,
              user_id,
            });
          }}
        >
          <Text className="font-semibold text-white">Publish post</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export const HomeScreen = () => {
  const session = useAuthSession();

  const postQuery = trpc.post.all.useQuery({
    user_id: session?.user.id as string,
  });
  const [showPost, setShowPost] = React.useState<string | null>(null);

  return (
    <SafeAreaView className="bg-[#2e026d] bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <View className="h-full w-full p-4">
        <Text className="mx-auto pb-2 text-5xl font-bold text-white">
          Create <Text className="text-[#cc66ff]">T3</Text> Turbo
        </Text>
        <View className="py-2">
          <Text className="text-xl text-white">ID: {session?.user.id}</Text>
          <Text className="text-xl text-white">
            Email: {session?.user.email}
          </Text>
        </View>

        <View className="py-2">
          {showPost ? (
            <Text className="text-white">
              <Text className="font-semibold">Selected post:</Text>
              {showPost}
            </Text>
          ) : (
            <Text className="font-semibold italic text-white">
              Press on a post
            </Text>
          )}
        </View>

        <FlashList
          data={postQuery.data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(p) => (
            <TouchableOpacity
              onPress={() => setShowPost(p.item.id as unknown as string)}
            >
              <PostCard post={p.item} />
            </TouchableOpacity>
          )}
        />
        <CreatePost user_id={session?.user.id as string} />
      </View>
    </SafeAreaView>
  );
};
