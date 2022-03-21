import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthLogin } from "../components/auth/AuthLogin";
import { client } from "../services/react-query";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={client}>
			<MantineProvider withGlobalStyles withNormalizeCSS>
				<NotificationsProvider>
					<AuthLogin />
					<Component {...pageProps} />
				</NotificationsProvider>
			</MantineProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default MyApp;
