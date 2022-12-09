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
} from "react-native";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import { supabase } from "../../lib/supabase";

export interface Prop {
  navigation: NavigationProp<any, any>;
}

export const SignUpScreen: React.FC<Prop> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    if (password !== rePassword) {
      Alert.alert("Passwords don't match");
    } else {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) Alert.alert(error.message);
      navigation.navigate("SignIn");
    }
  }

  return (
    <SafeAreaView className="bg-[#2e026d] bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <View className="mx-auto h-full w-full p-4">
        {/* Title */}
        <View className="py-2">
          <Text className="text-4xl text-white">Sign Up</Text>
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

          {/* For Sign Up Re Enter Password*/}
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
                  onChangeText={(text) => setRePassword(text)}
                  secureTextEntry={true}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <TouchableOpacity
            className="mt-5 rounded bg-[#cc66ff] p-2"
            onPress={() => {
              signUpWithEmail();
            }}
          >
            <Text className="p-2 text-center font-semibold text-white">
              Submit
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up / In */}
        <View className="mt-20">
          <TouchableOpacity
            className="rounded p-2"
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text className="p-2 text-center font-semibold text-blue-500">
              Already have and account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
