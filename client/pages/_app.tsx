import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { client } from "../services/react-query";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={client}>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					/** Put your mantine theme override here */
					colorScheme: "light",
				}}
			>
				<Component {...pageProps} />
			</MantineProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default MyApp;
