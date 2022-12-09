import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Alert,
} from "react-native";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";
// import { useAuthSession } from "../utils/auth-context";
import { useAuthSession } from "../utils/trpc";

export const ProfileScreen = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [full_name, setFull_Name] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const session = useAuthSession();

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("User")
        .select(`username, full_name, website, avatar_url`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setFull_Name(data.full_name);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    full_name,
    website,
    avatar_url,
  }: {
    username: string;
    full_name: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        full_name,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("User").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="bg-[#2e026d] bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <View className="mx-auto h-full w-full p-4">
        {/* Title */}
        <View className="py-2">
          <Text className="text-4xl text-white">Profile</Text>
        </View>
        <View className="py-2">
          <Text className="text-xl text-white">ID: {session?.user.id}</Text>
          <Text className="text-xl text-white">
            Email: {session?.user.email}
          </Text>
        </View>
        <View>
          <TextInput
            className="mb-2 rounded text-xl text-white"
            placeholder={full_name || "Set/Update Full Name"}
            placeholderTextColor={"white"}
            onChangeText={(text) => setFull_Name(text)}
          />
        </View>

        <View>
          <TextInput
            className="mb-2 rounded text-xl text-white"
            placeholder={username || "Set/Update Username"}
            placeholderTextColor={"white"}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View>
          <TextInput
            className="mb-2 rounded text-xl text-white"
            placeholder={website || "Set/Edit website"}
            placeholderTextColor={"white"}
            onChangeText={(text) => setWebsite(text)}
          />
        </View>

        <TouchableOpacity
          onPress={() =>
            updateProfile({
              username,
              full_name,
              website,
              avatar_url: avatarUrl,
            })
          }
          className="mt-5 rounded bg-[#cc66ff] p-2"
        >
          <Text className="p-2 text-center font-semibold text-white">
            Update
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-5 rounded bg-[#cc66ff] p-2"
          onPress={async () => {
            const { error } = await supabase.auth.signOut();
          }}
        >
          <Text className="p-2 text-center font-semibold text-white">
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
