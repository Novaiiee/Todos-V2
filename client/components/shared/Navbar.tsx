import { Flex, HStack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { useUserQuery } from "../../hooks/api/authHooks";
import { LoginModal } from "../auth/LoginModal";

export const Navbar: FC = () => {
	const { data: user } = useUserQuery();

	return (
		<Flex justify={"space-between"} px="32" py="5" w="full" bg="gray.700" color="white">
			<Flex align="center">
				<Text as="h1" fontWeight={500}>
					Todo-V2
				</Text>
			</Flex>
			<HStack align="center" spacing={4}>
				{!user && <LoginModal />}
			</HStack>
		</Flex>
	);
};
