import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";

export const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signIn, setSignIn] = useState(true);

  async function signInWithEmail() {
    console.log("SUBMIT SIGN IN");
    // setLoading(true);
    // const { error } = await supabase.auth.signInWithPassword({
    //   email: email,
    //   password: password
    // });
    // if (error) Alert.alert(error.message);
    // setLoading(false);
  }

  async function signUpWithEmail() {
    console.log("SUBMIT SIGN UP");
    // setLoading(true); const { error } = await supabase.auth.signUp({
    //   email: email,
    //   password: password
    // });
    // if (error) Alert.alert(error.message);
    // setLoading(false);
  }

  return (
    <SafeAreaView className="bg-[#2e026d] bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <View className="mx-auto h-full w-full p-4">
        {/* Title */}
        <View className="py-2">
          {signIn ? (
            <Text className="text-4xl text-white">Sign In</Text>
          ) : (
            <Text className="text-4xl text-white">Sign Up</Text>
          )}
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
              />
            </View>
          </TouchableWithoutFeedback>

          {/* For Sign Up */}
          {!signIn && (
            <View>
              <Text className="text-2xl text-white">Re-enter Password</Text>
              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
              >
                <View className="py-2">
                  <TextInput
                    className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
                    placeholder="Password"
                    placeholderTextColor={"gray"}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}

          <TouchableOpacity
            className="mt-5 rounded bg-[#cc66ff] p-2"
            onPress={() => {
              signIn ? signInWithEmail() : signUpWithEmail();
            }}
          >
            <Text className="p-2 text-center font-semibold text-white">
              Submit
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up / In */}
        <View className="mt-20">
          {signIn ? (
            <TouchableOpacity
              className="rounded p-2"
              onPress={() => {
                setSignIn(!signIn);
              }}
            >
              <Text className="p-2 text-center font-semibold text-blue-500">
                Sign Up?
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="rounded  p-2"
              onPress={() => {
                setSignIn(!signIn);
              }}
            >
              <Text className="p-2 text-center font-semibold text-blue-500">
                Sign In?
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
