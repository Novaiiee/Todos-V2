import {
	Button,
	FormControl,
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
import { Field, Formik } from "formik";
import { FC } from "react";
import { GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin } from "react-google-login";
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

	const onSubmit = (data: Credentials) => {
		console.log(data);
		login.mutate(data);
	};

	return (
		<>
			<Button onClick={onOpen}>Login</Button>
			<Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount isCentered>
				<ModalOverlay />
				<ModalContent maxW="40%" maxH="50%">
					<ModalHeader fontWeight="bold" fontSize="2xl">
						Login
					</ModalHeader>
					<ModalCloseButton />
					<Formik
						initialValues={{ email: "", password: "" }}
						validationSchema={AuthSchema}
						onSubmit={onSubmit}
					>
						{({ errors, handleSubmit }) => (
							<form onSubmit={handleSubmit}>
								<ModalBody>
									<VStack spacing={8}>
										<FormControl w="full" isInvalid={!!errors.email}>
											<FormLabel htmlFor="email">Email</FormLabel>
											<Field
												as={Input}
												id="email"
												type="email"
												name="email"
												placeholder="Ex. johndoe@gmail.com"
											/>
											<FormErrorMessage>{errors.email}</FormErrorMessage>
										</FormControl>
										<FormControl isInvalid={!!errors.password} w="full">
											<FormLabel htmlFor="password">Password</FormLabel>
											<Field
												as={Input}
												id="password"
												type="password"
												name="password"
												placeholder="Minimum of 6 Characters"
											/>
											<FormErrorMessage>{errors.password}</FormErrorMessage>
										</FormControl>
									</VStack>
								</ModalBody>
								<ModalFooter>
									<MoonLoader loading={loginWithGoogle.isLoading || login.isLoading} size={40} />
									<Spacer />
									<Button variant="outline" onClick={signIn} mr={3}>
										Login with Google
									</Button>
									<Button type="submit">Login</Button>
									<input type="submit" value="" />
								</ModalFooter>
							</form>
						)}
					</Formik>
				</ModalContent>
			</Modal>
		</>
	);
};
