import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    type RootParamList = RootStackParamList;
  }
}

export type RootStackParamList = {
  Root: undefined;
  SignUp: undefined;
  SignIn: undefined;
  MyProfile: undefined;
  VerifyCode: undefined;
  Test: undefined;
  Login: undefined;
  Loading: undefined;
  Home: undefined;
  Auth: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
