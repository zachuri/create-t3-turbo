import { NavigationProp } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import { supabase, supabaseUrl } from "../../lib/supabase";

export interface Prop {
  navigation: NavigationProp<any, any>;
}

export const SignInScreen: React.FC<Prop> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <SafeAreaView className="bg-[#2e026d] bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="mx-auto h-full w-full p-4">
          {/* Title */}
          <View className="py-2">
            <Text className="text-4xl text-white">Sign In</Text>
          </View>

          <View className="mx-2">
            {/* Email */}
            <Text className="text-2xl text-white">Email</Text>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View className="py-2">
                <TextInput
                  className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
                  placeholder="Email"
                  placeholderTextColor={"gray"}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
            </TouchableWithoutFeedback>

            {/* Password */}
            <Text className="text-2xl text-white">Password</Text>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View className="py-2">
                <TextInput
                  className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
                  placeholder="Password"
                  placeholderTextColor={"gray"}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableOpacity
              className="mt-5 rounded bg-[#cc66ff] p-2"
              onPress={() => {
                signInWithEmail();
              }}
            >
              <Text className="p-2 text-center font-semibold text-white">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up / In */}
          <View className="mt-20">
            <TouchableOpacity
              className="rounded p-2"
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text className="p-2 text-center font-semibold text-blue-500">
                Don't have and account? Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
