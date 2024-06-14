import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const MatchEmailToUserId = (email: string): string | number | null => {
  const { users } = useSelector((state: RootState) => state.users);

  const userWithMatchingEmail = users.find((user) => user.email === email);

  return userWithMatchingEmail ? userWithMatchingEmail.name : email.toString();
};
