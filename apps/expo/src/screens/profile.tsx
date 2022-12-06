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
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export const ProfileScreen: React.FC<{ session: Session | null }> = ({
  session,
}) => {
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
