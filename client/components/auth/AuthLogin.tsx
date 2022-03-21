import { FC } from "react";
import { useUserQuery } from "../../hooks/api/authHooks";

export const AuthLogin: FC = () => {
	useUserQuery(true);
	return null;
};
