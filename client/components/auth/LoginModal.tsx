import {
	Box,
	Button,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spacer,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin } from "react-google-login";
import { useForm } from "react-hook-form";
import { MoonLoader } from "react-spinners";
import { useLoginMutation, useLoginWithGoogleMutation } from "../../hooks/api/authHooks";
import { useAppStore } from "../../stores/useAppStore";
import { Credentials } from "../../types/user";
import { AuthSchema } from "../../utils/authSchema";

export const LoginModal: FC = () => {
	const toggleLoginModal = useAppStore((state) => state.toggleLoginModal);
	const isLoginModalOpen = useAppStore((state) => state.isLoginModalOpen);

	const loginWithGoogle = useLoginWithGoogleMutation();
	const login = useLoginMutation();

	const { signIn } = useGoogleLogin({
		clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
		onSuccess: async (r: GoogleLoginResponse | GoogleLoginResponseOffline) => {
			const response = r as GoogleLoginResponse;
			loginWithGoogle.mutate(response.accessToken);
		},
	});

	const { isOpen, onOpen, onClose } = useDisclosure({
		defaultIsOpen: false,
		onOpen: toggleLoginModal,
		isOpen: isLoginModalOpen,
		onClose: toggleLoginModal,
	});

	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<Credentials>({
		resolver: yupResolver(AuthSchema),
		shouldUnregister: false,
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: Credentials) => {
		console.log(data);
		login.mutate(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Button onClick={onOpen}>Login</Button>
			<Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount isCentered>
				<ModalOverlay />
				<ModalContent maxW="40%" maxH="50%">
					<ModalHeader fontWeight="bold" fontSize="2xl">
						Login
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={8}>
							<Box w="full">
								<FormLabel>Email</FormLabel>
								<Input type="email" placeholder="Ex. johndoe@gmail.com" name="email" id="email" />
								<FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
							</Box>
							<Box w="full">
								<FormLabel htmlFor="password">Password</FormLabel>
								<Input type="password" placeholder="Minimum of 6 Characters" name="password" id="password" />
								<FormErrorMessage>{errors.password && errors?.password?.message}</FormErrorMessage>
							</Box>
						</VStack>
					</ModalBody>
					<ModalFooter>
						<MoonLoader loading={loginWithGoogle.isLoading} size={40} />
						<Spacer />
						<Button variant="outline" onClick={signIn} mr={3}>
							Login with Google
						</Button>
						<input type="submit" />
					</ModalFooter>
				</ModalContent>
			</Modal>
		</form>
	);
};
