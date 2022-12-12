import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    type RootParamList = RootStackParamList;
  }
}

export type RootStackParamList = {
  navigate(arg0: string): unknown;
  Root: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Profile: undefined;
  VerifyCode: undefined;
  Test: undefined;
  Login: undefined;
  Loading: undefined;
  Home: undefined;
  Auth: undefined;
  Tabs: undefined;
  Exercise: { id: string; title: string } | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
