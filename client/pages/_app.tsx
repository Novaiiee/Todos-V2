import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { client } from "../services/react-query";
import { globalTheme } from "../utils/globalTheme";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={client}>
			<MantineProvider withGlobalStyles withNormalizeCSS theme={globalTheme}>
				<NotificationsProvider>
					<Component {...pageProps} />
				</NotificationsProvider>
			</MantineProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default MyApp;
